import type { SuggestionOverview } from "../pages";
import { api, reloadSession } from "../utils/api";
import { Comment } from "../svgs/Icons";
import Card from "./shared/Card";
import Upvotes from "./shared/Upvote";
import Tag from "./Tag";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignInModal } from "./shared/Modal";

function SuggestionCard({
  comments,
  category,
  title,
  description,
  upvotes,
  _count,
  id,
}: SuggestionCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();
  const utils = api.useContext();
  const upvote = api.router.upvoteFeedback.useMutation({
    onSuccess: async () => {
      reloadSession();
      await utils.router.getLatestSuggestions.refetch();
      await utils.router.getFeedback.refetch(id);
    },
  });
  const removeUpvote = api.router.removeUpvote.useMutation({
    onSuccess: async () => {
      reloadSession();
      await utils.router.getLatestSuggestions.refetch();
      await utils.router.getFeedback.refetch(id);
    },
  });
  const [upvoted, setUpvoted] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes + _count.Upvotes);
  useEffect(() => {
    if (status === "authenticated")
      setUpvoted(
        session.user?.upvotes?.some((upvoteid) => upvoteid === id) || false
      );
  }, [status, session]);
  useEffect(() => {
    setUpvotesCount(upvotes + _count.Upvotes);
  }, [_count.Upvotes]);
  return (
    <>
      <Card className="group my-5  flex items-start justify-start p-6 tablet:px-8 tablet:py-7">
        <Upvotes
          isVertical
          upvoted={upvoted}
          onClick={() => {
            if (status === "authenticated") {
              if (!upvoted) {
                setUpvoted(true);
                upvote.mutate(id);
                setUpvotesCount(upvotesCount + 1);
              } else {
                setUpvoted(false);
                removeUpvote.mutate(id);
                setUpvotesCount(upvotesCount - 1);
              }
            } else {
              setShowModal(true);
            }
          }}
          className="hidden tablet:block"
          upvotes={upvotesCount}
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
                if (status === "authenticated") {
                  if (!upvoted) {
                    setUpvoted(true);
                    upvote.mutate(id);
                    setUpvotesCount(upvotesCount + 1);
                  } else {
                    setUpvoted(false);
                    removeUpvote.mutate(id);
                    setUpvotesCount(upvotesCount - 1);
                  }
                } else {
                  setShowModal(true);
                }
              }}
              className="tablet:hidden"
              upvotes={upvotesCount}
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
      {showModal && <SignInModal setShowModal={setShowModal} />}
    </>
  );
}

type SuggestionCardProps = SuggestionOverview;

export default SuggestionCard;
