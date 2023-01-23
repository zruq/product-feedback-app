import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Card from "../../components/shared/Card";
import SuggestionCard from "../../components/SuggestionCard";
import { api } from "../../utils/api";
import Comment from "../../components/Comment";
import Button from "../../components/shared/Button";
import { useState } from "react";
function FeedbackPage() {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const { id } = router.query;
  const getData = api.router.getFeedback.useQuery(id ? +id : 1);
  const postComment = api.router.addComment.useMutation();
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
          <div className="w-full desktop:max-w-[730px]  ">
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
                  {data._count.comments +
                    data.comments.reduce(
                      (acc, curr) => acc + curr.replies.length,
                      0
                    )}{" "}
                  comments
                </div>
                {data.comments.map((comment) => (
                  <div
                    className="relative  border-b border-[#8C92B3] border-opacity-25  last-of-type:border-b-0"
                    key={comment.id}
                  >
                    <Comment
                      id={{ commentId: comment.id, replyId: undefined }}
                      content={comment.content as string}
                      user={comment.user}
                    />
                    {comment.replies.length > 0 && (
                      <div className=" w-fit items-center   justify-between  pl-11">
                        <div className="absolute inset-0   pb-[12rem] ">
                          <div className="relative top-24 left-4  h-full  w-px  bg-[#8C92B3]  bg-opacity-10"></div>
                        </div>
                        <div className="relative z-10">
                          {comment.replies.map((reply) => (
                            <>
                              <Comment
                                id={{
                                  commentId: comment.id,
                                  replyId: reply.id,
                                }}
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
                            </>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            </Card>
            <Card className="my-6 px-8 py-6">
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    postComment.mutate({
                      productRequestId: data.id,
                      content: newComment,
                    });
                  }}
                >
                  <label htmlFor="add-comment">
                    <div className=" mb-6 text-h3 capitalize text-[#3A4374]">
                      Add Comment
                    </div>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      name="add-comment"
                      id="add-comment"
                      placeholder="Type your comment here"
                      className="input mb-4 h-20 w-full resize-none"
                    />
                  </label>
                  <div className="flex justify-between">
                    <div className="text-body2 text-[#647196]">
                      {250 - newComment.length} Characters left
                    </div>
                    <Button
                      disabled={250 - newComment.length < 0}
                      bgColor="purple"
                      className="px-6 py-3 disabled:cursor-not-allowed"
                    >
                      Post Comment
                    </Button>
                  </div>
                </form>
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
