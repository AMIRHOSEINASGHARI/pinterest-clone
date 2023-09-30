//* Next Imports
import Link from "next/link";
//* React Icons Imports
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="text-center p-3 mt-28 flex flex-col items-center">
      <FiAlertTriangle className="text-6xl text-red-500 mb-2" />
      <h1 className="text-2xl lg:text-3xl font-black mb-8">
        Oops! Page Not Found
      </h1>
      <Link
        href="/"
        className="border-purple-500 border-2 font-black bg-purple-50 hover:bg-purple-100 transition duration-100 ease-in-out text-purple-600 py-2 px-6 rounded-3xl"
      >
        Home Page
      </Link>
    </div>
  );
};

export default NotFound;
