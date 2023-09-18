// React Imports
import { useState } from "react";
// Next Imports
import Link from "next/link";
import Image from "next/image";
// Next-Auth Imports
import { signIn, useSession } from "next-auth/react";
// Components Imports
import { AuthProviders, Button, MenuCategory, ProfileMenu } from "..";
// COnstants Imports
import { categoryFilters } from "@/constant";
// React Icons Imports
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const session = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="header">
        <div className="flex items-center gap-4">
          <Button
            title={showMenu ? <GrClose /> : <HiOutlineMenu />}
            handleButton={handleMenu}
            styles="p-2 hover:bg-gray-100 rounded-full text-3xl"
          />
          {/* //   LOGO SECTION    //*/}
          <Link href="/">
            <Image
              src="/logo-pen.svg"
              alt="logo"
              width={50}
              height={50}
              className="header-logo"
            />
          </Link>
        </div>
        {session.status === "unauthenticated" ? (
          <AuthProviders />
        ) : (
          <div className="flex items-center gap-1">
            <Link
              href="/project/create-project"
              className="flex items-center justify-center border-2 border-black w-10 h-10 rounded-full"
            >
              <AiOutlinePlus />
            </Link>
            <ProfileMenu session={session} />
          </div>
        )}
      </div>
      <MenuCategory
        categories={categoryFilters}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        session={session}
      />
    </header>
  );
};

export default Navbar;
