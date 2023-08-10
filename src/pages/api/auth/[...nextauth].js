// Utility Functions Imports
import { mongoConnect } from "@/utils";
// Models Imports
import { PinterestUser } from "@/utils/models/user";
// Next-Auth Imports
import NextAuth from "next-auth";
// Next-Auth Provider Imports
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ], // $$ PROVIDERS
  callbacks: {
    async signIn({ user }) {
      try {
        await mongoConnect();
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
    }, // $$ SIGN IN CALLBACK FUNCTION
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
    }, // $$ SESSION CALLBACK FUNCTION
  }, // $$ CALLBACKS
};

export default NextAuth(authOptions);
