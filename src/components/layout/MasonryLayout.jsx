// Components Imports
import { Project } from "..";
// Masonry Imports
import Masonry from "react-masonry-css";
// Constants Imports
import { breackPointsObject } from "@/constant";

const MasonryLayout = ({ projects }) => {
  return (
    <Masonry
      className="flex justify-center gap-1 sm:gap-2 md:gap-4 p-1 lg:p-5"
      breakpointCols={breackPointsObject}
    >
      {projects.map((project) => (
        <Project key={project?._id} {...project} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
