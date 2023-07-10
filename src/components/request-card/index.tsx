import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import tc from "tinycolor2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "../../utility/dayjs";
import { Button } from "@mui/material";

interface RequestCardProps {
  title: string;
  address: string;
  rejectionLabel: string;
  acceptanceLabel: string;
  closeDate: string;
  secondaryColor: string;
  primaryColor: string;
  fontFamily: string;
  limit: number;
  backgroundColor: string;
  italicize: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  title,
  address,
  fontFamily,
  limit,
  rejectionLabel,
  acceptanceLabel,
  closeDate,
  secondaryColor,
  primaryColor,
  backgroundColor,
  italicize,
}) => {
  const defaultTextColor = tc(secondaryColor).isLight() ? "black" : "white";
  const theme = createTheme({
    typography: {
      fontFamily: fontFamily,
    },
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            ":before": {
              borderColor: defaultTextColor,
            },
            color: defaultTextColor,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: defaultTextColor,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: defaultTextColor,
          },
        },
      },
    },
    palette: {
      primary: {
        main: primaryColor || "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor={secondaryColor}
        padding={4}
        sx={{
          borderRadius: 2,
          fontFamily: fontFamily,
          fontStyle: italicize ? "italic" : "normal",
        }}
        color={defaultTextColor}
        width={800}
        maxWidth="md"
        component={Paper}
        elevation={4}
      >
        <Typography
          fontSize={36}
          textAlign="center"
          fontWeight="bold"
          color={primaryColor}
        >
          {title || "Please Join Us!"}
        </Typography>
        <Typography textAlign="center" color={primaryColor}>
          {address}
        </Typography>
        <Box mt={4}>
          <Typography
            fontSize={32}
            fontWeight="bold"
            textAlign="center"
            color={primaryColor}
          >
            RSVP
          </Typography>
          <Typography fontSize={24} textAlign="center" color={primaryColor}>
            Kindly Reply Before {dayjs(closeDate).format("Do MMMM YYYY")}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box my={2}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Your Name"
              name="guest_name"
              variant="filled"
            />
          </Box>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ textAlign: "center", color: primaryColor }}
            >
              Are you going?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue={false}
              name="radio-buttons-group"
            >
              <Box display="flex" justifyContent="space-between" gap={4}>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={rejectionLabel}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={acceptanceLabel}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mt={4} textAlign="center">
          <Button variant="contained">Submit Response</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
