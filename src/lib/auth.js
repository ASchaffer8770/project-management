// src/lib/auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "test",
          email: "test@example.com",
          password: "$2b$10$8dW5E1iJj4Hj96hyp1.o9ePtiUv49nC/DkNJXONpXnsET9jHfRNNi", // hash for "test123"
        };
        if (
          credentials?.email === user.email &&
          await bcrypt.compare(credentials.password, user.password)
        ) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);