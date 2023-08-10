// Components Imports
import { Project } from "..";
// Masonry Imports
import Masonry from "react-masonry-css";
// Constants Imports
import { breackPointsObject } from "@/constant";

const MasonryLayout = ({ projects, isProfile }) => {
  return (
    <Masonry
      className="flex justify-center gap-1 md:gap-2 p-1 lg:p-3"
      breakpointCols={breackPointsObject}
    >
      {projects.map((project) => (
        <Project key={project?._id} {...project} isProfile={isProfile} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
