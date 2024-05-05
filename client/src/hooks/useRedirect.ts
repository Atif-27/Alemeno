import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";

/* 
+ useRedirectPath is a custom hook that redirects the user to the specified path if the user is authenticated.
+ The hook takes no arguments.
+ The hook returns the redirect path.
*/

export default function useRedirectPath() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const redirect = searchParams.get("redirect");

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
