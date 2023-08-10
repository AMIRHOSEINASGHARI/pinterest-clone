// React Imports
import React, { useState } from "react";
// Next Imports
import { useRouter } from "next/router";
// Components Imports
import { Button, ButtonTooltip, Loader } from "../..";
// Utility Functions Imports
import { deleteProject } from "@/utils/api";
// React Icons Imports
import { BiDotsHorizontalRounded, BiLink } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { FiEdit, FiTrash } from "react-icons/fi";

const ProjectActions = ({ session, data, projectId }) => {
  const router = useRouter();
  const { image } = data?.data?.project;
  const [dots, setDots] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    window.navigator.clipboard.writeText(url);
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProject(projectId);
    setIsDeleting(false);
    if (result.status === "success") router.push("/");
  };
  const handleEdit = () => {
    router.push(`/project/edit/${projectId}`);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        type="button"
        styles="project-details-btn"
        handleButton={() => setDots(!dots)}
        title={dots ? <IoMdClose /> : <BiDotsHorizontalRounded />}
      />
      {session?.data?.id === data?.data?.project?.createdBy?._id && (
        <>
          <Button
            type="button"
            title={
              isDeleting ? <Loader h="8" w="8" color="#9ca3af" /> : <FiTrash />
            }
            handleButton={handleDelete}
            styles={`project-details-btn ${isDeleting && "bg-gray-50"}`}
          />
          <Button
            type="button"
            title={<FiEdit />}
            handleButton={handleEdit}
            styles="project-details-btn"
          />
        </>
      )}
      {dots && (
        <div className="rounded-xl bg-white shadow-md z-10 absolute top-0 left-9 gap-0.5 py-2 flex flex-col items-start text- tracking-tight">
          {/* DOWNLOAD LINK */}
          <a
            onClick={() => setDots(false)}
            href={image}
            download
            target="_blank"
            className="project-details-buttons flex items-center py-1"
          >
            <LuDownload className="mr-3" />
            Download
          </a>
          {/* COPY BTN */}
          <div className="w-full">
            <ButtonTooltip
              openOnClick
              isSimpleTag
              tooltipId="copy-link"
              tooltipContent="Link copied!"
              toolipHide={3000}
            >
              <Button
                type="button"
                handleButton={handleCopyLink}
                title={
                  <>
                    <BiLink className="mr-3" /> Copy link
                  </>
                }
                styles="project-details-buttons flex items-center py-1"
              />
            </ButtonTooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectActions;
