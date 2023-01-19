import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconUp } from "../../svgs/Icons";
import TagCard from "./TagCard";

function Upvotes({ upvotes, upvoted, className, ...props }: UpvotesProps) {
  return (
    <TagCard
      isActive={upvoted}
      className={`group px-3 pt-[14px] pb-2 hover:text-dark-blue ${
        upvoted ? "text-white" : "text-dark-blue "
      } text-center text-body3 font-bold  ${className || ""}`}
      {...props}
    >
      <>
        <IconUp
          className={`mx-auto mb-2 transition duration-300 group-hover:stroke-blue
            ${upvoted ? "stroke-white " : "stroke-blue "}`}
        />
        {upvotes}
      </>
    </TagCard>
  );
}

type UpvotesProps = {
  upvoted?: boolean;
  upvotes: number;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default Upvotes;
