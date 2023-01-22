import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import SuggestionCard from "../../components/SuggestionCard";
import { api } from "../../utils/api";

function FeedbackPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const getData = api.router.getFeedback.useQuery(id ? +id : 1);
  const { data, isSuccess } = getData;
  console.log(data);

  if (isSuccess)
    return (
      <>
        <Head>
          <title>Crete New Feedback</title>
          <meta name="description" content="By Mehdi Zibout" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen w-screen flex-col items-center justify-start bg-light-grey-lighter px-10">
          <div className="  desktop:max-w-[730px]">
            <Navbar />
            <SuggestionCard
              category={data?.category}
              description={data?.description}
              title={data?.title}
              upvotes={data?.upvotes}
              _count={data?._count}
              upvotedPosts={[]}
            />
            <div className="">{JSON.stringify(getData.data)}</div>
          </div>
        </main>
      </>
    );
  else return <div className="">hmm</div>;
}

export default FeedbackPage;
