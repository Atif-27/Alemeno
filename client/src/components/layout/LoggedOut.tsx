import { useAppSelector } from "../../hooks/reduxHooks";

const LoggedOut = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  if (!isAuth) {
    return <div>{children}</div>;
  }
};

export default LoggedOut;
