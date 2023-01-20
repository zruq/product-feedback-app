import { SuggestionOverview } from "../pages";
import { Comment } from "../svgs/Icons";
import Card from "./shared/Card";
import Upvotes from "./shared/Upvote";
import Tag from "./Tag";

function SuggestionCard({
  category,
  title,
  description,
  upvotes,
  _count,
}: SuggestionCardProps) {
  return (
    <Card className="group my-5  flex items-start justify-start px-8 py-7">
      <Upvotes className="hidden tablet:block" upvotes={upvotes} />
      <div className=" flex h-full w-full flex-col justify-between  tablet:flex-row tablet:items-center ">
        <div className="pb-4 tablet:px-10 tablet:pb-0">
          <a className="cursor-pointer text-h3 text-dark-blue group-hover:text-blue">
            {title}
          </a>
          <p className="mt-1 mb-3 text-body1 text-greyish-blue">
            {description}
          </p>
          <Tag content={category.title} />
        </div>
        <div className="flex w-full justify-between tablet:w-fit">
          <Upvotes className="tablet:hidden" upvotes={upvotes} />

          <div className="flex items-center justify-center text-body1 font-bold text-dark-blue">
            <Comment />
            <div className="ml-2"> {_count.comments}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

type SuggestionCardProps = SuggestionOverview;

export default SuggestionCard;
