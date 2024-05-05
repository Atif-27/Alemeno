import NotFoundImg from "../assets/NotFound.jpg";
import PageHeading from "./PageHeading";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <PageHeading
        title="      No courses found
"
        className=" mb-10 text-2xl font-medium"
      />
      <img
        src={NotFoundImg}
        alt="No courses found"
        className="w-96 h-96 mx-auto"
      />
    </div>
  );
};

export default NotFound;
