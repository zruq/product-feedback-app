import Head from "next/head";
import RoadmapCard from "../components/RoadmapCard";

function CreateNewFeedback() {
  return (
    <>
      <Head>
        <title>Roadmap</title>
        <meta name="description" content="By Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  w-screen  items-center justify-center  bg-light-grey-lighter px-6 py-10 pb-9 tablet:px-28">
        <RoadmapCard
          status={"LIVE"}
          title={"One-click portfolio generation"}
          description={
            "Add ability to create professional looking portfolio from profile."
          }
          category={"Feature"}
          numberOfComments={1}
          upvotes={62}
        />
      </main>
    </>
  );
}

export default CreateNewFeedback;
