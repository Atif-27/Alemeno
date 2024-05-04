import { useAppSelector } from "../../hooks/reduxHooks";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;
const AuthLayout = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const redirect = location.pathname;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login" + "?redirect=" + redirect, { replace: true });
      return;
    }
  }, [user, navigate, redirect]);
  if (!user) return null;
  return <div>{children}</div>;
};
export default AuthLayout;
