import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

import * as ImageAPi from "anime-images-api";
import { randomUUID } from "crypto";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ account, user, token }) {
      token.id = "123";
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
        username: { label: "UserName", type: "text" },
      },
      async authorize(credentials, req) {
        if (credentials?.type == "login") {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });
          if (user) {
            if (await bcrypt.compare(credentials?.password, user.password)) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          try {
            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email,
              },
            });
            if (user != null) {
              console.log(user)
              return null;
            }
            const pass: string = await bcrypt.hash(credentials?.password, 5);
            const API = new ImageAPi();
            let { image } = await API.sfw.wink();
            const createdUser = await prisma.user.create({
              data: {
                name: credentials?.username,
                email: credentials?.email,
                id: randomUUID(),
                password: pass,
                watchspaces: {
                  create: {
                    id: randomUUID(),
                    name: credentials?.username,
                    DisplayPisc: image,
                  }

                }
              },
            });
            return createdUser;
          } catch (error) {
            return null
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
