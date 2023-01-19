import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactElement,
} from "react";

function TagCard({ isActive, children, className, ...props }: TagProps) {
  return (
    <button
      {...props}
      className={`w-fit transition duration-300  ${
        isActive
          ? "bg-blue text-white hover:text-blue"
          : "bg-light-grey text-blue "
      } rounded-[10px] hover:bg-[#CFD7FF] ${className || ""}`}
    >
      {children}
    </button>
  );
}

type TagProps = {
  isActive?: boolean;
  children: ReactElement;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default TagCard;
