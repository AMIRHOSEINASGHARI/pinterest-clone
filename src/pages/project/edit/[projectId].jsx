//* React Imports
import { useEffect, useState } from "react";
//* Next Imports
import { useRouter } from "next/router";
import Link from "next/link";
//* Next-Auth Imports
import { getSession } from "next-auth/react";
//* Components Imports
import { Loader, Modal, ProjectForm } from "@/components";
import { getProjectDetails } from "@/utils/api";
//* React Icons Imports
import { FiAlertTriangle } from "react-icons/fi";

const Edit = ({ session }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const [projectDetails, setProjectDetails] = useState(null);

  const createdByID = projectDetails?.data?.project?.createdBy?._id;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setProjectDetails(await getProjectDetails(projectId));
    };
    fetchProjectDetails();
  }, []);

  if (!projectDetails) {
    return (
      <Loader h="120" w="120" color="#6b7280" text="Fetching Project Data" />
    );
  }
  if (projectDetails?.status !== "success")
    return <h1>{projectDetails?.data?.message}</h1>;
  if (createdByID !== session?.id)
    return (
      <div className="text-center p-3 mt-28 flex flex-col items-center">
        <FiAlertTriangle className="text-6xl text-red-500 mb-2" />
        <h1 className="text-2xl lg:text-3xl font-black mb-8">
          You can't edit this project
        </h1>
        <Link
          href="/project/create-project"
          className="border-purple-500 border-2 font-black bg-purple-50 hover:bg-purple-100 transition duration-100 ease-in-out text-purple-600 py-2 px-6 rounded-3xl"
        >
          Create your own
        </Link>
      </div>
    );

  return (
    <Modal>
      <h1 className="text-4xl font-black">Edit Project</h1>
      <ProjectForm type="edit" projectDetails={projectDetails?.data?.project} />
    </Modal>
  );
};

export default Edit;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: { destination: "/" },
    };
  }

  return {
    props: { session },
  };
}
