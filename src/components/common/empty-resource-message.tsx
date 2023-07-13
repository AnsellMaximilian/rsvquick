import React from "react";
import Box from "@mui/material/Box";

export default function EmptyResourceMessage({
  message,
  padding = 4,
}: {
  message: string;
  padding?: number;
}) {
  return (
    <Box
      bgcolor="action.hover"
      p={padding}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {message}
    </Box>
  );
}
