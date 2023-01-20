import { api } from "../utils/api";
import Card from "./shared/Card";
import Tag from "./Tag";
import { useState } from "react";
import { Close, HamMenu } from "../svgs/Icons";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { data: categories } = api.router.getCategoryies.useQuery();
  return (
    <div
      className="justify-between tablet:flex desktop:block desktop:w-[15.93rem]
   "
    >
      <Card className="flex w-full flex-1 items-center justify-between  rounded-none bg-header-mobile bg-cover px-6 py-4 text-left tablet:rounded-[10px] tablet:bg-header-tablet tablet:p-6 desktop:h-[11.12rem]  desktop:bg-header-desktop">
        <div className=" flex h-full flex-col items-start  justify-end text-white">
          <h3 className="text-h2">Frontend Mentor</h3>
          <h4 className="text-body2 font-medium text-white text-opacity-75">
            Feedback Board
          </h4>
        </div>
        <div className="tablet:hidden">
          {showSidebar ? (
            <Close
              onClick={() => setShowSidebar(!showSidebar)}
              className="cursor-pointer"
            />
          ) : (
            <HamMenu
              onClick={() => setShowSidebar(!showSidebar)}
              className="cursor-pointer"
            />
          )}
        </div>
      </Card>
      <CatsCard className="hidden" categories={categories} />
      <RoadmapCard className="hidden" />
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="absolute z-50 flex h-[calc(100vh-83px)] w-full justify-end overflow-hidden bg-[#000] bg-opacity-50  tablet:hidden"
        >
          <div
            className="w-3/4 bg-light-grey-lighter p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <CatsCard className="mb-6" categories={categories} />
            <RoadmapCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

function CatsCard({
  categories,
  className,
}: {
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
            className="mb-3 mr-2 capitalize"
            content="all"
            key={0}
            isActive
          />
          {categories?.map((category) => (
            <Tag
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
