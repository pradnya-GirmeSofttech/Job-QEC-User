import { Typography } from "@mui/material";
import React from "react";
import Dashboard from "../../dashboard/Dashboard";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth?.user);

  if (!user) {
    return <Typography variant="h6">loading</Typography>;
  }
  return (
    <Dashboard>
      <Typography variant="button" display="block" gutterBottom fontSize={20}>
        Welcome , {user ? user.name : ""}
      </Typography>
    </Dashboard>
  );
}

export default Home;
