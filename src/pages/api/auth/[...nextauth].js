// Utility Functions Imports
import { mongoConnect } from "@/utils";
// Models Imports
import { PinterestUser } from "@/utils/models/user";
// Next-Auth Imports
import NextAuth from "next-auth";
// Next-Auth Provider Imports
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  //* PROVIDER's
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //* CALLBACK's
  callbacks: {
    //* SIGN IN CALLBACK FUNCTION
    async signIn({ user }) {
      try {
        try {
          await mongoConnect();
        } catch (error) {
          console.log(error);
        }

        const userExistance = await PinterestUser.findOne({
          email: user?.email,
        });

        if (!userExistance) {
          await PinterestUser.create({
            name: user?.name,
            email: user?.email,
            avatarUrl: user?.image,
            description: "",
            projects: [],
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    //* SESSION CALLBACK FUNCTION
    async session({ session }) {
      try {
        const user = await PinterestUser.findOne({
          email: session?.user?.email,
        });

        const newSession = {
          ...session.user,
          id: user._id,
        };

        return newSession;
      } catch (error) {
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
