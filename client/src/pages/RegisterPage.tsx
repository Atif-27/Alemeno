import { useState } from "react";

import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { registerUser } from "../store/user";
import useRedirectPath from "../hooks/useRedirect";
const initialFieldState = {
  name: "test",
  email: "test07@gmail.com",
  password: "123456",
};
function RegisterPage() {
  const [fields, setFields] = useState(initialFieldState);
  const redirect = useRedirectPath();

  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      registerUser({
        email: fields.email,
        name: fields.name,
        password: fields.password,
      })
    );
  }
  return (
    <section className=" lg:grid lg:grid-cols-2  h-screen w-full ">
      <form
        className="flex h-full items-center justify-center py-12 bg-neutral text-white"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">name</label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  id="name"
                  className="grow"
                  placeholder="Enter Your name"
                  onChange={handleChange}
                  value={fields.name}
                />
              </label>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  className="grow"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={fields.email}
                  id="email"
                  type="email"
                />
              </label>
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  type="password"
                  className="grow"
                  required
                  onChange={handleChange}
                  value={fields.password}
                />
              </label>
            </div>
            <button type="submit" className="w-full btn btn-primary">
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already Have an account?{" "}
            <Link to={"/login?redirect=" + redirect} className="underline">
              Login
            </Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block bg-green-200">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}
export default RegisterPage;
