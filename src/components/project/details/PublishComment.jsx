// React Imports
import React, { useState } from "react";
// Next Imports
import Image from "next/image";
// Utility functions Imports
import { sendComment } from "@/utils/api";
// Components Imports
import { Button, FormField, Loader } from "../..";
// React Icons Imports
import { RiSendPlaneFill } from "react-icons/ri";

const PublishComment = ({ fetchProject, session, projectId }) => {
  const [comment, setComment] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment) {
      setIsSendingComment(true);
      const result = await sendComment(projectId, comment);
      setIsSendingComment(false);
      setComment("");
      if (result.status === "success") fetchProject();
    } else {
      alert("Add some text!");
    }
  };

  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex items-center gap-1 pt-3 mt-2 border-t"
    >
      <Image
        src={session?.data?.image}
        alt="user"
        width={50}
        height={50}
        className="rounded-full object-contain"
      />
      <div className="w-full flex items-center justify-between gap-1">
        <FormField
          placeholder="Add a comment"
          formValue={comment}
          handleChange={(e) => setComment(e.target.value)}
          type="text"
          inputStyles="bg-gray-100 rounded-full w-full p-4 outline-8 outline-blue-300"
        />
        {comment && (
          <Button
            type="submit"
            styles={`p-4 rounded-full text-2xl text-white ${
              isSendingComment ? "bg-gray-100" : "bg-purple-500"
            }`}
            title={
              isSendingComment ? (
                <Loader h="22" w="22" color="#6b7280" />
              ) : (
                <RiSendPlaneFill />
              )
            }
          />
        )}
      </div>
    </form>
  );
};

export default PublishComment;
