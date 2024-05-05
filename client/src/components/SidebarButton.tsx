import { Link, useLocation } from "react-router-dom";
/*
+ SidebarButton component is a reusable component that displays the sidebar navigation buttons.
*/
const SidebarButton = ({
  children,
  logo,
  current,
  type,
}: {
  children: JSX.Element | string;
  logo: JSX.Element;
  current: string;
  type?: string;
}) => {
  const path = useLocation().pathname;
  const open = path === current;
  return (
    <li
      className={`  ${
        open && `bg-blue-400`
      }  cursor-pointer py-2 rounded-md text-white font-medium px-3 flex gap-2 items-center`}
    >
      {type === "mobile" ? (
        <Link
          type="submit"
          to={current}
          className="flex items-center justify-start space-x-3 w-full h-full"
        >
          <div>{logo}</div>
          <div>{children}</div>
        </Link>
      ) : (
        <Link
          type="submit"
          to={current}
          className="flex items-center justify-start space-x-3 w-full h-full"
        >
          <div>{logo}</div>
          <div>{children}</div>
        </Link>
      )}
    </li>
  );
};

export default SidebarButton;
