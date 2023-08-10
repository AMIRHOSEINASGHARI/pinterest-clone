// Next Imports
import Image from "next/image";
import Link from "next/link";
// Utility Functions Imports
import { shorterText } from "@/utils";
// React Icons Imports
import { HiOutlineDownload } from "react-icons/hi";

const Project = (props) => {
  const { createdBy, websiteUrl, image, title, _id, isProfile } = props;

  return (
    <div className="mb-2">
      <div className="group rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 relative">
        {/* // OVERLAY BG // */}
        <Link
          href={`/project/detail/${_id}`}
          className="absolute inset-0 cursor-zoom-in bg-black/50 hidden group-hover:flex flex-col p-2 pb-3"
        >
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={image}
            download
            className="project-btn absolute top-2 right-2"
          >
            <HiOutlineDownload />
          </a>
          {websiteUrl && (
            <a
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="project-btn text-xs absolute z-10 bottom-2 left-2"
              href={websiteUrl}
            >
              {shorterText(websiteUrl, 20)}
            </a>
          )}
        </Link>
        {/* // IMAGE // */}
        <Image
          src={image}
          width={500}
          height={500}
          alt="image"
          className="max-h-[600px] object-cover"
        />
      </div>
      {/* // USER // */}
      {!isProfile && (
        <div className="py-1 px-2">
          {title && (
            <h1 className="font-bold tracking-tight text-xs md:text-base mb-1">
              {shorterText(title, 30)}
            </h1>
          )}
          <Link
            href={`/profile/${createdBy?._id}`}
            className="flex items-center gap-1 w-fit"
          >
            <Image
              src={createdBy?.avatarUrl || "/user.png"}
              alt="user"
              width={30}
              height={30}
              className="rounded-full object-contain w-6 md:w-auto"
            />
            <p className="text-black font-semibold text-[10px] md:text-sm uppercase tracking-tight">
              {shorterText(createdBy?.name, 10)}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Project;
