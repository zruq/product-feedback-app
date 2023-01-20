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
    <Card className="flex items-start justify-start px-8 py-7">
      <Upvotes upvotes={upvotes} />
      <div className="ml-10 flex h-full w-full items-center justify-between">
        <div className="">
          <h4 className="text-h3 text-dark-blue">{title}</h4>
          <p className="mt-1 mb-3 text-body1 text-greyish-blue">
            {description}
          </p>
          <Tag content={category.title} />
        </div>
        <div className="flex items-center justify-center text-body1 font-bold text-dark-blue">
          <Comment />
          <div className="ml-2"> {_count.comments}</div>
        </div>
      </div>
    </Card>
  );
}

type SuggestionCardProps = {
  category: {
    id: string;
    title: string;
  };
  _count: {
    comments: number;
  };
  title: string;
  description: string;
  upvotes: number;
};

export default SuggestionCard;
