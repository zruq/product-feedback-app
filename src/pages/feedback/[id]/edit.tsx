import Head from "next/head";
import Card from "../../../components/shared/Card";
import {
  EditFeedback,
  IconDown,
  IconUp,
  NewFeedback,
} from "../../../svgs/Icons";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../../../utils/api";
import { useState } from "react";
import DropdownList from "../../../components/shared/DropdownList";
import Button, { LinkButton } from "../../../components/shared/Button";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type FeedbackSchema = {
  title: string;
  description: string;
};

const status = [
  { id: "SUGGESTION", title: "Suggestion" },
  { id: "PLANNED", title: "Planned" },
  { id: "IN_PROGRESS", title: "In-Progress" },
  { id: "LIVE", title: "Live" },
];

function CreateNewFeedback() {
  const { data: session } = useSession();
  const router = useRouter();
  const utils = api.useContext();
  const { data: categories } = api.router.getCategoryies.useQuery();
  const { id } = router.query;
  const { data: feedback } = api.router.getFeedback.useQuery(id ? +id : 1);
  const createFeedback = api.router.createFeedback.useMutation({
    onSuccess: async (data) => {
      await router.push(`/feedback/${data.id}`);
    },
  });
  const deleteFeedback = api.router.deleteFeedback.useMutation({
    onSuccess: async () => {
      await utils.router.getLatestSuggestions.refetch();
      await router.push("/");
    },
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    feedback?.category.id ?? ""
  );
  const [activeStatus, setActiveStatus] = useState<
    "SUGGESTION" | "IN_PROGRESS" | "LIVE" | "PLANNED" | undefined
  >(feedback?.status ?? undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackSchema>({
    defaultValues: {
      title: feedback?.title,
      description: feedback?.description,
    },
  });
  const onSubmit: SubmitHandler<FeedbackSchema> = (data) =>
    createFeedback.mutate({
      ...data,
      categoryId: activeCategory,
      status: activeStatus,
      id: feedback?.id,
    });

  if (!session?.user?.isAdmin || !feedback) {
    return <div className="">no permissions</div>;
  }

  return (
    <>
      <Head>
        <title>Edit feedback - {feedback?.title}</title>
        <meta name="description" content="By Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  w-screen  items-center justify-center  bg-light-grey-lighter px-6 pb-9 tablet:px-28 ">
        <div className="  desktop:w-[33.75rem]">
          <Navbar />
          <Card className="relative mt-14 w-full   px-10 py-12 text-dark-blue tablet:mt-16">
            <h1 className="mb-10 text-h1">Editing ‘{feedback?.title}’</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="">
                <h4 className="text-h4">Feedback Title</h4>
                <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                  Add a short, descriptive headline
                </p>
                <input
                  {...register("title", {
                    required: true,
                    minLength: 5,
                    maxLength: 255,
                  })}
                  type="text"
                  className={
                    "input w-full " + (errors.title ? "border-red" : "")
                  }
                />
                <div
                  className={
                    "mt-1 text-h4 font-normal text-red " +
                    (errors.title ? "" : "invisible")
                  }
                >
                  Can’t be empty
                </div>
              </label>
              <label
                className="mb-6 mt-0 block  "
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className=" text-h4">Category</h4>
                <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                  Choose a category for your feedback
                </p>
                <div className="input relative flex  w-full items-center justify-between">
                  <button
                    onClick={() => {
                      setShowUpdateStatus(false);
                      setShowCategoryDropdown(!showCategoryDropdown);
                    }}
                    type="button"
                    className="w-full   text-left capitalize"
                  >
                    {categories?.find((cat) => cat.id === activeCategory)
                      ?.title ??
                      feedback?.category.id ??
                      ""}
                  </button>

                  {!showCategoryDropdown ? (
                    <IconDown className="stroke-blue" />
                  ) : (
                    <IconUp className="stroke-blue" />
                  )}
                  {showCategoryDropdown && (
                    <DropdownList
                      className="top-[110%] z-10 -ml-6 w-full  "
                      setShowDropDown={setShowCategoryDropdown}
                      showDropDown={showCategoryDropdown}
                      active={activeCategory}
                      setActive={(x) => setActiveCategory(x)}
                      items={categories || []}
                    />
                  )}
                </div>
              </label>
              <label
                className="mb-6 mt-0 block  "
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className=" text-h4">Update Status</h4>
                <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                  Change feature state
                </p>
                <div className="input relative flex  w-full items-center justify-between">
                  <button
                    onClick={() => {
                      setShowCategoryDropdown(false);
                      setShowUpdateStatus(!showUpdateStatus);
                    }}
                    type="button"
                    className="w-full   text-left capitalize"
                  >
                    {status?.find((astatus) => astatus.id === activeStatus)
                      ?.title ?? ""}
                  </button>

                  {!showUpdateStatus ? (
                    <IconDown className="stroke-blue" />
                  ) : (
                    <IconUp className="stroke-blue" />
                  )}
                  {showUpdateStatus && (
                    <DropdownList
                      className="top-[110%] z-10 -ml-6 w-full  "
                      setShowDropDown={setShowUpdateStatus}
                      showDropDown={showUpdateStatus}
                      active={activeStatus || ""}
                      setActive={(x) =>
                        setActiveStatus(
                          x as "SUGGESTION" | "IN_PROGRESS" | "LIVE" | "PLANNED"
                        )
                      }
                      items={status || []}
                    />
                  )}
                </div>
              </label>
              <label>
                <h4 className="text-h4">Feedback Detail</h4>
                <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  {...register("description", {
                    required: true,
                    minLength: 10,
                  })}
                  className={`input h-24 w-full resize-none ${
                    errors.description ? "border-red" : ""
                  } `}
                />

                <div
                  className={
                    "mt-1 text-h4 font-normal text-red " +
                    (errors.description ? "" : "invisible")
                  }
                >
                  Can’t be empty
                </div>
              </label>
              <div className="flex flex-col-reverse items-center justify-between tablet:flex-row">
                <Button
                  type="button"
                  onClick={() =>
                    deleteFeedback.mutate({ id: feedback?.id as number })
                  }
                  bgColor="red"
                  className="w-full px-6 py-3 text-center disabled:cursor-not-allowed tablet:w-fit"
                >
                  Delete
                </Button>
                <div className="flex w-full flex-col-reverse items-center justify-center tablet:flex-row  tablet:justify-end">
                  <LinkButton
                    link="/"
                    bgColor="dark-blue"
                    className="my-4 block w-full  px-6 py-3 text-center tablet:my-0 tablet:mr-4 tablet:w-fit"
                  >
                    Cancel
                  </LinkButton>
                  <Button
                    disabled={createFeedback.isLoading}
                    type="submit"
                    bgColor="purple"
                    className="w-full px-6 py-3 text-center disabled:cursor-not-allowed tablet:w-fit"
                  >
                    Save Changes
                  </Button>{" "}
                </div>
              </div>
            </form>
            <EditFeedback className="absolute -top-6 left-10 scale-125" />
          </Card>
        </div>
      </main>
    </>
  );
}

export default CreateNewFeedback;
