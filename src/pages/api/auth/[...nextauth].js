// Utility Functions Imports
import { mongoConnect } from "@/utils";
// Models Imports
import { PinterestUser } from "@/utils/models/user";
// Next-Auth Imports
import NextAuth from "next-auth";
// Next-Auth Provider Imports
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ], // $$ PROVIDERS
  callbacks: {
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
