import SectionHeading from "./SectionHeading";

/*
  InstructorCard component is used to display the details of the instructor.
  It returns a card with the instructor's avatar, name, title, and bio.
*/

const InstructorCard = ({
  avatar,
  name,
  title,
  bio,
}: {
  avatar: string;
  name: string;
  title: string;
  bio: string;
}) => {
  return (
    <div>
      <div className="card max-w-4xl   bg-neutral text-neutral-content my-10">
        <div className="card-body px-10 py-5 ">
          <SectionHeading title="Instructor Details" className="mt-3" />
          <div className="flex justify-start items-start gap-4 my-4">
            <img
              src={avatar}
              alt="avatar"
              className="w-14 h-14 object-cover rounded-full"
            />
            <div>
              <p className="text-xl font-bold">{name}</p>
              <p className="font-semibold">{title}</p>
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
