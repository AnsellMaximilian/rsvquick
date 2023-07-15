import React from "react";
import Box from "@mui/material/Box";
import { darken, lighten } from "@mui/material/styles";
import tc from "tinycolor2";

export default function Background({
  children,
  backgroundColor,
  responseView = false,
  background_gradient = false,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  background_gradient?: boolean;
  responseView?: boolean;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={backgroundColor}
      sx={{
        background: background_gradient
          ? `radial-gradient(${lighten(
              backgroundColor,
              0.3
            )}, ${backgroundColor}, ${tc(backgroundColor)
              .analogous()
              .toString()})`
          : backgroundColor,
      }}
      padding={{ xs: 1, md: 8 }}
      minHeight={responseView ? "100vh" : "100%"}
    >
      {children}
    </Box>
  );
}
