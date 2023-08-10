// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Constants Imports
import { notifyOptions } from "@/constant";

const Notify = (status, text) => {
  if (status === "success") {
    toast.success(text, notifyOptions);
  } else if (status === "failed") {
    toast.error(text, notifyOptions);
  } else if (status === "warning") {
    toast.warn(text, notifyOptions);
  }
};

export default Notify;
