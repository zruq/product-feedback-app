import { api } from "../utils/api";
import Card from "./shared/Card";
import Tag from "./Tag";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Close, HamMenu } from "../svgs/Icons";
import type { SuggestionOverview } from "../pages";

function Sidebar({ setVisibleSuggestions, suggestions }: SidebarProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [active, setActive] = useState("all");
  const { data: categories } = api.router.getCategoryies.useQuery();
  return (
    <div
      className="justify-between  tablet:mb-10 tablet:flex desktop:mb-0 desktop:block desktop:w-[15.93rem] 
   "
    >
      <div className="-mx-6 flex w-screen flex-1 items-center justify-between rounded-none bg-header-mobile  bg-cover px-6 py-4 text-left tablet:-mx-0 tablet:w-full tablet:rounded-[10px] tablet:bg-header-tablet tablet:p-6 desktop:h-[11.12rem]  desktop:bg-header-desktop">
        <div className=" flex h-full flex-col items-start  justify-end text-white">
          <h3 className="text-h2">Frontend Mentor</h3>
          <h4 className="text-body2 font-medium text-white text-opacity-75">
            Feedback Board
          </h4>
        </div>
        <div className="tablet:hidden">
          {showSidebar ? (
            <Close
              onClick={() => {
                setShowSidebar(false);
                document.documentElement.classList.remove("overflow-hidden");
              }}
              className="cursor-pointer"
            />
          ) : (
            <HamMenu
              onClick={() => {
                setShowSidebar(true);
                document.documentElement.classList.add("overflow-hidden");
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <CatsCard
        active={active}
        setActive={setActive}
        suggestions={suggestions}
        setVisibleSuggestions={setVisibleSuggestions}
        className="hidden"
        categories={categories}
      />
      <RoadmapCard className="hidden" />
      {showSidebar && (
        <div
          onClick={() => {
            setShowSidebar(false);
            document.documentElement.classList.remove("overflow-hidden");
          }}
          className="absolute z-50 -ml-6 flex h-full w-full justify-end  bg-[#000] bg-opacity-50  tablet:hidden"
        >
          <div
            className="w-3/4 bg-light-grey-lighter p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <CatsCard
              active={active}
              setActive={setActive}
              suggestions={suggestions}
              setVisibleSuggestions={setVisibleSuggestions}
              className="mb-6"
              categories={categories}
            />
            <RoadmapCard />
          </div>
        </div>
      )}
    </div>
  );
}

type SidebarProps = {
  setVisibleSuggestions: Dispatch<SetStateAction<SuggestionOverview[]>>;
  suggestions: SuggestionOverview[];
};

export default Sidebar;

function CatsCard({
  active,
  setActive,
  categories,
  className,
  setVisibleSuggestions,
  suggestions,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setVisibleSuggestions: Dispatch<SetStateAction<SuggestionOverview[]>>;
  suggestions: SuggestionOverview[];
  className?: string;
  categories:
    | {
        id: string;
        title: string;
      }[]
    | undefined;
}) {
  return (
    <Card
      className={` flex-1 p-6 px-6 py-4 tablet:mx-[10px] tablet:block desktop:my-6 desktop:mx-0 ${
        className || ""
      }`}
    >
      {categories?.length ?? 0 > 0 ? (
        <>
          <Tag
            onClick={() => {
              setActive("all");
              setVisibleSuggestions(suggestions);
            }}
            className="mb-3 mr-2 capitalize"
            content="all"
            key={0}
            isActive={active === "all"}
          />
          {categories?.map((category) => (
            <Tag
              isActive={active === category.id}
              onClick={() => {
                setActive(category.id);
                setVisibleSuggestions(
                  suggestions.filter(
                    (suggestion) => suggestion.category.id === category.id
                  )
                );
              }}
              className="mb-3 mr-2 capitalize"
              content={category.title}
              key={category.id}
            />
          ))}
        </>
      ) : (
        "no cats yet"
      )}
    </Card>
  );
}
function RoadmapCard({ className }: { className?: string }) {
  return (
    <Card className={` flex-1 p-6 tablet:block ${className || ""}`}>
      <div className="flex justify-between">
        <h6 className="text-h3 text-dark-blue">Roadmap</h6>
        <a className="cursor-pointer text-body3 font-semibold text-blue underline transition-colors duration-300 hover:text-[#8397F8]">
          View
        </a>
      </div>
      <ul className="mt-6 text-greyish-blue">
        <li className="flex justify-between">
          <div className="text-body1 ">
            <span className="mr-4 inline-block h-2 w-2 rounded-full bg-orange"></span>
            Planned
          </div>
          <div className="text-body1 font-bold">2</div>
        </li>
        <li className="my-2 flex justify-between">
          <div className="text-body1 ">
            <span className="mr-4 inline-block h-2 w-2 rounded-full bg-purple"></span>
            In-Progress
          </div>
          <div className="text-body1 font-bold">3</div>
        </li>
        <li className="flex justify-between">
          <div className="text-body1 ">
            <span className="mr-4 inline-block h-2 w-2 rounded-full bg-blue"></span>
            Live
          </div>
          <div className="text-body1 font-bold">1</div>
        </li>
      </ul>
    </Card>
  );
}
