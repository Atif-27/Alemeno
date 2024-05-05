import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logOut } from "../../store/user";

/*
+ LogoutContainer is a component that logs out the user when clicked.
+ The component takes a children prop that is displayed when the user is logged out.
*/

const LogoutContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  function handleLogout() {
    dispatch(logOut());
  }
  return (
    <div className=" w-full h-full" onClick={handleLogout}>
      {children}
    </div>
  );
};

export default LogoutContainer;
