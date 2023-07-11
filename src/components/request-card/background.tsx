import React from "react";
import Box from "@mui/material/Box";

export default function Background({
  children,
  backgroundColor,
  responseView = false,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  responseView?: boolean;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={backgroundColor}
      padding={8}
      minHeight={responseView ? "100vh" : "100%"}
    >
      {children}
    </Box>
  );
}
