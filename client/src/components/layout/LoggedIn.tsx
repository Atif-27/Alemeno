import { useAppSelector } from "../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router";

const LoggedIn = ({
  children,
  show = false,
  callback,
}: {
  children: JSX.Element;
  show?: boolean;
  callback?: () => void;
}) => {
  const location = useLocation();
  const redirect = location.pathname;
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  function redirectOnClick() {
    navigate("/login?redirect=" + redirect, { replace: true });
  }
  if (show) {
    return (
      <div
        className="w-fit h-fit"
        onClick={isAuth ? callback : redirectOnClick}
      >
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
