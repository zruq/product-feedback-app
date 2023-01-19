import type { ReactElement } from "react";

function TagCard({ isActive, children, className }: TagProps) {
  return (
    <div
      className={`w-fit transition duration-300  ${
        isActive
          ? "bg-blue text-white hover:text-blue"
          : "bg-light-grey text-blue "
      } rounded-[10px] hover:bg-[#CFD7FF] ${className || ""}`}
    >
      {children}
    </div>
  );
}

type TagProps = {
  isActive?: boolean;
  className?: string;
  children: ReactElement;
};

export default TagCard;
