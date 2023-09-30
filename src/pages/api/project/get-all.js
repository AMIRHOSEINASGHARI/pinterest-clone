//* Utility Functions Imports
import { mongoConnect } from "@/utils";
//* Models Imports
import { Project } from "@/utils/models/project";
import { PinterestUser } from "@/utils/models/user";

//* FINDING(GET) ALL PROJECTS
export default async function handler(req, res) {
  if (req.method !== "GET") return;

  try {
    await mongoConnect();
  } catch (error) {
    console.log(error);
  }

  const projects = await Project.find().populate({
    path: "createdBy",
    model: PinterestUser,
    select: ["avatarUrl", "email", "name"],
  });

  if (projects.length) {
    res.status(200).json({ status: "success", data: projects });
  } else {
    res.status(500).json({ status: "failed", message: "server error" });
  }
}
