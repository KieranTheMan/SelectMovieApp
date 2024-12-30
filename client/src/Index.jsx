import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Start from "./Start.jsx";
import AiResponse from "./AiResponse.jsx";
import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Start /> },
      { path: "response", element: <AiResponse /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
