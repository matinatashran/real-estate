import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/auth";
import { validation } from "@/utils/validation";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        const emptyErr = validation([email, password], "NOT_EMPTY");
        if (emptyErr) throw new Error(emptyErr);

        try {
          await connectDB();
        } catch (err) {
          throw new Error("An error occoured in server!");
        }

          const user = await User.findOne({ email });
          if (!user)
            throw new Error("Email not exist! Please register at first.");

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) throw new Error("Email or password incorrect!");

          return { id: user._id, email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
