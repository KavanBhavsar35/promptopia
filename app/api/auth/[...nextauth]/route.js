import NextAuth from "@node_modules/next-auth";
import GoogleProvider from "@node_modules/next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      console.log("Google profile data:", profile);
      try {
        await connectToDB();

        // Check if user already exists
        const user = await User.findOne({ email: profile.email });
        console.log("Existing user:", user);
        
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "_").toLowerCase(),
            image: profile.picture,
          });
          console.log("New user created:", profile);
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
