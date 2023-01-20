import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const router = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getCategoryies: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({ select: { id: true, title: true } });
  }),

  getLatestSuggestions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productRequest.findMany({
      where: { status: { equals: "SUGGESTION" } },
      orderBy: { upvotes: "desc" },
      take: 20,
      select: {
        title: true,
        description: true,
        upvotes: true,
        category: { select: { id: true, title: true } },
        _count: { select: { comments: true } },
      },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
