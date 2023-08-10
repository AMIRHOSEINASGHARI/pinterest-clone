// React Imports
import React, { useEffect, useState } from "react";
// Components Imports
import { Loader, MasonryLayout } from "@/components";

const Home = ({ query }) => {
  const [projects, setPtojects] = useState([]);
  console.log(projects);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/project/get-all");
      const data = await res.json();

      const filterData = data?.data?.filter(
        (project) =>
          project.category.toLowerCase() === query?.category?.toLowerCase()
      );

      if (filterData.length) {
        setPtojects(filterData);
      } else {
        setPtojects(data?.data);
      }
    };

    fetchProjects();
  }, [query]);

  if (projects?.length === 0) {
    return (
      <Loader
        h="120"
        w="120"
        color="#6b7280"
        text="We are adding new ideas to your feed"
      />
    );
  } else if (!projects) {
    <h1 className="text-center text-3xl">No Pins yet</h1>;
  } else {
    return (
      <>
        {Object.keys(query).length !== 0 && (
          <h1 className="text-center font-black text-lg lg:text-4xl mt-24 mb-3 text-purple-600">
            <span className="uppercase">{query.category}</span> Ideas
          </h1>
        )}
        <MasonryLayout projects={projects} />
      </>
    );
  }
};

export default Home;

export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}
