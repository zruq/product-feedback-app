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
      <path d="M4 9L0 5L4 1" strokeWidth="2" />
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
      <path d="M1 6l4-4 4 4" strokeWidth="2" fill="none" fillRule="evenodd" />
    </svg>
  );
}

export function IconDown({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`stroke-blue hover:stroke-blue ${className || ""}`}
      {...props}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1l4 4 4-4" strokeWidth="2" fill="none" fillRule="evenodd" />
    </svg>
  );
}

export function Checkmark({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="13" height="11">
      <path
        fill="none"
        stroke="#AD1FEA"
        strokeWidth="2"
        d="M1 5.233L4.522 9 12 1"
      />
    </svg>
  );
}
