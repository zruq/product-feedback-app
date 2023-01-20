// import Card from "./shared/Card";

import { useState } from "react";
import { IconDown, IconUp, SuggestionIcon } from "../svgs/Icons";
import Button from "./shared/Button";
import DropdownList from "./shared/DropdownList";

const items = [
  { id: 1, content: "Most Upvotes" },
  { id: 2, content: "Least Upvotes" },
  { id: 3, content: "Most Comments" },
  { id: 4, content: "Least Comments" },
];

function Topbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [active, setActive] = useState(1);
  return (
    <div className="flex items-center justify-between bg-[#373F68] py-2 px-6 tablet:rounded-[10px] tablet:py-[14px] ">
      <div className="flex items-center justify-center">
        <div className="hidden items-center justify-center tablet:flex ">
          <SuggestionIcon />
          <h3 className="ml-4 mr-9 text-h3 text-white">6 Suggestions</h3>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className={
            "relative flex items-center bg-opacity-0 hover:bg-opacity-0  hover:text-opacity-75 tablet:mt-0.5 " +
            (showDropdown ? "text-opacity-75" : "")
          }
          bgColor="dark-blue"
        >
          <div className="mr-2">
            <span className="font-normal">Sort by : </span>{" "}
            {items.find((item) => item.id === active)?.content}
          </div>
          {showDropdown ? (
            <IconUp className="stroke-white hover:stroke-white" />
          ) : (
            <IconDown className="stroke-white hover:stroke-white" />
          )}

          {showDropdown && (
            <DropdownList
              className="top-[270%]"
              setShowDropDown={setShowDropdown}
              showDropDown={showDropdown}
              active={active}
              setActive={setActive}
              items={items}
            />
          )}
        </Button>
      </div>
      <Button
        className="px-4 py-[10.5px] text-body3 font-bold"
        bgColor="purple"
      >
        + Add Feedback
      </Button>
    </div>
  );
}

export default Topbar;
