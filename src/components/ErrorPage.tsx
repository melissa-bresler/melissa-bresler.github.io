import React from "react";
import "../styles.css";
import { Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage: React.FC<{ error?: Error | null }> = ({ error }) => {
  const subtitle = error
    ? error.message
    : "There was an unexpected error. Please try again later.";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
        Something went wrong!
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
        {subtitle}
      </Typography>
      <div
        style={{
          color: "red",
          alignContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 60 }} />
      </div>
    </div>
  );
};

export default ErrorPage;
