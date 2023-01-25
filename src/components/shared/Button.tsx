import Link from "next/link";
import { useRouter } from "next/router";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { IconLeft } from "../../svgs/Icons";

function Button({ className, children, bgColor, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-[10px] transition duration-300 hover:bg-[#CFD7FF] ${backgroundColor(
        bgColor
      )}  text-h4 text-[#F2F4FE] hover:bg-opacity-75 ${className || ""}`}
    >
      {children}
    </button>
  );
}

function backgroundColor(
  bgColor?: "purple" | "blue" | "dark-blue" | "red"
): string {
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

export function LinkButton({
  className,
  children,
  bgColor,
  link,
}: {
  link: string;
  className?: string;
  children: ReactNode;
  bgColor?: "purple" | "blue" | "dark-blue" | "red";
}) {
  return (
    <Link
      href={link}
      className={`rounded-[10px] transition duration-300 hover:bg-[#CFD7FF] ${backgroundColor(
        bgColor
      )}  text-h4 text-[#F2F4FE] hover:bg-opacity-75 ${className || ""}`}
    >
      {children}
    </Link>
  );
}
export function GoBackButton({
  isGhost,
  className,
}: {
  className?: string;
  isGhost?: boolean;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className={` ${
        isGhost
          ? "hover:bg-opacity-0"
          : "bg-[#373F68] hover:bg-[#373F68] hover:bg-opacity-100 "
      } flex items-center justify-center ${className || ""} `}
    >
      <IconLeft
        className={` ${isGhost ? "stroke-blue" : "stroke-[#CDD2EE]"} `}
      />
      <div
        className={`pl-4  hover:underline ${isGhost ? "text-[#647196]" : ""}`}
      >
        Go Back
      </div>
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
