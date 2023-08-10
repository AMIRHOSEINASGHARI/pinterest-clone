// Mongoose Imports
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  description: String,
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const PinterestUser =
  models.PinterestUser || model("PinterestUser", userSchema);

export { PinterestUser };
