import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";
import SuggestionCard from "../components/SuggestionCard";
import Topbar from "../components/Topbar";
import NoFeedback from "../components/NoFeedback";
import { LoadingHome } from "../components/Loading";

const Home: NextPage = () => {
  const {
    data: latestSuggestions,
    isSuccess,
    isLoading,
  } = api.router.getLatestSuggestions.useQuery();
  const [visibleSuggestions, setVisibleSuggestions] = useState<
    SuggestionOverview[]
  >(latestSuggestions || []);

  useEffect(() => {
    if (isSuccess)
      setVisibleSuggestions(
        latestSuggestions.sort(
          (a, b) => b.upvotes + b._count.Upvotes - a.upvotes - a._count.Upvotes
        )
      );
  }, [isSuccess]);
  if (isLoading) return <LoadingHome />;

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
              <SuggestionCard key={suggestion.id} {...suggestion} />
            ))
          ) : (
            <NoFeedback />
          )}
        </div>
      </main>
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
  comments: {
    _count: {
      replies: number;
    };
  }[];
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
