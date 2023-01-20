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

export function HamMenu({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="20" height="17" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFF" fillRule="evenodd">
        <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
      </g>
    </svg>
  );
}

export function Close({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="18" height="17" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </svg>
  );
}
export function Comment({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="18" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
        fill="#CDD2EE"
        fillRule="nonzero"
      />
    </svg>
  );
}
