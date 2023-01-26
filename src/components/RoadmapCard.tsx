import Upvotes from "./shared/Upvote";
import Tag from "./Tag";
import { Comment } from "../svgs/Icons";
import Link from "next/link";
import { api, reloadSession } from "../utils/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
function RoadmapCard({
  id,
  category,
  description,
  numberOfComments,
  status,
  title,
  upvotes,
}: RMCProps) {
  const session = useSession();
  const utils = api.useContext();
  const upvote = api.router.upvoteFeedback.useMutation({
    onSuccess: async () => {
      reloadSession();
      await utils.router.getRoadmapData.refetch();
      await utils.router.getFeedback.refetch(id);
    },
  });
  const removeUpvote = api.router.removeUpvote.useMutation({
    onSuccess: async () => {
      reloadSession();
      await utils.router.getRoadmapData.refetch();
      await utils.router.getFeedback.refetch(id);
    },
  });
  const [upvoted, setUpvoted] = useState(false);
  const [upvotesState, setUpvotesState] = useState(upvotes);
  useEffect(() => {
    if (session.status === "authenticated")
      setUpvoted(
        session?.data?.user?.upvotes.some((upvote) => upvote === id) ?? false
      );
  }, [session]);
  if (session.status === "loading") return null;

  return (
    <div
      className={`mb-4 flex flex-col justify-between rounded-b-[10px] rounded-t-[5px]  border-t-[6px] tablet:min-h-[251px] desktop:mb-6 desktop:min-h-[272px] ${
        getPropsByStatus(status).borderColor
      } bg-white p-6 tablet:p-5 tablet:py-6 desktop:px-8`}
    >
      <div className="flex items-center ">
        <div
          className={`mr-2 h-2 w-2 rounded-full ${
            getPropsByStatus(status).bgColor
          }`}
        ></div>
        <div className="text-body3 text-[#647196] desktop:text-body1">
          {getPropsByStatus(status).content}
        </div>
      </div>

      <div className="mt-4 text-body3 font-bold text-[#3A4374] hover:text-blue desktop:text-h3">
        <Link href={`/feedback/${id}`}>{title}</Link>
      </div>
      <p className="my-2 text-body3 text-[#647196] tablet:mb-6 desktop:mb-4 desktop:text-body1">
        {description}
      </p>
      <Tag content={category} className="mb-4" />
      <div className="flex w-full justify-between  ">
        <Upvotes
          upvoted={upvoted}
          onClick={() => {
            if (session.status === "authenticated") {
              if (!upvoted) {
                upvote.mutate(id);
                setUpvoted(true);
                setUpvotesState((upvotesState) => upvotesState + 1);
              } else {
                removeUpvote.mutate(id);
                setUpvoted(false);
                setUpvotesState((upvotesState) => upvotesState - 1);
              }
            } else {
              console.log("you need to login first");
            }
          }}
          className="tablet:flex tablet:min-w-[69px] tablet:items-center tablet:justify-center tablet:py-1.5 tablet:px-3"
          upvotes={upvotesState}
        />

        <div className="flex items-center justify-center text-body1 font-bold text-dark-blue">
          <Comment />
          <div className="ml-2 text-body3 font-bold tablet:text-body1">
            {numberOfComments}
          </div>
        </div>
      </div>
    </div>
  );
}

type RMCProps = {
  id: number;
  status: "PLANNED" | "IN_PROGRESS" | "LIVE";
  title: string;
  description: string;
  category: string;
  numberOfComments: number;
  upvotes: number;
};

export default RoadmapCard;

function getPropsByStatus(status: "PLANNED" | "IN_PROGRESS" | "LIVE") {
  switch (status) {
    case "PLANNED":
      return {
        borderColor: "border-[#F49F85]",
        bgColor: "bg-[#F49F85]",
        content: "Planned",
      };
    case "IN_PROGRESS":
      return {
        borderColor: "border-[#AD1FEA]",
        bgColor: "bg-[#AD1FEA]",
        content: "In Progress",
      };
    case "LIVE":
      return {
        borderColor: "border-[#62BCFA]",
        bgColor: "bg-[#62BCFA]",
        content: "Live",
      };
  }
}
