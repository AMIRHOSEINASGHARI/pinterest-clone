//* Next-Auth Imports
import { getSession } from "next-auth/react";
//* Components Imports
import { Modal, ProjectForm } from "@/components";

const CreateProject = () => {
  return (
    <Modal>
      <h1 className="text-4xl font-black">Create a New Project</h1>
      <ProjectForm type="create" />
    </Modal>
  );
};

export default CreateProject;

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
