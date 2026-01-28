import React from "react";
import { CircularProgress } from "@mui/material";
import "../styles.css";

const Spinner: React.FC = () => {
  // TODO: Center in the middle of page
  // TODO: Possibly customise the colours to match website colours i.e. pink and yellow -> https://mui.com/material-ui/react-progress/
  return <CircularProgress />;
};

export default Spinner;
