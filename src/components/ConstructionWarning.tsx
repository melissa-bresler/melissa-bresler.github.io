import React from "react";
import "../styles.css";
import { Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const ConstructionWarning: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
        Under construction!
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
        This feature is currently still being built
      </Typography>
      <div
        style={{
          color: "var(--pink)",
          alignContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60 }} />
      </div>
    </div>
  );
};

export default ConstructionWarning;
