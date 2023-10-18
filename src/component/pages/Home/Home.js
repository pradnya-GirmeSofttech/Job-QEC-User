import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import Dashboard from "../../dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  // console.log("user", user.name);

  if (!user) {
    return <Typography variant="h6">loading</Typography>;
  }
  return (
    <Dashboard>
      <Typography>Welcome, {user.name} </Typography>
    </Dashboard>
  );
}

export default Home;
