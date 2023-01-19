import type { SVGProps } from "react";

export function IconLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 9L0 5L4 1" stroke-width="2" />
    </svg>
  );
}

export function IconUp({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`stroke-blue hover:stroke-blue ${className || ""}`}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 6l4-4 4 4" stroke-width="2" fill="none" fill-rule="evenodd" />
    </svg>
  );
}
