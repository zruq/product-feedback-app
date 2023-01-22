import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Checkmark } from "../../svgs/Icons";

function DropdownList({
  items,
  setActive,
  active,
  setShowDropDown,
  showDropDown,
  className,
}: DropdownListProps) {
  useEffect(() => {
    window.addEventListener("click", function () {
      if (showDropDown) {
        setShowDropDown(false);
      }
    });
  }, [showDropDown, setShowDropDown]);
  return (
    <ul
      className={`absolute   rounded-[10px] bg-white text-body1  text-greyish-blue ${
        className || ""
      }`}
      style={{
        boxShadow: "0px 10px 40px -7px rgba(55, 63, 104, 0.350492)",
      }}
    >
      {items.map((item) => (
        <li
          onClick={() => {
            setActive(item.id);
          }}
          key={item.id}
          className={`flex cursor-pointer items-center justify-between border-b border-dark-blue border-opacity-[0.15]  py-3 px-6  last-of-type:border-b-0 hover:text-purple `}
        >
          <div className="capitalize">{item.title}</div>
          {item.id === active && <Checkmark />}
        </li>
      ))}
    </ul>
  );
}

type DropdownListProps = {
  className?: string;
  active: string;
  setActive: (i: string) => void;
  setShowDropDown: Dispatch<SetStateAction<boolean>>;
  showDropDown: boolean;
  items: { id: string; title: string }[];
};
export default DropdownList;
