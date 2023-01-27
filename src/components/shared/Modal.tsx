import { createPortal } from "react-dom";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import { signIn } from "next-auth/react";

type ModalProps = {
  className?: string;
  children: ReactNode;
  setShowModal:
    | Dispatch<SetStateAction<boolean | number>>
    | Dispatch<SetStateAction<boolean>>;
};
const Modal = ({ children, setShowModal, className }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal") as HTMLElement;
    modalRoot.appendChild(elRef.current as HTMLDivElement);
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      modalRoot.removeChild(elRef.current as HTMLDivElement);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  return createPortal(
    <div
      className={
        "fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#000] bg-opacity-50 p-4 " +
        className
      }
      onClick={() => setShowModal(false)}
    >
      {children}
    </div>,
    elRef.current as HTMLDivElement
  );
};

export default Modal;

export function SignInModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal setShowModal={setShowModal}>
      <div onClick={(e) => e.stopPropagation()} className="">
        <Card className="w-72 px-4 py-6 text-center">
          <h2 className=" text-h6 mb-4  font-medium">
            You need to be logged in to perform this action
          </h2>
          <Button
            onClick={() => signIn("github")}
            bgColor="blue"
            className="w-full px-3 py-3 "
          >
            Sign in with Github
          </Button>
          <Button
            onClick={() =>
              signIn("credentials", {
                username: "",
                password: "",
                redirect: true,
                callbackUrl: "/",
              })
            }
            bgColor="purple"
            className="my-4 w-full px-3 py-3 "
          >
            Sign in with a Random Test Account
          </Button>
        </Card>
      </div>
    </Modal>
  );
}
