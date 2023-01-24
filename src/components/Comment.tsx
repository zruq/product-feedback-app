import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { api } from "../utils/api";
import Button from "./shared/Button";

function Comment({ id, user, content, replyingTo }: CommentProps) {
  const appReply = api.router.addReply.useMutation();
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  return (
    <>
      <div
        className=" flex items-start justify-start py-8 "
        id={`${replyingTo ? `reply${id}` : `comment${id}`}`}
      >
        <div className="mr-8 ">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={user.image}
            alt={`avatar of ${user.username}`}
          />
        </div>
        <div className="w-full">
          <div className="flex items-start justify-between">
            <div className="">
              <div className="text-h4 text-[#3A4374]">{user.name}</div>
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
          <div className="mt-4 text-body2 text-[#647196]">
            {" "}
            {replyingTo && (
              <Link
                href={`./#${replyingTo.id}`}
                className="text-body2 font-bold text-purple"
              >
                <>@{replyingTo.author.username}</>
              </Link>
            )}{" "}
            {content}
          </div>
          {showReply && (
            <form
              className="mt-6 flex items-start justify-between"
              onSubmit={(e) => {
                e.preventDefault();
                appReply.mutate({
                  content: replyContent,
                  parentCommentId: id.commentId,
                  replyingToId: id.replyId,
                });
              }}
            >
              <label className="block w-[77%] " htmlFor="add-reply">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  name="add-reply"
                  id="add-reply"
                  placeholder="Type your comment here"
                  className="input h-20 w-full resize-none"
                />
              </label>
              <Button bgColor="purple" className="block   px-6 py-3">
                Post Reply
              </Button>
            </form>
          )}
        </div>
      </div>
      <div
        className={` absolute bottom-0 -left-7 hidden h-[12.5rem] w-px bg-white ${
          replyingTo && showReply ? "last-of-type:block" : " "
        } `}
      ></div>
    </>
  );
}

type CommentProps = {
  id: { commentId: number; replyId?: number };
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
