import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import TagCard from "./shared/TagCard";

function Tag({ isActive, content, className, ...props }: TagProps) {
  return (
    <TagCard
      {...props}
      isActive={isActive}
      className={`px-4 py-1.5 text-body3 font-semibold capitalize ${
        className || ""
      }`}
    >
      {content}
    </TagCard>
  );
}

type TagProps = {
  isActive?: boolean;
  content: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default Tag;
