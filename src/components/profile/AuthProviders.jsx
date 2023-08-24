// Next-Auth Imports
import { signIn } from "next-auth/react";
// React Icons Imports
import { FcGoogle } from "react-icons/fc";
// Components Imports
import { Button } from "..";

const AuthProviders = () => {
  return (
    <Button
      handleButton={() => signIn("google")}
      type="button"
      styles="flex items-center gap-2 shadow rounded-lg py-1 px-3"
      title={
        <>
          <FcGoogle className="text-2xl" />
          <span className="text-xs lg:text-base font-semibold text-gray-500">
            Sign in with Google
          </span>
        </>
      }
    />
  );
};

export default AuthProviders;
