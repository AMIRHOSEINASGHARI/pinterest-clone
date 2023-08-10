// Mongoose Imports
import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  text: String,
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  senderId: { type: Schema.Types.ObjectId, ref: "PinterestUser" },
});

const Comment = models.Comment || model("Comment", commentSchema);

export { Comment };
