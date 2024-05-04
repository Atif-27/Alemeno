import "./App.css";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Container from "./pages/layout/Container";
import MyCourses from "./pages/MyCourses";
import EnrollmentPage from "./pages/EnrollmentPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <Container />,
      children: [
        {
          path: "/",
          element: <CourseListPage />,
        },
        {
          path: "/courses/:courseId",
          element: <CourseDetailPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        { path: "courses", element: <MyCourses /> },
        { path: "courses/:id", element: <EnrollmentPage /> },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
