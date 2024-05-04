import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";

export default function useRedirectPath() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const redirect = searchParams.get("redirect");
  console.log(user);

  useEffect(() => {
    if (user.isAuthenticated) {
      if (redirect) {
        navigate(redirect, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
  }, [user.isAuthenticated, redirect, navigate]);
  return redirect;
}
