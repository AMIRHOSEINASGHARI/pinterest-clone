// Next Imports
import Link from "next/link";
import { useRouter } from "next/router";
// Next-Auth Imports
import { signOut } from "next-auth/react";
// Headless UI Imports
import { Transition } from "@headlessui/react";
// Components Imports
import { Button } from "..";
// React Icons Imports
import { AiFillHome } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";

const MenuCategory = ({ categories, showMenu, setShowMenu, session }) => {
  const router = useRouter();

  const handleSetPathName = (category) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", category.toLowerCase());
    const newPathName = `/?${searchParams}`;
    router.push(newPathName);
    setShowMenu(false);
  };

  return (
    <div
      className={`fixed h-[90.4%] top-[78px] bg-white shadow-2xl shadow-gray-400 left-0 z-30 overflow-y-auto`}
    >
      <Transition
        show={showMenu}
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="flex flex-col gap-0.5 divide-y-2"
      >
        {/*   ALL   */}
        <Link
          onClick={() => setShowMenu(false)}
          href="/"
          className="flex items-center font-bold text-lg text-purple-500 py-2 pl-5 lg:pl-8 pr-14 lg:pr-20"
        >
          <div className="mr-4">
            <AiFillHome className="text-xl" />
          </div>
          All
        </Link>
        {/*   CATEGORIES   */}
        <div className="gap-0.5 flex flex-col">
          {categories.map((item, index) => (
            <div
              onClick={() => handleSetPathName(item.name)}
              key={index}
              className={`${
                item.name.toLowerCase() ===
                  router?.query?.category?.toLowerCase() &&
                "bg-gray-200 text-purple-600"
              } flex items-center hover:bg-gray-200 hover:text-gray-800 text-gray-600 transition duration-100 ease-in-out py-2 pl-5 lg:pl-8 pr-14 lg:pr-20 cursor-pointer`}
            >
              <div className="mr-4 text-xl">{item.icon}</div>
              <span className="tracking-tight text-sm">{item.name}</span>
            </div>
          ))}
        </div>
        {/*   SIGN OUT BTN   */}
        {session.status === "authenticated" && (
          <Button
            styles="flex items-center font-bold text-red-500 py-2 pl-5 lg:pl-8 pr-14 lg:pr-20"
            handleButton={() => signOut()}
            type="button"
            title={
              <>
                <PiSignOutBold className="mr-4 text-xl" />
                Sign Out
              </>
            }
          />
        )}
      </Transition>
    </div>
  );
};

export default MenuCategory;
