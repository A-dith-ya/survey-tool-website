import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import AccountPage from "./pages/Auth/Account";
import DashboardPage from "./pages/Dashboard/Dashboard";
import SurveyPage from "./pages/Survey/Survey";
import PublishPage from "./pages/Preview/Publish";
import PreviewPage from "./pages/Preview/Preview";
import ResponsePage from "./pages/Response/Response";
import UserContext from "./components/AuthForm/UserContext";
import store from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/survey",
    element: <SurveyPage />,
  },
  {
    path: "/preview",
    element: <PreviewPage />,
  },
  {
    path: "/open/:surveyId",
    element: <PublishPage />,
  },
  {
    path: "/response",
    element: <ResponsePage />,
  },
]);

function App() {
  // User Context info throughout the app
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <React.StrictMode></React.StrictMode>
        </RouterProvider>
      </Provider>
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
