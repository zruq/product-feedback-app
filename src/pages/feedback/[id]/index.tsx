import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/shared/Card";
import SuggestionCard from "../../../components/SuggestionCard";
import { api } from "../../../utils/api";
import Comment from "../../../components/Comment";
import Button, { LinkButton } from "../../../components/shared/Button";
import { useState } from "react";
function FeedbackPage() {
  const router = useRouter();
  const utils = api.useContext();
  const [newComment, setNewComment] = useState("");
  const { id } = router.query;
  const getData = api.router.getFeedback.useQuery(id ? +id : 1);
  const postComment = api.router.addComment.useMutation({
    onSettled: () => {
      utils.router.getFeedback.refetch(id ? +id : 1);
      setNewComment("");
    },
  });
  const { data, isSuccess } = getData;
  if (data) {
    const comments = data.comments;
    return (
      <>
        <Head>
          <title>Crete New Feedback</title>
          <meta name="description" content="By Mehdi Zibout" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen w-screen flex-col items-center justify-start bg-light-grey-lighter px-6  tablet:px-10">
          <div className="w-full desktop:max-w-[730px]  ">
            <Navbar>
              <LinkButton
                className="px-6 py-3"
                bgColor="blue"
                link={`/feedback/${id}/edit`}
              >
                Edit Feedback
              </LinkButton>
            </Navbar>
            <SuggestionCard
              id={data.id}
              category={data.category}
              description={data?.description}
              title={data?.title}
              upvotes={data?.upvotes}
              _count={data?._count}
              comments={comments.map((comment) => {
                return { _count: { replies: comment.replies.length } };
              })}
            />
            {data.comments.length > 0 ? (
              <Card className="px-6 py-6 tablet:px-8">
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
                        id={{
                          commentId: comment.id,
                          replyId: undefined,
                          postId: id ? +id : 1,
                        }}
                        content={comment.content as string}
                        user={comment.user}
                      />
                      {comment.replies.length > 0 && (
                        <div className="w-full items-center   justify-between border-l  border-[#8C92B3] border-opacity-10 pl-6 tablet:border-none tablet:pl-11">
                          <div className="absolute inset-0 w-1    pb-[7rem]">
                            <div className="relative top-16 left-4 hidden h-full  w-px  bg-[#8C92B3]  bg-opacity-10  tablet:block"></div>
                          </div>
                          <div className="relative z-10 ">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="relative  last:-mx-[25px] last:border-l last:border-white last:px-[26px] last:tablet:-mx-7   last:tablet:border-l-2 last:tablet:px-7 "
                              >
                                <Comment
                                  id={{
                                    commentId: comment.id,
                                    replyId: reply.id,
                                    postId: id ? +id : 1,
                                  }}
                                  content={reply.content}
                                  user={reply.author}
                                  replyingTo={
                                    reply.replyingTo
                                      ? reply.replyingTo
                                      : {
                                          id: id ? +id : 1,
                                          author: {
                                            username: comment.user.username,
                                          },
                                        }
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              </Card>
            ) : null}
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
                  <div className="flex items-center justify-between tablet:items-start">
                    <div className="text-body2 text-[#647196]">
                      {250 - newComment.length} Characters left
                    </div>
                    <Button
                      disabled={
                        250 - newComment.length < 0 || postComment.isLoading
                      }
                      bgColor="purple"
                      className="px-6 py-3 disabled:cursor-not-allowed disabled:bg-dark-blue"
                    >
                      Post Comment
                    </Button>
                  </div>
                </form>
              </>
            </Card>
          </div>
        </main>
      </>
    );
  } else return <div className="">hmm</div>;
}

export default FeedbackPage;
