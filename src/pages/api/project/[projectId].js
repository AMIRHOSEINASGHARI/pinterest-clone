// Next-Auth Imports
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
// Mongoose Imports
import { Types } from "mongoose";
// Utility Functions Imports
import { cloudinaryOptions, mongoConnect } from "@/utils";
// Cloudinary Imports
import { v2 as cloudinary } from "cloudinary";
// Models Imports
import { Project } from "@/utils/models/project";
import { PinterestUser } from "@/utils/models/user";
import { Comment } from "@/utils/models/comment";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // $$ CLOUDINARY CONFIG

export default async function handler(req, res) {
  try {
    await mongoConnect();
  } catch (error) {
    console.log(error);
  } // CONNECTING TO DB FUNCTION

  const { projectId } = req.query;
  const project = await Project.findById(projectId)
    .populate({
      path: "createdBy",
      model: PinterestUser,
      select: ["_id", "name", "email", "avatarUrl"],
    })
    .populate({
      path: "comments",
      model: Comment,
      populate: { path: "senderId" },
    });
  const user = await PinterestUser.findById(project?.createdBy?._id);
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    try {
      const projects = await Project.find().populate({
        path: "createdBy",
        model: PinterestUser,
        select: ["avatarUrl", "name", "_id"],
      });
      const moreLikeProject = projects.filter(
        (item) => item.category === project.category
      );

      res
        .status(200)
        .json({ status: "success", data: { project, moreLikeProject } });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        data: { message: "Error while fetching project | Server Error" },
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const indexOfProject = user.projects.indexOf(projectId);

      await Comment.deleteMany({ projectId: projectId });
      await Project.findByIdAndDelete(projectId);
      user.projects.splice(indexOfProject, 1);
      user.save();

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ status: "failed" });
    }
  }

  if (req.method === "PATCH") {
    const { actionType } = JSON.parse(req.body);
    try {
      if (actionType === "sendingComment") {
        const { text } = JSON.parse(req.body);

        const comment = await Comment.create({
          text,
          projectId: new Types.ObjectId(projectId),
          senderId: new Types.ObjectId(session.id),
        });

        project.comments.push(comment._id);
        project.save();
      } else if (actionType === "editProject") {
        const { newForm } = JSON.parse(req.body);

        if (newForm.image && newForm.image !== project.image) {
          const newImageResult = await cloudinary.uploader.upload(
            newForm.image,
            cloudinaryOptions
          );
          project.image = newImageResult.url;
        } else {
          project.image = newForm.image;
        }

        project.title = newForm.title;
        project.description = newForm.description;
        project.category = newForm.category;
        project.websiteUrl = newForm.websiteUrl;

        project.save();
      }

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ status: "failed" });
    }
  }
} // $$ FINDING(GET) or UPDATING(PATCH) or DELETING(DELETE) PROJECT
