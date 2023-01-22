import Head from "next/head";
import Card from "../components/shared/Card";
import { IconDown, IconUp, NewFeedback } from "../svgs/Icons";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import { useState } from "react";
import DropdownList from "../components/shared/DropdownList";

type FeedbackSchema = {
  title: string;
  description: string;
  categoryId: string;
};

function CreateNewFeedback() {
  const { data: categories } = api.router.getCategoryies.useQuery();
  const [showDropdown, setShowDropdown] = useState(false);
  const [active, setActive] = useState(categories?.[0]?.id ?? "");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackSchema>();
  const onSubmit: SubmitHandler<FeedbackSchema> = (data) => console.log(data);
  return (
    <>
      <Head>
        <title>Crete New Feedback</title>
        <meta name="description" content="By Mehdi Zibout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen items-center justify-center bg-light-grey-lighter">
        <Card className="relative px-10 py-12 text-dark-blue desktop:w-[33.75rem]">
          <h1 className="mb-10 text-h1">Create New Feedback</h1>
          <form onSubmit={(data) => console.log(data)}>
            <label>
              <h4 className="text-h4">Feedback Title</h4>
              <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                Add a short, descriptive headline
              </p>
              <input
                {...register("title")}
                type="text"
                className="input w-full"
              />
            </label>
            <label
              className="my-6 block bg-red"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className=" text-h4">Category</h4>
              <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                Choose a category for your feedback
              </p>
              <button
                type="button"
                className="input relative flex  w-full items-center justify-between"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
              >
                <div className="capitalize">
                  {categories?.find((cat) => cat.id === active)?.title ??
                    categories?.[0]?.title ??
                    ""}
                </div>
                {showDropdown ? (
                  <IconDown className="stroke-blue" />
                ) : (
                  <IconUp className="stroke-blue" />
                )}
                {showDropdown && (
                  <DropdownList
                    className="top-[110%] -ml-6 w-full "
                    setShowDropDown={setShowDropdown}
                    showDropDown={showDropdown}
                    active={active}
                    setActive={handleDropdownClick}
                    items={categories || []}
                  />
                )}
              </button>
            </label>
            <label>
              <h4 className="text-h4">Feedback Detail</h4>
              <p className="mb-4 mt-0.5 text-[0.875rem] leading-[20.23px] text-greyish-blue">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea
                {...register("description")}
                className="input h-24 w-full resize-none"
              />
              <button type="submit">shrs</button>
            </label>
            <button type="submit">sub</button>
          </form>
          <NewFeedback className="absolute -top-8 left-10 " />
        </Card>
      </main>
    </>
  );

  function handleDropdownClick(x: string) {
    setActive(x);
  }
}

export default CreateNewFeedback;
