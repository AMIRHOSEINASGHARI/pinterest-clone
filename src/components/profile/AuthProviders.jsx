// Next-Auth Imports
import { signIn } from "next-auth/react";
// React Icons Imports
import { LiaGithubAlt } from "react-icons/lia";

const AuthProviders = () => {
  return (
    <button
      type="button"
      className="signin-btn"
      onClick={() => signIn("github")}
    >
      <LiaGithubAlt className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
      Sign in with GitHub
    </button>
  );
};

export default AuthProviders;
