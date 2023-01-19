import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Checkmark, IconDown, IconUp } from "../../svgs/Icons";
import Button from "./Button";

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
        <ul
          className="absolute top-[120%] w-[255px] rounded-[10px] bg-white text-body1  text-greyish-blue"
          style={{
            boxShadow: "0px 10px 40px -7px rgba(55, 63, 104, 0.350492)",
          }}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between border-b border-dark-blue border-opacity-[0.15] py-3 px-6  last-of-type:border-b-0 hover:text-purple `}
            >
              <button className="block" onClick={() => setActive(item.id)}>
                {item.content}
              </button>
              {item.id === active && <Checkmark />}
            </li>
          ))}
        </ul>
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
