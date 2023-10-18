import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./component/auth/Login";
import Home from "./component/pages/Home/Home";
import Job from "./component/pages/Job/Job";
import { useDispatch } from "react-redux";
import ResetPassword from "./component/pages/resetPassword/ResetPassword";

import ViewJob from "./component/pages/Job/ViewJob";
import UpdateJob from "./component/pages/Job/UpdateJob";
import { userProfile } from "./actions/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Home />}></Route>

        <Route path="/dashboard/job" element={<Job />}></Route>

        <Route path="/dashboard/job/viewjob/:id" element={<ViewJob />}></Route>
        <Route
          path="/dashboard/job/updatejob/:id"
          element={<UpdateJob />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
