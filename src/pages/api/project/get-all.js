// Utility Functions Imports
import { mongoConnect } from "@/utils";
// Models Imports
import { Project } from "@/utils/models/project";

mongoConnect();

export default async function handler(req, res) {
  if (req.method !== "GET") return;

  const projects = await Project.find().populate({
    path: "createdBy",
    select: ["avatarUrl", "email", "name"],
  });

  if (projects.length) {
    res.status(200).json({ status: "success", data: projects });
  } else {
    res.status(500).json({ status: "failed", message: "server error" });
  }
} // $$ FINDING(GET) ALL PROJECTS
