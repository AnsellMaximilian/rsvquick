import React from "react";
import Box from "@mui/material/Box";

export default function Background({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor: string;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={backgroundColor}
      padding={8}
    >
      {children}
    </Box>
  );
}
