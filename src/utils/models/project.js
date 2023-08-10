// Mongoose Imports
import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  websiteUrl: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "PinterestUser" },
});

const Project = models.Project || model("Project", projectSchema);

export { Project };
