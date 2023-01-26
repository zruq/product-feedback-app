import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { api } from "../utils/api";
import Button from "./shared/Button";

function Comment({ id, user, content, replyingTo }: CommentProps) {
  const utils = api.useContext();
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const addReply = api.router.addReply.useMutation({
    onSuccess: async () => {
      await utils.router.getFeedback.refetch(id.postId);
      setShowReply(false);
    },
  });

  return (
    <>
      <div
        className="my-6 flex items-start  justify-start   tablet:my-8  "
        id={`${replyingTo ? `reply${id}` : `comment${id}`}`}
      >
        <div className="mr-4   tablet:mr-8">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={user.image}
            alt={`avatar of ${user.username}`}
          />
        </div>
        <div className="w-full ">
          <div className="flex items-start justify-between ">
            <div className="">
              <div className="text-h4 text-[#3A4374] ">{user.name}</div>
              <div className="text-body2 text-[0.875rem] text-[#647196]">
                @{user.username}
              </div>
            </div>
            <button
              className="block text-body3 font-semibold text-blue hover:underline"
              onClick={() => setShowReply(!showReply)}
            >
              Reply
            </button>
          </div>
          <p className="-ml-12 mt-4  text-body3 text-[#647196]  tablet:ml-0 tablet:text-body2">
            {replyingTo && (
              <Link
                href={`./#${replyingTo.id}`}
                className=" font-bold text-purple tablet:text-body2"
              >
                <>@{replyingTo.author.username}</>
              </Link>
            )}{" "}
            {content}
          </p>
          {showReply && (
            <form
              className="-ml-12 mt-6 flex flex-col items-end justify-between tablet:-ml-0  tablet:flex-row tablet:items-start"
              onSubmit={(e) => {
                e.preventDefault();
                addReply.mutate({
                  content: replyContent,
                  parentCommentId: id.commentId,
                  replyingToId: id.replyId,
                });
              }}
            >
              <label
                className=" block w-full tablet:w-[77%] "
                htmlFor="add-reply"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  name="add-reply"
                  id="add-reply"
                  placeholder="Type your comment here"
                  className="input h-20 w-full resize-none"
                />
              </label>
              <Button
                disabled={
                  250 - replyContent.length < 0 ||
                  addReply.isLoading ||
                  replyContent.length < 5
                }
                bgColor="purple"
                className="mt-3 block px-6  py-3 disabled:cursor-not-allowed disabled:bg-dark-blue tablet:mt-0"
              >
                Post Reply
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

type CommentProps = {
  id: { commentId: number; replyId?: number; postId: number };
  user: {
    username: string;
    name: string;
    image: string;
  };
  content: string;
  replyingTo?: {
    id: number;
    author: {
      username: string;
    };
  };
};

export default Comment;
