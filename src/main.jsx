import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Registeruser from "./pages/Registeruser.jsx";
import Loginuser from "./pages/Loginuser.jsx";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";
import Profile from "./pages/Profile.jsx";
import Private from "./components/Private.jsx";
import Updateuser from "./pages/Updateuser.jsx";
import Custom404Error from "./pages/Custom404Error.jsx";

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Homepage />} />
      <Route path="register" element={<Registeruser />} />
      <Route path="login" element={<Loginuser />} />
      <Route element={<Private />}>
        <Route path="profile" element={<Profile />} />
        <Route path="update" element={<Updateuser />} />
      </Route>

      <Route path="*" element={<Custom404Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
