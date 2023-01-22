import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";
import SuggestionCard from "../components/SuggestionCard";
import Topbar from "../components/Topbar";
import NoFeedback from "../components/NoFeedback";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const { data: latestSuggestions, isSuccess } =
    api.router.getLatestSuggestions.useQuery();
  const [visibleSuggestions, setVisibleSuggestions] = useState<
    SuggestionOverview[]
  >(latestSuggestions || []);
  const [upvotedPosts, setUpvotedPosts] = useState<number[]>([]);
  useEffect(() => {
    if (status === "authenticated") {
      setUpvotedPosts(data.user?.upvotes || []);
    }
  }, [status]);
  useEffect(() => {
    if (isSuccess) setVisibleSuggestions(latestSuggestions);
  }, [isSuccess]);
  return (
    <>
      <Head>
        <title>Product Feedback App</title>
        <meta name="description" content="Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-light-grey-lighter px-6 pb-14 tablet:px-10 tablet:py-14 desktop:flex desktop:items-start desktop:justify-center desktop:py-24">
        <Sidebar
          suggestions={latestSuggestions || []}
          setVisibleSuggestions={setVisibleSuggestions}
        />
        {/* CONTENT */}
        <div className="desktop:ml-8 desktop:min-w-[825px]">
          <Topbar
            suggestions={visibleSuggestions || []}
            setVisibleSuggestions={setVisibleSuggestions}
          />
          {visibleSuggestions && visibleSuggestions.length > 0 ? (
            visibleSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.title}
                {...suggestion}
                upvotedPosts={upvotedPosts}
                setUpvotedPosts={setUpvotedPosts}
              />
            ))
          ) : (
            <NoFeedback />
          )}
        </div>
        {/* NAVBAR */}
        <div className=""></div>
        {/* Cards */}
      </main>
      {/* <main className="flex min-h-screen flex-col bg-light-grey-lighter">
        Hello, World!
        <div className="">
          <Dropdown
            active={active}
            setActive={setActive}
            title="Sort by"
            items={[
              { id: 1, content: "Most Upvotes" },
              { id: 2, content: "Least Upvotes" },
              { id: 3, content: "Most Comments" },
              { id: 4, content: "Least Comments" },
            ]}
          />
        </div>
        <div className="">
          <Button bgColor="purple">Button 1</Button>
          <Button bgColor="blue">Button 1</Button>
          <Button bgColor="dark-blue">Button 1</Button>
          <Button bgColor="red">Button 1</Button>
          <GoBackButton />
          <GoBackButton isGhost />
        </div>
        <div className="">
          <Tag content="UX" />
          <Tag content="Feature" isActive />
          <Upvotes upvotes={65} />
          <Upvotes upvotes={52} upvoted />
        </div>
      </main> */}
    </>
  );
};

export type SuggestionOverview = {
  category: {
    title: string;
    id: string;
  };
  title: string;
  description: string;
  upvotes: number;
  _count: {
    Upvotes: number;
    comments: number;
  };
  id: number;
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-2xl text-center text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
