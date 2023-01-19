import TagCard from "./shared/TagCard";

function Tag({ isActive, content }: TagProps) {
  return (
    <TagCard
      isActive={isActive}
      className="px-4 py-1.5 text-body3 font-semibold"
    >
      <>{content}</>
    </TagCard>
  );
}

type TagProps = {
  isActive?: boolean;
  content: string;
};

export default Tag;
