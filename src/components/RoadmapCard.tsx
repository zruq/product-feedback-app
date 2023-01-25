import Upvotes from "./shared/Upvote";
import Tag from "./Tag";
import { Comment } from "../svgs/Icons";

function RoadmapCard({
  category,
  description,
  numberOfComments,
  status,
  title,
  upvotes,
}: RMCProps) {
  return (
    <div
      className={`rounded-b-[10px] rounded-t-[5px] border-t-[6px] ${
        getPropsByStatus(status).borderColor
      } bg-white p-6`}
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
        {title}
      </div>
      <p className="my-2 text-body3 text-[#647196] desktop:text-body1">
        {description}
      </p>
      <Tag content={category} className="mb-4" />
      <div className="flex w-full justify-between  ">
        <Upvotes
          upvoted={false}
          onClick={() => {
            null;
          }}
          className="tablet:flex tablet:min-w-[69px] tablet:items-center tablet:justify-center tablet:py-1.5 tablet:px-3"
          upvotes={upvotes}
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
