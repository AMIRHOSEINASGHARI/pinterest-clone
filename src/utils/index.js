// Mongoose Imports
import mongoose from "mongoose";
// Resizer Imports
import FileResizer from "react-image-file-resizer";

export async function mongoConnect() {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error, "CANNOT CONNECT TO DB");
  }
} // $$ CONNECTING TO DB FUNCTION

export const resizeFile = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  }); // $$ RESIZE UPLOADED IMAGE FUNCTION

export const shorterText = (text, maxCharacter) => {
  if (String(text).length > maxCharacter) {
    return `${text.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
}; // $$ SHORTING LONG TEXTS FUNCTION

export const cloudinaryOptions = {
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  transformation: [
    {
      width: 1000,
      crop: "scale",
    },
  ],
}; // $$ CLOUDINARY OPTIONS
