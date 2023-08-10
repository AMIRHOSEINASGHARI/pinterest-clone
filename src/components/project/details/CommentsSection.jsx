// React Imports
import { useState } from "react";
// Next Imports
import Link from "next/link";
import Image from "next/image";
// React Icons Imports
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
// Utility Functions Imports
import { shorterText } from "@/utils";
// Components Imports
import { Button } from "../..";

const CommentsSection = ({ comments }) => {
  const [showComment, setShowComment] = useState(false);

  if (comments.length !== 0) {
    return (
      <div>
        <div className="flex gap-2 mb-4">
          <h1 className="font-bold text-lg">{comments.length} Comments</h1>
          <Button
            type="button"
            handleButton={() => setShowComment(!showComment)}
            title={showComment ? <BsChevronUp /> : <BsChevronDown />}
            styles="bg-gray-200 rounded-full p-2"
          />
        </div>
        {showComment && (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id}>
                <Link
                  href={`/profile/${comment?.senderId?._id}`}
                  className="flex items-center gap-1 w-fit"
                >
                  <Image
                    src={comment?.senderId?.avatarUrl || "/user.png"}
                    width={30}
                    height={30}
                    alt="user"
                    className="rounded-full"
                  />
                  <p className="font-semibold uppercase text-sm">
                    {shorterText(comment?.senderId?.name, 15)}
                  </p>
                </Link>
                <p className="py-1 pl-8 tracking-tight text-sm text-gray-600">
                  {comment?.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="font-bold text-lg mb-2">Comments</h1>
        <p className="text-gray-600 tracking-tight text-xs">
          No comments yet...
        </p>
      </div>
    );
  }
};

export default CommentsSection;
