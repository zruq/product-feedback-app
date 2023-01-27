import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user, token }) {
      if (session.user && token.sub) {
        const id = token.sub;
        session.user.id = id;
        const someuser = await prisma.user.findUnique({
          where: { id },
          select: { isAdmin: true, Upvotes: { select: { feedbackId: true } } },
        });
        session.user.isAdmin = someuser?.isAdmin || false;
        const upvotes = someuser?.Upvotes || [];
        session.user.upvotes = upvotes.map((x) => x.feedbackId);
      }

      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const usernames = [
          "upbeat1811",
          "brawnybrave",
          "hexagon.bestagon",
          "hummingbird1",
          "annev1990",
          "voyager.344",
          "soccerviewer8",
          "arlen_the_marlin",
          "warlikeduke",
          "peppersprime32",
          "velvetround",
          "countryspirit",
        ];
        const username =
          usernames[Math.floor(Math.random() * usernames.length)];
        const user = await prisma.user.findFirst({
          where: { username: { equals: username } },
        });
        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
