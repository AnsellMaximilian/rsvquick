import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import {
  CreateButton,
  HamburgerMenu,
  RefineThemedLayoutV2HeaderProps,
} from "@refinedev/mui";
import React, { useContext, useEffect, useMemo } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import tc from "tinycolor2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "../../utility/dayjs";
import { Button } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IRequest, IResponse } from "../../pages/requests/list";

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
  requestId?: string;
  responses?: IResponse[];
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
  requestId,
  italicize,
  responses,
}) => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate } = useCreate();
  const navigate = useNavigate();

  const defaultTextColor = tc(secondaryColor).isLight() ? "black" : "white";

  const onSubmit = (data: FieldValues) => {
    if (requestId) {
      mutate({
        resource: "responses",
        values: {
          ...data,
          request_id: requestId,
        },
      });
      navigate("/");
    }
  };

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

  const confirmedAttendees = useMemo(
    () => responses?.filter((res) => res.accept)?.length || 0,
    [responses]
  );

  const closed = useMemo(
    () => dayjs().isAfter(dayjs(closeDate)) || confirmedAttendees >= limit,
    [closeDate, confirmedAttendees, limit]
  );

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
        <Box display="flex" justifyContent="flex-end">
          <Typography color={primaryColor} fontWeight="bold">
            {confirmedAttendees} / {limit ? limit : 0}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
              RSVP{closed ? " (CLOSED)" : ""}
            </Typography>
            <Typography fontSize={24} textAlign="center" color={primaryColor}>
              Kindly Reply Before {dayjs(closeDate).format("Do MMMM YYYY")}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box my={2}>
              <TextField
                {...register("responder_name", {
                  required: "This field is required",
                })}
                error={!!(errors as any)?.responder_name}
                helperText={(errors as any)?.responder_name?.message}
                InputLabelProps={{ shrink: true }}
                type="text"
                label="Your Name"
                name="responder_name"
                variant="filled"
              />
            </Box>
            <FormControl error={!!(errors as any)?.accept}>
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
                    value={false}
                    {...register("accept", {
                      required: "This field is required",
                    })}
                    control={<Radio />}
                    label={rejectionLabel}
                  />
                  <FormControlLabel
                    value={true}
                    {...register("accept", {
                      required: "This field is required",
                    })}
                    control={<Radio />}
                    label={acceptanceLabel}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={4} textAlign="center">
            {/* <CreateButton variant="contained" {...saveButtonProps}>
            Submit Response
          </CreateButton> */}
            <Button variant="contained" type="submit" disabled={closed}>
              Submit Response
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
