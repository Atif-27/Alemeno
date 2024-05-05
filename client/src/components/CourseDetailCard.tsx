import { useParams } from "react-router";
import LoggedIn from "./layout/LoggedIn";
import { useAppDispatch } from "../hooks/reduxHooks";
import { enrollInCourse } from "../store/course";
import LikeButton from "./LikeButton";
// import { enrollCourse } from "../store/course";
/*
+ CourseDetailCard component is a reusable component that displays the course details.
+ The component takes an avatar, price, and enrollmentStatus prop.
+ The component also dispatches the enrollInCourse action when the enroll button is clicked.
*/
const CourseDetailCard = ({
  avatar,
  price,
  enrollmentStatus,
}: {
  avatar: string;
  price: number;
  enrollmentStatus: string;
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
          {price} $
          <div className="badge badge-secondary">{enrollmentStatus}</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions flex justify-between ">
          <LoggedIn show={true} callback={handleClick}>
            <button className="btn btn-primary w-full">Enroll Now</button>
          </LoggedIn>
          <LikeButton courseId={courseId as string} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;
