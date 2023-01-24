import type { ReactNode } from "react";
import { GoBackButton } from "./shared/Button";

function Navbar({ children }: { children?: ReactNode }) {
  return (
    <div
      className="mb-6 mt-9 flex w-full items-center justify-between tablet:mb-16 tablet:mt-14 desktop:mt-24
    "
    >
      <GoBackButton isGhost />
      {children}
    </div>
  );
}

export default Navbar;
