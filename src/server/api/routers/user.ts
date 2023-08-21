import { z } from "zod";

import * as bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { randomUUID } from "crypto";

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
});
