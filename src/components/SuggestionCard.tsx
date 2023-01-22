import type { SuggestionOverview } from "../pages";
import { api } from "../utils/api";
import { Comment } from "../svgs/Icons";
import Card from "./shared/Card";
import Upvotes from "./shared/Upvote";
import Tag from "./Tag";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

function SuggestionCard({
  setUpvotedPosts,
  category,
  title,
  description,
  upvotes,
  _count,
  id,
  upvotedPosts,
}: SuggestionCardProps) {
  const upvote = api.router.upvoteFeedback.useMutation();
  const removeUpvote = api.router.removeUpvote.useMutation();
  const upvoted = upvotedPosts.some((postid) => postid === id);
  const [upvotesState, setUpvotesState] = useState(upvotes + _count.Upvotes);
  return (
    <Card className="group my-5  flex items-start justify-start px-8 py-7">
      <Upvotes
        upvoted={upvoted}
        onClick={() => {
          if (!upvoted) {
            setUpvotedPosts(upvotedPosts.concat(id));
            setUpvotesState(upvotesState + 1);
            upvote.mutate(id);
          } else {
            setUpvotedPosts(upvotedPosts.filter((feedback) => feedback !== id));
            setUpvotesState(upvotesState - 1);
            removeUpvote.mutate(id);
          }
        }}
        className="hidden tablet:block"
        upvotes={upvotesState}
      />
      <div className=" flex h-full w-full flex-col justify-between  tablet:flex-row tablet:items-center ">
        <div className="pb-4 tablet:px-10 tablet:pb-0">
          <a className="cursor-pointer text-h3 text-dark-blue group-hover:text-blue">
            {title}
          </a>
          <p className="mt-1 mb-3 text-body1 text-greyish-blue">
            {description}
          </p>
          <Tag content={category.title} />
        </div>
        <div className="flex w-full justify-between tablet:w-fit">
          <Upvotes
            onClick={() => {
              return;
            }}
            className="tablet:hidden"
            upvotes={upvotesState}
          />

          <div className="flex items-center justify-center text-body1 font-bold text-dark-blue">
            <Comment />
            <div className="ml-2"> {_count.comments}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

type SuggestionCardProps = SuggestionOverview & {
  upvotedPosts: number[];
  setUpvotedPosts: Dispatch<SetStateAction<number[]>>;
};

export default SuggestionCard;
