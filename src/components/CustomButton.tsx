import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles.css";

interface CustomButtonProps {
  to?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ to, children, style }) => {
  const isLink = Boolean(to);

  return (
    <Button
      className="custom-button"
      style={style}
      component={isLink ? RouterLink : "button"}
      to={to}
      variant="text"
      disableElevation
      disableRipple
    >
      {children}
    </Button>
  );
};

export default CustomButton;
