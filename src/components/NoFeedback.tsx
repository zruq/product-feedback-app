import { IllustartionEmpty } from "../svgs/Icons";
import Button from "./shared/Button";
import Card from "./shared/Card";

function NoFeedback() {
  return (
    <Card className="mt-5 flex flex-col items-center justify-center py-20 px-6 text-center tablet:py-28">
      <IllustartionEmpty />
      <h1 className="mt-14 text-h1 text-dark-blue">
        There is no feedback yet.
      </h1>
      <p className="mt-4 mb-12  text-body1 text-greyish-blue">
        Got a suggestion? Found a bug that needs to be squashed?{" "}
        <br className="hidden tablet:block" /> We love hearing about new ideas
        to improve our app.
      </p>
      <Button className="px-6 py-[12.5px]" bgColor="purple">
        + Add Feedback
      </Button>
    </Card>
  );
}

export default NoFeedback;
