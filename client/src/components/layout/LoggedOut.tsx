import { useAppSelector } from "../../hooks/reduxHooks";
/* LoggedOut component is a reusable component that displays the children components only if the user is logged out. */
const LoggedOut = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  if (!isAuth) {
    return <div>{children}</div>;
  }
};

export default LoggedOut;
