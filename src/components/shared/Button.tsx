import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconLeft } from "../../svgs/Icons";

function Button({ className, children, bgColor, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-[10px] transition duration-300 hover:bg-[#CFD7FF] ${backgroundColor()} py-3 px-11 text-h4 text-[#F2F4FE] hover:bg-opacity-75 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );

  function backgroundColor(): string {
    switch (bgColor) {
      case "blue":
        return " bg-blue ";
      case "dark-blue":
        return " bg-dark-blue ";
      case "purple":
        return " bg-purple ";
      case "red":
        return " bg-red ";
      default:
        return "";
    }
  }
}

export function GoBackButton({ isGhost }: { isGhost?: boolean }) {
  return (
    <Button
      className={`${
        isGhost
          ? "text-greyish-blue hover:bg-opacity-0"
          : "bg-[#373F68] hover:bg-[#373F68] hover:bg-opacity-100 "
      } flex items-center justify-center  hover:underline `}
    >
      <IconLeft
        className={` ${isGhost ? "stroke-blue" : "stroke-[#CDD2EE]"} `}
      />
      <div className="pl-4">Go Back</div>
    </Button>
  );
}

type ButtonProps = {
  bgColor?: "purple" | "blue" | "dark-blue" | "red";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default Button;
