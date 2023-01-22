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

  createFeedback: publicProcedure
    .input(
      z.object({
        title: z.string().min(5).max(255),
        description: z.string().min(10),
        categoryId: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { description, title, categoryId } = input;
      return ctx.prisma.productRequest.create({
        data: { description, title, categoryId },
      });
    }),

  getFeedback: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.productRequest.findUnique({
      where: { id: input },
      select: {
        upvotes: true,
        _count: { select: { Upvotes: true, comments: true } },
        title: true,
        description: true,
        category: { select: { id: true, title: true } },
        comments: {
          select: {
            commentId: true,
            content: true,
            replyingTo: true,
            user: { select: { image: true, name: true, username: true } },
          },
        },
      },
    });
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
