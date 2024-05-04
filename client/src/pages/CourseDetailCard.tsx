import { useParams } from "react-router";
import LoggedIn from "../components/layout.tsx/LoggedIn";
import { useAppDispatch } from "../hooks/reduxHooks";
import { enrollInCourse } from "../store/course";
// import { enrollCourse } from "../store/course";

const CourseDetailCard = ({
  avatar,
  price,
}: {
  avatar: string;
  price: number;
}) => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  function handleClick() {
    dispatch(enrollInCourse(courseId as string));
  }
  return (
    <div>
      <figure>
        <img src={avatar} alt="avatar" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {price} $<div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions ">
          <LoggedIn show={true} callback={handleClick}>
            <button className="btn btn-primary w-full">Enroll Now</button>
          </LoggedIn>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;
