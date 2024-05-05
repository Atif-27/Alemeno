import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LogoutContainer from "./layout/LogoutContainer";
import LoggedIn from "./layout/LoggedIn";
import LoggedOut from "./layout/LoggedOut";
import { CiSearch } from "react-icons/ci";

/*
+ Navbar component is a reusable component that displays the navigation bar of the application. It contains the search bar and user authentication buttons.
+ The component also contains the user avatar and dropdown menu for logged-in users.
+ If user isnt logged in, the component displays the login and register buttons.
*/

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query === "") {
      navigate("/");
      return;
    }
    if (location.pathname === "/" && query) {
      navigate("/?q=" + query);
    } else {
      navigate("/?q=" + query);
    }
  }
  return (
    <div className="navbar bg-base-100 md:px-20 py-3 max-md:py-3 sticky top-0 z-10  space-y-3 ">
      <div className="flex-1 flex gap-4 md:gap-20">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl max-md:text-sm max-md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          Alemeno
        </Link>
        <form className="join" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered md:min-w-96  max-md:min-w-24 max-lg:min-w-16 max-md:scale-90  max-md:h-10 join-item rounded-l-full"
            ref={inputRef}
          />
          <button className="btn join-item  bg-yellow-50 text-black hover:bg-primary hover:text-white rounded-r-full">
            <CiSearch size={20} />
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center gap-8">
        <LoggedOut>
          <div className="flex items-center justify-center gap-4">
            <Link className="btn btn-active btn-primary" to={"/login"}>
              Login
            </Link>
            <Link className="btn btn-outline" to={"/register"}>
              Register
            </Link>
          </div>
        </LoggedOut>
        <LoggedIn>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/dashboard"} className="justify-between">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/courses"} className="justify-between">
                  My Courses
                </Link>
              </li>
              <li>
                <LogoutContainer>Logout</LogoutContainer>
              </li>
            </ul>
          </div>
        </LoggedIn>
      </div>
    </div>
  );
};

export default Navbar;
