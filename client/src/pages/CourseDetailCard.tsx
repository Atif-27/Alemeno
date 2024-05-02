import { useParams } from "react-router";
import LoggedIn from "../components/layout.tsx/LoggedIn";
import { useAppDispatch } from "../hooks/reduxHooks";
import { enrollCourse } from "../store/course";

const CourseDetailCard = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  function handleClick() {
    dispatch(enrollCourse(Number(courseId)));
  }
  return (
    <div>
      <figure>
        <img
          src="https://res.cloudinary.com/dqvzda5xi/image/upload/v1713455490/tqebk76mmdnzaumxwqat.png"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
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
