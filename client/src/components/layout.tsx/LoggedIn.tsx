import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router";

const LoggedIn = ({
  children,
  show = false,
  callback,
}: {
  children: JSX.Element;
  show?: boolean;
  callback?: () => void;
}) => {
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  function redirect() {
    navigate("/login");
  }
  if (show) {
    return (
      <div className="w-fit h-fit" onClick={isAuth ? callback : redirect}>
        {children}
      </div>
    );
  } else {
    if (isAuth) {
      return <div>{children}</div>;
    }
  }
  return null;
};

export default LoggedIn;
