import "./App.css";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CourseListPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/courses/:courseId",
      element: <CourseDetailPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
