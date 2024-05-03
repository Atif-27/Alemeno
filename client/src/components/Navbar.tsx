import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query === "") {
      navigate("/");
      window.location.reload();
    }
    if (location.pathname === "/" && query) {
      navigate("/?q=" + query);
    } else {
      navigate("/?q=" + query);
    }
  }
  return (
    <div className="navbar bg-base-100 md:px-20 py-6 max-md:py-3 sticky top-0 z-10  space-y-3 ">
      <div className="flex-1 flex gap-4 md:gap-20">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl max-md:text-sm max-md:hidden"
        >
          Alemeno
        </Link>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered md:min-w-96  max-md:min-w-24 max-lg:min-w-16 max-md:scale-90  max-md:h-10"
            ref={inputRef}
          />
        </form>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
