import { z } from "zod";

import * as ImageAPi from "anime-images-api";
import * as bcrypt from "bcrypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";
import { User } from "@/lib/slices/userStore";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        password: z
          .string()
          .min(4, { message: "password should be atleast 4 char long" }),
        usename: z
          .string()
          .min(3, { message: "Username should be atleast 3 char long" }),
        email: z
          .string()
          .min(1, { message: "Email is required" })
          .email("Invalid Email"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user) {
        return { message: "user with Email already exists" };
      }
      const pass: string = await bcrypt.hash(input.password, 5);

      const createdUser = await ctx.prisma.user.create({
        data: {
          name: input.usename,
          email: input.email,
          id: randomUUID(),
          password: pass,
        },
      });
      return { createdUser };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z
          .string()
          .min(1, { message: "Invalid Email" })
          .email({ message: "Invalid email" }),
        password: z.string().min(4, { message: "Invalid Password" }),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        if (await bcrypt.compare(input.password, user.password)) {
          return { user };
        }
      } else {
        return { messag: "User does not exists" };
      }

      return {};
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;
    const userr = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        watchspaces: true,
      },
    });
    if (userr == null) {
      throw new TRPCError({
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    const user: User = {
      name: userr.name,
      profiles: userr.watchspaces,
      id: userr.id,
      email: userr.email
    }
    return { user };
  }),
  getRandomImage: publicProcedure.query(async () => {
    const API = new ImageAPi();
    let { image } = await API.sfw.wink();
    return { image }


  })
});
