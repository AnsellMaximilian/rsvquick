import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AppIcon } from "../../components/app-icon";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Stack>
      <Box
        component="header"
        p={2}
        display="flex"
        justifyContent="space-between"
      >
        <AppIcon />
        <Stack direction="row" gap={2}>
          <Button variant="outlined" component={Link} to="/login" size="small">
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            size="small"
          >
            Create Account
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
