// React Imports
import { Fragment, useState } from "react";
// Next Imports
import Image from "next/image";
import Link from "next/link";
// Next-Auth Imports
import { signOut } from "next-auth/react";
// Headless UI Imports
import { Menu, Transition } from "@headlessui/react";
// React Icons Imports
import { FiSettings } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { MdRoomPreferences } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
// Utility Functions Imports
import { shorterText } from "@/utils";

const ProfileMenu = ({ session }) => {
  const [openModal, setOpenModal] = useState(false);

  const menuItems = [
    {
      href: `/profile/${session?.data?.id}`,
      icon: <MdRoomPreferences className="mr-2" />,
      text: "Work Preferences",
      id: 1,
    },
    {
      href: `/profile/${session?.data?.id}`,
      icon: <FiSettings className="mr-2" />,
      text: "Settings",
      id: 2,
    },
    {
      href: `/profile/${session?.data?.id}`,
      icon: <AiOutlineUser className="mr-2" />,
      text: "Profile",
      id: 3,
    },
  ];

  return (
    <div className="relative">
      <Menu as="div" className="text-gray-600">
        {/*   MENU BUTTON/PROFILE PIC SECTION   */}
        <div className="flex items-center gap-1">
          {session?.data?.image && (
            <>
              <Menu.Button onClick={() => setOpenModal(!openModal)}>
                <BsChevronDown className="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center p-3 transition duration-100 ease-in-out" />
              </Menu.Button>
              <Link href={`/profile/${session?.data?.id}`}>
                <Image
                  src={session?.data?.image}
                  alt="user pic"
                  width={50}
                  height={50}
                  className="header-user-pic"
                />
              </Link>
            </>
          )}
        </div>
        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          {/*   MENU ITEMS SECTION   */}
          <Menu.Items
            onMouseLeave={() => setOpenModal(false)}
            className="absolute w-[280px] top-[62px] right-0 z-20 bg-white shadow-lg rounded-xl p-3"
          >
            {/* PROFILE */}
            <div className="flex gap-3 bg-gray-100 rounded-md p-2">
              <Image
                src={session?.data?.image}
                alt="user pic"
                width={55}
                height={55}
                className="rounded-full"
              />
              <div>
                <p className="uppercase font-medium">
                  {shorterText(session?.data?.name, 10)}
                </p>
                <p className="font-light">
                  {shorterText(session?.data?.email, 20)}
                </p>
              </div>
            </div>
            {/* MENU ITEM */}
            <div className="my-2 mt-4">
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.id}
                  className="font-medium hover:bg-gray-100 p-2 rounded-md"
                >
                  <Link href={item.href} className="flex items-center">
                    {item.icon} {item.text}
                  </Link>
                </Menu.Item>
              ))}
            </div>
            {/* SIGNOUT BUTTON */}
            <div className="border-t pt-2">
              <Menu.Item className="font-medium hover:bg-gray-100 p-2 rounded-md text-purple-500">
                <button
                  className="flex items-center w-full"
                  type="button"
                  onClick={() => signOut()}
                >
                  <PiSignOutBold className="mr-2" /> Sign Out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
