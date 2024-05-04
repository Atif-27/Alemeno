import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logOut } from "../../store/user";

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
