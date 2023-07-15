import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export const AppIcon: React.FC<{ collapsed?: boolean; size?: number }> = ({
  collapsed = false,
  size = 120,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      component={Link}
      to="/requests"
    >
      <img
        src={collapsed ? "/rsvquick-icon.svg" : "/rsvquick-logo.svg"}
        width={collapsed ? 25 : size}
      />
    </Box>
  );
};
