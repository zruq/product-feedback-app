// import Card from "./shared/Card";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { SuggestionOverview } from "../pages";
import { IconDown, IconUp, SuggestionIcon } from "../svgs/Icons";
import Button, { LinkButton } from "./shared/Button";
import DropdownList from "./shared/DropdownList";

const items = [
  { id: "1", title: "Most Upvotes" },
  { id: "2", title: "Least Upvotes" },
  { id: "3", title: "Most Comments" },
  { id: "4", title: "Least Comments" },
];

function Topbar({ setVisibleSuggestions, suggestions }: TopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [active, setActive] = useState("1");
  return (
    <div className="-mx-6 flex w-screen items-center justify-between bg-[#373F68] py-2 px-6 tablet:-mx-0 tablet:w-auto tablet:rounded-[10px] tablet:py-[14px] ">
      <div className="flex items-center justify-center">
        <div className="hidden items-center justify-center tablet:flex ">
          <SuggestionIcon />
          <h3 className="ml-4 mr-9 text-h3 text-white">
            {suggestions.length} Suggestions
          </h3>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className={
            "relative flex items-center hover:bg-opacity-0 hover:text-opacity-75 tablet:mt-0.5" +
            (showDropdown ? "text-opacity-75" : "")
          }
        >
          <div className="mr-2">
            <span className="font-normal">Sort by : </span>{" "}
            {items.find((item) => item.id === active)?.title}
          </div>
          {showDropdown ? (
            <IconUp className="stroke-white hover:stroke-white" />
          ) : (
            <IconDown className="stroke-white hover:stroke-white" />
          )}

          {showDropdown && (
            <DropdownList
              className="top-[270%] w-[255px]"
              setShowDropDown={setShowDropdown}
              showDropDown={showDropdown}
              active={active}
              setActive={handleDropdownClick}
              items={items}
            />
          )}
        </Button>
      </div>
      <LinkButton
        link="./create-new-feedback"
        className="px-4 py-[10.5px] text-body3 font-bold"
        bgColor="purple"
      >
        + Add Feedback
      </LinkButton>
    </div>
  );

  function handleDropdownClick(i: string) {
    setActive(i);
    const suggestionsCopy = [...suggestions];
    switch (i) {
      case "2":
        setVisibleSuggestions(
          suggestionsCopy.sort((a, b) => a.upvotes - b.upvotes)
        );
        break;
      case "3":
        setVisibleSuggestions(
          suggestionsCopy.sort((a, b) => b._count.comments - a._count.comments)
        );
        break;
      case "4":
        setVisibleSuggestions(
          suggestionsCopy.sort((a, b) => a._count.comments - b._count.comments)
        );
        break;
      default:
        setVisibleSuggestions(
          suggestionsCopy.sort((a, b) => b.upvotes - a.upvotes)
        );
        break;
    }
  }
}

type TopbarProps = {
  setVisibleSuggestions: Dispatch<SetStateAction<SuggestionOverview[]>>;
  suggestions: SuggestionOverview[];
};
export default Topbar;
