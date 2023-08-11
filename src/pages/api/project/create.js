// Next-Auth Imports
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
// Utils Imports
import { cloudinaryOptions, mongoConnect } from "@/utils";
// Cloudinary Imports
import { v2 as cloudinary } from "cloudinary";
// Models Imports
import { PinterestUser } from "@/utils/models/user";
import { Project } from "@/utils/models/project";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // $$ CLOUDINARY CONFIG

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await mongoConnect();
  } catch (error) {
    console.log(error);
  }

  const body = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(404)
      .json({ status: "failed", message: "You are not authorized" });
  }

  const user = await PinterestUser.findOne({ email: session?.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  try {
    const imageResult = await cloudinary.uploader.upload(
      body.image,
      cloudinaryOptions
    );

    const project = await Project.create({
      title: body.title || "",
      description: body.description || "",
      image: imageResult.url,
      category: body.category,
      websiteUrl: body.websiteUrl || "",
      comments: [],
      createdBy: user._id,
    }); // $$ CREATING PROJECT

    user.projects.push(project._id);
    user.save();

    res
      .status(200)
      .json({ status: "success", message: "Image successfully Uploaded!" });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      error,
      message:
        "Upload Failed! Check your internet connection or try again leter",
    });
  }
} // $$ CREATING(POST) PROJECT
