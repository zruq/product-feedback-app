import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Checkmark, IconDown, IconUp } from "../../svgs/Icons";
import Button from "./Button";
import DropdownList from "./DropdownList";

function Dropdown({ title, items, active, setActive }: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", function () {
      if (showDropdown) {
        setShowDropdown(false);
      }
    });
  }, [showDropdown]);
  return (
    <div onClick={(e) => e.stopPropagation()} className="relative w-fit">
      <Button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className={
          "flex items-center py-6 px-4 hover:bg-dark-blue hover:bg-opacity-100 hover:text-opacity-75 " +
          (showDropdown ? "text-opacity-75" : "")
        }
        bgColor="dark-blue"
      >
        <div className="mr-2">
          <span className="">{title} : </span>{" "}
          {items.find((item) => item.id === active)?.content}
        </div>
        {showDropdown ? (
          <IconUp className="stroke-white hover:stroke-white" />
        ) : (
          <IconDown className="stroke-white hover:stroke-white" />
        )}
      </Button>
      {showDropdown && (
        <DropdownList active={active} setActive={setActive} items={items} />
      )}
    </div>
  );
}

type DropdownProps = {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  title: string;
  items: { id: number; content: string }[];
};
export default Dropdown;
