import { useSession } from "next-auth/react";
import Button, { GoBackButton } from "./shared/Button";

function Navbar() {
  const { status } = useSession();
  return (
    <div
      className="flex items-center justify-between
    "
    >
      <GoBackButton isGhost />
    </div>
  );
}

export default Navbar;
