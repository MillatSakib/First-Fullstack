import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UpdateUserData from "./UpdateUserData.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [],
  },
  {
    path: "/update/:id",
    element: <UpdateUserData></UpdateUserData>,
    loader: ({ params }) => fetch(`http://localhost:3010/user/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
