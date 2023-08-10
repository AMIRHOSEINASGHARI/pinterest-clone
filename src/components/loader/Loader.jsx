// React Loader Imports
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ h, w, text, color }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <ThreeDots
        height={h}
        width={w}
        radius="9"
        color={color || "#000"}
        ariaLabel="three-dots-loading"
        visible={true}
      />
      {text && <p className="text-center tracking-tight -mt-5">{text}</p>}
    </div>
  );
};

export default Loader;
