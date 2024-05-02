import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query === "") {
      navigate("/");
      window.location.reload();
    }
    if (location.pathname === "/" && query) {
      searchParams.set("q", query);
      setSearchParams(Object.fromEntries(searchParams));
    } else {
      navigate("/?q=" + query);
    }
  }
  return (
    <div className="navbar bg-base-100 md:px-20 py-4">
      <div className="flex-1 flex gap-10 md:gap-20">
        <a className="btn btn-ghost text-xl">Alemeno</a>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered md:min-w-96  max-md:w-auto"
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