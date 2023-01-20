import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button, { GoBackButton } from "../components/shared/Button";
import Tag from "../components/Tag";
import Upvotes from "../components/shared/Upvote";
import Dropdown from "../components/shared/Dropdown";
import { useState } from "react";
import Card from "../components/shared/Card";

import { api } from "../utils/api";
import TagCard from "../components/shared/TagCard";

const Home: NextPage = () => {
  const { data: categories } = api.router.getCategoryies.useQuery();
  console.log(categories);
  const [active, setActive] = useState(1);
  return (
    <>
      <Head>
        <title>Product Feedback App</title>
        <meta name="description" content="Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-light-grey-lighter desktop:flex desktop:items-start desktop:justify-center">
        {/* SIDEBAR */}
        <div className="justify-between tablet:flex desktop:block">
          <Card className="w-full flex-1 rounded-none bg-header-mobile bg-cover px-6 py-4 text-left tablet:rounded-[10px] tablet:bg-header-tablet tablet:p-6 desktop:w-[255px] desktop:bg-header-desktop">
            <div className="text-white desktop:pt-9">
              <h3 className="text-h2">Frontend Mentor</h3>
              <h4 className="text-body2 font-medium text-white text-opacity-75">
                Feedback Board
              </h4>
            </div>
          </Card>
          <Card className="w-full flex-1 px-6  py-4 text-left tablet:mx-[10px] tablet:p-6 desktop:my-6 desktop:mx-0 desktop:w-[255px]">
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
          <Card className="w-full flex-1 rounded-none bg-header-mobile bg-cover px-6 py-4 text-left tablet:rounded-[10px] tablet:bg-header-tablet tablet:p-6 desktop:w-[255px] desktop:bg-header-desktop">
            <div className="text-white desktop:pt-9">
              <h3 className="text-h2">Frontend Mentor</h3>
              <h4 className="text-body2 font-medium text-white text-opacity-75">
                Feedback Board
              </h4>
            </div>
          </Card>
        </div>
        {/* CONTENT */}
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
