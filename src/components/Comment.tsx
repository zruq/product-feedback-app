import Image from "next/image";
import Link from "next/link";

function Comment({ user, content, replyingTo }: CommentProps) {
  return (
    <div className="flex items-start justify-start py-8">
      <div className="mr-8">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={user.image}
          alt={`avatar of ${user.username}`}
        />
      </div>
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div className="">
            <div className="text-h4 text-[#3A4374]">{user.name}</div>
            <div className="text-body2 text-[0.875rem] text-[#647196]">
              @{user.username}
            </div>
          </div>
          <button className="block text-body3 font-semibold text-blue">
            Reply
          </button>
        </div>
        <div className="mt-4 text-body2 text-[#647196]">
          {" "}
          {replyingTo && (
            <Link
              href={`./#${replyingTo.id}`}
              className="text-body2 font-bold text-purple"
            >
              <>@{replyingTo.author.username}</>
            </Link>
          )}{" "}
          {content}
        </div>
      </div>
    </div>
  );
}

type CommentProps = {
  user: {
    username: string;
    name: string;
    image: string;
  };
  content: string;
  replyingTo?: {
    id: number;
    author: {
      username: string;
    };
  };
};

export default Comment;
