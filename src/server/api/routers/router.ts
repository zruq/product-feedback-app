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
        id: true,
        title: true,
        description: true,
        upvotes: true,
        category: { select: { id: true, title: true } },
        _count: { select: { comments: true, Upvotes: true } },
      },
    });
  }),

  getUpvotedPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.upvotes.findMany({
      where: { upvotedId: ctx.session.user.id },
      select: { feedbackId: true },
    });
  }),
  upvoteFeedback: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.upvotes.create({
        data: { feedbackId: input, upvotedId: ctx.session.user.id },
      });
    }),
  removeUpvote: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.upvotes.delete({
        where: {
          feedbackId_upvotedId: {
            feedbackId: input,
            upvotedId: ctx.session.user.id,
          },
        },
      });
    }),
});
