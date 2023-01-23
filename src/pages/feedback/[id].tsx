/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Card from "../../components/shared/Card";
import SuggestionCard from "../../components/SuggestionCard";
import { api } from "../../utils/api";
import Comment from "../../components/Comment";
function FeedbackPage() {
  const router = useRouter();
  const { id } = router.query;
  const getData = api.router.getFeedback.useQuery(id ? +id : 1);
  const { data, isSuccess } = getData;
  console.log(data);
  if (data) {
    const { category } = data;
    const comments = data.comments;
    const lol = comments[0]?.replies[0]?.replyingTo;
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
              id={data.id}
              category={data.category}
              description={data?.description}
              title={data?.title}
              upvotes={data?.upvotes}
              _count={data?._count}
              upvotedPosts={[]}
            />
            <Card className="px-8 py-6">
              <>
                <div className=" text-h3 capitalize text-[#3A4374] ">
                  {data._count.comments} comments
                </div>
                {data.comments.map((comment) => (
                  <div
                    className="border-b border-[#8C92B3] border-opacity-25 last-of-type:border-b-0"
                    key={comment.id}
                  >
                    <Comment
                      content={comment.content as string}
                      user={comment.user}
                    />{" "}
                    {comment.replies.length > 0 && (
                      <div className="relative w-fit items-center   justify-between  pl-11">
                        <div className="absolute top-[-25%] left-4 h-[90%] w-px  bg-[#8C92B3]  bg-opacity-10 "></div>
                        <div className="">
                          {comment.replies.map((reply) => (
                            <Comment
                              key={reply.id}
                              content={reply.content}
                              user={reply.author}
                              replyingTo={
                                reply.replyingTo
                                  ? reply.replyingTo
                                  : {
                                      id,
                                      author: {
                                        username: comment.user.username,
                                      },
                                    }
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            </Card>
            {/* <Card className="px-8 py-6">
              <>
                <div className=" text-h3 capitalize text-[#3A4374] ">
                  {data?.comments.length} comments
                </div>
                {data.comments.map((comment) => {
                  <div
                    className="border-b border-[#8C92B3] border-opacity-25"
                    key={comment.commentId}
                  >
                    <Comment
                      content={comment.content as string}
                      user={comment.user}
                    />
                  </div>;
                })}

              </>
            </Card> */}
          </div>
        </main>
      </>
    );
  } else return <div className="">hmm</div>;
}

export default FeedbackPage;
