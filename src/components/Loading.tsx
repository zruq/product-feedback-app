import { useState } from "react";
import Navbar from "./Navbar";
import { GoBackButton, LinkButton } from "./shared/Button";
import Card from "./shared/Card";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export const LoadingHome = () => {
  return (
    <>
      <main className="min-h-screen bg-light-grey-lighter px-6 pb-14 tablet:px-10 tablet:py-14 desktop:flex desktop:items-start desktop:justify-center desktop:py-24">
        <Sidebar suggestions={[]} setVisibleSuggestions={() => {}} />
        <div className="desktop:ml-8 desktop:min-w-[825px]">
          <Topbar suggestions={[]} setVisibleSuggestions={() => {}} />
          <Card className="my-4 h-40 w-full  bg-white p-6">
            <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          </Card>
          <Card className="my-4 h-40 w-full  bg-white p-6">
            <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          </Card>
          <Card className="my-4 h-40 w-full  bg-white p-6">
            <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          </Card>
          <Card className="my-4 h-40 w-full  bg-white p-6">
            <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          </Card>
          <Card className="my-4 h-40 w-full  bg-white p-6">
            <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          </Card>
        </div>
      </main>
    </>
  );
};

export const LoadingFeedback = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start bg-light-grey-lighter px-6  tablet:px-10">
      <div className="w-full desktop:max-w-[730px]  ">
        <Navbar />
        <Card className="my-4 h-40 w-full  bg-white p-6">
          <div className="h-7 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          <div className="my-2 h-7 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
          <div className="my-2 h-7 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
        </Card>
        <Card className="my-4 h-96 w-full  bg-white p-6">
          <div className="flex items-start justify-between px-10">
            <div className="mr-6 h-10 w-10 animate-pulse rounded-full bg-greyish-blue bg-opacity-25 "></div>
            <div className="w-[90%]">
              <div className="h-4 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            </div>
          </div>
          <div className="my-4 flex items-start justify-between px-10">
            <div className="mr-6 h-10 w-10 animate-pulse rounded-full bg-greyish-blue bg-opacity-25 "></div>
            <div className="w-[90%]">
              <div className="h-4 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            </div>
          </div>
          <div className="my-4 flex items-start justify-between px-10">
            <div className="mr-6 h-10 w-10 animate-pulse rounded-full bg-greyish-blue bg-opacity-25 "></div>
            <div className="w-[90%]">
              <div className="h-4 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            </div>
          </div>
          <div className="my-4 flex items-start justify-between px-10">
            <div className="mr-6 h-10 w-10 animate-pulse rounded-full bg-greyish-blue bg-opacity-25 "></div>
            <div className="w-[90%]">
              <div className="h-4 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              <div className="my-2 h-4 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export const LoadingRoadmap = () => {
  const [showByStatus, setShowByStatus] = useState<
    "PLANNED" | "IN_PROGRESS" | "LIVE"
  >("IN_PROGRESS");
  return (
    <main className="flex  w-screen  flex-col items-center  justify-center bg-light-grey-lighter   tablet:px-10  desktop:px-36">
      <div className="w-full desktop:max-w-[1110px]">
        <div className="flex w-full   items-center justify-between bg-dark-blue p-6 tablet:mt-14 tablet:rounded-[10px] desktop:mt-16 ">
          <div className="">
            <GoBackButton className="hover:bg-opacity-0" />
            <h1 className="text-h3 text-white">Roadmap</h1>
          </div>
          <LinkButton
            link="/create-new-feedback"
            className="px-4 py-[10.5px] text-body3 font-bold"
            bgColor="purple"
          >
            + Add Feedback
          </LinkButton>
        </div>
        <div className="mb-6 flex w-full items-center justify-evenly border-b border-[#8C92B3] border-opacity-25 tablet:hidden">
          <button
            onClick={() => setShowByStatus("PLANNED")}
            className={`block w-1/3 pt-5 ${
              showByStatus === "PLANNED" ? "border-b-4" : "text-opacity-40"
            } border-[#F49F85] pb-4 text-body3 font-bold text-[#3A4374] transition duration-300 hover:text-opacity-100`}
          >
            Planned
          </button>
          <button
            onClick={() => setShowByStatus("IN_PROGRESS")}
            className={`block w-1/3 border-purple  ${
              showByStatus === "IN_PROGRESS" ? "border-b-4" : "text-opacity-40"
            } pt-5 pb-4 text-body3 font-bold text-[#3A4374] transition duration-300 hover:text-opacity-100`}
          >
            In-Progress
          </button>
          <button
            onClick={() => setShowByStatus("LIVE")}
            className={`${
              showByStatus === "LIVE" ? "border-b-4" : "text-opacity-40"
            } block w-1/3 border-[#62BCFA] pt-5 pb-4 text-body3 font-bold text-[#3A4374] transition duration-300 hover:text-opacity-100`}
          >
            Live
          </button>
        </div>

        <div className="w-full px-6 tablet:mt-8 tablet:grid  tablet:grid-cols-3 tablet:gap-x-[10px]  tablet:px-0 desktop:gap-x-[30px]">
          <div className="">
            <h2 className="hidden text-h4 text-[#3A4374] tablet:block">
              Planned
            </h2>
            <p className="mt-1 mb-6 hidden text-h4 font-normal text-[#647196] tablet:block">
              Ideas prioritized for research
            </p>
            <div
              className={`${
                showByStatus === "PLANNED" ? "block" : "hidden"
              } tablet:block`}
            >
              {/*  */}
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-orange bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-orange bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="hidden text-h4 text-[#3A4374] tablet:block">
              In-Progress
            </h2>
            <p className="mt-1 mb-6 hidden text-h4 font-normal text-[#647196] tablet:block">
              Currently being developed
            </p>
            <div
              className={`${
                showByStatus === "IN_PROGRESS" ? "block" : "hidden"
              } tablet:block`}
            >
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-[#AD1FEA] bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-[#AD1FEA] bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="hidden text-h4 text-[#3A4374] tablet:block">Live</h2>
            <p className="mt-1 mb-6 hidden text-h4 font-normal text-[#647196] tablet:block">
              Released features
            </p>
            <div
              className={`${
                showByStatus === "LIVE" ? "block" : "hidden"
              } tablet:block`}
            >
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-[#62BCFA] bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
              <div
                className={`mb-4  rounded-b-[10px] rounded-t-[5px]  border-t-[6px] border-[#62BCFA] bg-white p-6 tablet:min-h-[251px] tablet:p-5 tablet:py-6 desktop:mb-6 desktop:min-h-[272px] desktop:px-8`}
              >
                <div className="h-5 w-full animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-1/3 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-2/5 animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[90%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[70%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[100%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
                <div className="my-2 h-5 w-[20%] animate-pulse rounded-md bg-greyish-blue bg-opacity-25"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
