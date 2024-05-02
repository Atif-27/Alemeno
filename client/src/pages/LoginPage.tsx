import { useState } from "react";
// import useRedirectPath from "@/hooks/useRedirectPath";
import { Link, redirect } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../store/user";
const initialFieldState = {
  username: "test",
  email: "test07@gmail.com",
  password: "123456",
};
function LoginPage() {
  const [fields, setFields] = useState(initialFieldState);
  const dispatch = useAppDispatch();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({ email: fields.email, username: fields.username }));
  }
  return (
    <section className=" lg:grid lg:grid-cols-2  h-screen w-full ">
      <form
        className="flex h-full items-center justify-center py-12 bg-black text-white"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.username}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.password}
              />
            </div>
            <button type="submit" className="w-full bg-primary_orange">
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/register?redirect=" + redirect} className="underline">
              Register
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
export default LoginPage;
