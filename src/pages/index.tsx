import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button, { GoBackButton } from "../components/shared/Button";
import Tag from "../components/Tag";
import Upvotes from "../components/shared/Upvote";
import Dropdown from "../components/shared/Dropdown";
import { useState } from "react";

// import { api } from "../utils/api";

const Home: NextPage = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Head>
        <title>Product Feedback App</title>
        <meta name="description" content="Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-light-grey-lighter">
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
      </main>
    </>
  );
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
