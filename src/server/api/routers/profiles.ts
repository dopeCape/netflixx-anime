import { z } from "zod";
import * as ImageAPi from "anime-images-api";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

export const profilesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name Should be atleast 3 char long" }),
        url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, url } = input;
      const userId = ctx.session.user.id;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          watchspaces: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          message: "User not  found",
          code: "NOT_FOUND",
        });
      }

      if (user?.watchspaces.length > 5) {
        throw new TRPCError({
          message: "Max of 5 profiles allowed per account",
          code: "FORBIDDEN",
        });
      }
      try {
        const create_profile = await ctx.prisma.watchSpaces.create({
          data: {
            name: name,
            id: randomUUID(),
            DisplayPisc: url,
            User: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return {
          create_profile,
        };
      } catch (error) {
        throw new TRPCError({
          message: "Interal server error ",
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
