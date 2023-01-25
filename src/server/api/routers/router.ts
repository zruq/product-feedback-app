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
        id: true,
        upvotes: true,
        _count: { select: { Upvotes: true, comments: true } },
        title: true,
        description: true,
        category: { select: { id: true, title: true } },
        comments: {
          select: {
            id: true,
            content: true,
            user: { select: { name: true, username: true, image: true } },
            replies: {
              select: {
                id: true,
                content: true,
                author: { select: { image: true, username: true, name: true } },
                replyingTo: {
                  select: { id: true, author: { select: { username: true } } },
                },
              },
            },
          },
        },
      },
    });

    // const comments = productRequest?.comments.filter(
    //   (comment) => !comment.replyingTo
    // );
  }),
  getLatestSuggestions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productRequest.findMany({
      where: { status: { equals: "SUGGESTION" } },
      orderBy: { upvotes: "desc" },
      take: 20,
      select: {
        comments: { select: { _count: { select: { replies: true } } } },
        id: true,
        title: true,
        description: true,
        upvotes: true,
        category: { select: { id: true, title: true } },
        _count: { select: { comments: true, Upvotes: true } },
      },
    });
  }),
  getRoadmapData: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productRequest.findMany({
      where: { status: { not: "SUGGESTION" } },
      orderBy: { upvotes: "desc" },
      take: 20,
      select: {
        comments: { select: { _count: { select: { replies: true } } } },
        id: true,
        title: true,
        description: true,
        upvotes: true,
        category: { select: { id: true, title: true } },
        _count: { select: { comments: true, Upvotes: true } },
        status: true,
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

  addComment: protectedProcedure
    .input(
      z.object({ productRequestId: z.number(), content: z.string().max(250) })
    )
    .mutation(({ ctx, input }) => {
      const { content, productRequestId } = input;
      return ctx.prisma.comment.create({
        data: { content, productRequestId, userId: ctx.session.user.id },
      });
    }),
  addReply: protectedProcedure
    .input(
      z.object({
        parentCommentId: z.number(),
        content: z.string().max(250),
        replyingToId: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { content, parentCommentId, replyingToId: replyId } = input;
      return ctx.prisma.reply.create({
        data: {
          content,
          parentCommentId,
          authorId: ctx.session.user.id,
          replyId,
        },
      });
    }),
});
