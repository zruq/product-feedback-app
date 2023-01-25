import Head from "next/head";
import { useState } from "react";
import RoadmapCard from "../components/RoadmapCard";
import Button, { GoBackButton, LinkButton } from "../components/shared/Button";
import { api } from "../utils/api";

function CreateNewFeedback() {
  const { data, isLoading } = api.router.getRoadmapData.useQuery();
  const [showByStatus, setShowByStatus] = useState<
    "PLANNED" | "IN_PROGRESS" | "LIVE"
  >("IN_PROGRESS");
  if (isLoading) return <div className="">hmmmm</div>;
  const showData = data?.filter((item) => item.status === showByStatus);
  return (
    <>
      <Head>
        <title>Roadmap</title>
        <meta name="description" content="By Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  w-screen  flex-col items-center  justify-center bg-light-grey-lighter  tablet:px-28">
        <div className="flex w-full   items-center justify-between bg-dark-blue p-6">
          <div className="">
            <GoBackButton />
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
        <div className="mb-6 flex w-full items-center justify-evenly border-b border-[#8C92B3] border-opacity-25">
          <button
            onClick={() => setShowByStatus("PLANNED")}
            className={`block w-1/3 pt-5 ${
              showByStatus === "PLANNED" ? "border-b-4" : "text-opacity-40"
            } border-[#F49F85] pb-4 text-body3 font-bold text-[#3A4374] `}
          >
            Planned ({data?.filter((item) => item.status === "PLANNED").length})
          </button>
          <button
            onClick={() => setShowByStatus("IN_PROGRESS")}
            className={`block w-1/3 border-purple  ${
              showByStatus === "IN_PROGRESS" ? "border-b-4" : "text-opacity-40"
            } pt-5 pb-4 text-body3 font-bold text-[#3A4374]`}
          >
            In-Progress (
            {data?.filter((item) => item.status === "IN_PROGRESS").length})
          </button>
          <button
            onClick={() => setShowByStatus("LIVE")}
            className={`${
              showByStatus === "LIVE" ? "border-b-4" : "text-opacity-40"
            } block w-1/3 border-[#62BCFA] pt-5 pb-4 text-body3 font-bold text-[#3A4374]`}
          >
            Live ({data?.filter((item) => item.status === "LIVE").length})
          </button>
        </div>
        <div className="px-6">
          {showData?.map((item) => (
            <RoadmapCard
              key={item.id}
              title={item.title}
              category={item.category.title}
              description={item.description}
              status={item.status as "PLANNED" | "IN_PROGRESS" | "LIVE"}
              numberOfComments={
                item.comments.reduce(
                  (acc, curr) => acc + curr._count.replies,
                  0
                ) + item._count.comments
              }
              upvotes={item._count.Upvotes + item.upvotes}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default CreateNewFeedback;
