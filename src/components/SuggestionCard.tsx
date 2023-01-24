import type { SuggestionOverview } from "../pages";
import { api } from "../utils/api";
import { Comment } from "../svgs/Icons";
import Card from "./shared/Card";
import Upvotes from "./shared/Upvote";
import Tag from "./Tag";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function SuggestionCard({
  comments,
  category,
  title,
  description,
  upvotes,
  _count,
  id,
}: SuggestionCardProps) {
  const { data, status } = useSession();
  const upvote = api.router.upvoteFeedback.useMutation();
  const removeUpvote = api.router.removeUpvote.useMutation();
  const [upvoted, setUpvoted] = useState(false);
  const [upvotesState, setUpvotesState] = useState(upvotes + _count.Upvotes);
  useEffect(() => {
    if (status === "authenticated")
      setUpvoted(data?.user?.upvotes.some((postid) => postid === id) || false);
  }, [status]);
  return (
    <Card className="group my-5  flex items-start justify-start p-6 tablet:px-8 tablet:py-7">
      <Upvotes
        upvoted={upvoted}
        onClick={() => {
          if (!upvoted) {
            setUpvotesState(upvotesState + 1);
            upvote.mutate(id);
            setUpvoted(true);
          } else {
            setUpvotesState(upvotesState - 1);
            removeUpvote.mutate(id);
            setUpvoted(false);
          }
        }}
        className="hidden tablet:block"
        upvotes={upvotesState}
      />
      <div className=" flex h-full w-full flex-col justify-between  tablet:flex-row tablet:items-center ">
        <div className=" pb-4 tablet:px-10 tablet:pb-0">
          <Link
            href={`/feedback/${id}`}
            className="cursor-pointer text-body3 font-bold tracking-[-0.18px] text-dark-blue group-hover:text-blue tablet:text-h3"
          >
            {title}
          </Link>
          <p className="mb-2.5 mt-2 text-body3  text-greyish-blue tablet:mt-1  tablet:mb-3 tablet:text-body1">
            {description}
          </p>
          <Tag content={category.title} />
        </div>
        <div className="flex w-full justify-between  tablet:w-fit">
          <Upvotes
            upvoted={upvoted}
            onClick={() => {
              if (!upvoted) {
                setUpvotesState(upvotesState + 1);
                upvote.mutate(id);
                setUpvoted(true);
              } else {
                setUpvotesState(upvotesState - 1);
                removeUpvote.mutate(id);
                setUpvoted(false);
              }
            }}
            className="tablet:hidden"
            upvotes={upvotesState}
          />

          <div className="flex items-center justify-center text-body1 font-bold text-dark-blue">
            <Comment />
            <div className="ml-2 text-body3 font-bold tablet:text-body1">
              {_count.comments +
                comments.reduce((acc, curr) => acc + curr._count.replies, 0)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

type SuggestionCardProps = SuggestionOverview & {
  upvotedPosts: number[];
  setUpvotedPosts?: Dispatch<SetStateAction<number[]>>;
};

export default SuggestionCard;
