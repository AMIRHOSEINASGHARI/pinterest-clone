// Next Imports
import Image from "next/image";
import Link from "next/link";
// Utility Functions Imports
import { shorterText } from "@/utils";

const CreatedBySection = ({ data }) => {
  const { createdBy } = data?.data?.project;

  return (
    <Link
      href={`/profile/${createdBy?._id}`}
      className="flex items-center gap-1 w-fit mb-10"
    >
      {createdBy?.avatarUrl ? (
        <div>
          <Image
            src={createdBy.avatarUrl}
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
      ) : (
        <div className="w-10 h-10 flex items-center justify-center uppercase bg-gray-200 rounded-full">
          {createdBy?.name[0]}
        </div>
      )}
      <div>
        <div className="sm:hidden">
          <p className="text-black font-semibold text-sm xl:text-sm uppercase tracking-tight">
            {shorterText(createdBy?.name, 25)}
          </p>
          <p className="text-gray-400 text-xs tracking-tight">
            {shorterText(createdBy?.email, 40)}
          </p>
        </div>
        <div className="hidden sm:block">
          <p className="text-black font-semibold text-sm xl:text-sm uppercase tracking-tight">
            {createdBy?.name}
          </p>
          <p className="text-gray-400 text-xs tracking-tight">
            {createdBy?.email}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CreatedBySection;
