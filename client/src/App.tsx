import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Container from "./pages/layout/Container";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./pages/layout/AuthLayout";
import LoadingPage from "./pages/LoadingPage";

// Lazy loading the components
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const EnrollmentPage = lazy(() => import("./pages/EnrollmentPage"));
const DashboardSummaryPage = lazy(() => import("./pages/DashboardSummaryPage"));
function App() {
  //* Defining the routes for the application
  const router = createBrowserRouter([
    {
      element: (
        <>
          {
            // This is the scroll restoration component which restores the scroll position on page change
          }
          <ScrollRestoration /> <Outlet />
        </>
      ),
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          element: <Container />, // This is the layout for the course pages which includes the Navbar and footer
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
        // This is dashboard routes which can be acceseed only after login
        {
          path: "/dashboard",
          element: (
            <AuthLayout>
              <Suspense fallback={<LoadingPage />}>
                <DashboardPage />
              </Suspense>
            </AuthLayout>
          ),
          children: [
            {
              path: "",
              element: <DashboardSummaryPage />,
            },
            {
              path: "courses",
              element: (
                <Suspense fallback={<LoadingPage />}>
                  <MyCourses />
                </Suspense>
              ),
            },

            {
              path: "courses/:id",
              element: (
                <Suspense fallback={<LoadingPage />}>
                  <EnrollmentPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />

      <ToastContainer />
      {/* This is the toast container for showing the toast messages */}
    </div>
  );
}

export default App;
