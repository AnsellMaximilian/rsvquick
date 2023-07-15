import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useCreate, useCreateMany, useNotification } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
import tc from "tinycolor2";
import {
  ThemeProvider,
  createTheme,
  darken,
  lighten,
} from "@mui/material/styles";
import dayjs from "../../utility/dayjs";
import { Button } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { IResponse } from "../../pages/requests/list";
import { IAnswer, IChoice, IQuestion } from "../../utility/types";
import { v4 as uuidv4 } from "uuid";

interface Survey {
  question: IQuestion;
  choices: IChoice[];
}

interface SurveyAnswer {
  question_id: string;
  choice_id: string;
}

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
  secondary_gradient?: boolean;
  background_gradient?: boolean;
  requestId?: string;
  responses?: IResponse[];
  surveys?: Survey[];
  style?: string;
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
  secondary_gradient = false,
  background_gradient = false,
  requestId,
  italicize,
  responses,
  surveys,
  style = "DEFAULT",
}) => {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IResponse>();

  const {
    register: surveyRegister,
    handleSubmit: handleSurveySubmit,
    getValues: getSurveyValues,
    formState: { errors: surveyErrors },
  } = useForm<SurveyAnswer[]>();

  const { mutate } = useCreate<IResponse>();
  const { mutate: createAnswers } = useCreateMany<IAnswer>();

  const navigate = useNavigate();
  const { open } = useNotification();

  const defaultTextColor = tc(secondaryColor).isLight() ? "black" : "white";

  const responseAnswer = watch("accept");
  const accept = responseAnswer === "true";

  const onSubmit = async (data: FieldValues) => {
    if (requestId) {
      const surveyAnswers = getSurveyValues()?.answers as IAnswer[];
      if (
        surveys &&
        surveyAnswers &&
        surveyAnswers?.filter((answer) => answer.choice_id).length !==
          surveys.length &&
        accept
      ) {
        open?.({
          type: "error",
          key: "unanswered",
          description: "Please complete the survey.",
          message: "Answer the survey to complete your response.",
        });
        return;
      }

      const responseId = uuidv4();

      mutate(
        {
          resource: "responses",
          values: {
            ...data,
            id: responseId,
            request_id: requestId,
          },
        },
        {
          onSuccess: (data, variables) => {
            if (accept) {
              handleSurveySubmit(
                async (values) => {
                  const surveyAnswers = values.answers as SurveyAnswer[];
                  createAnswers({
                    resource: "answers",
                    errorNotification: false,
                    successNotification: false,
                    values: surveyAnswers.map((answer) => ({
                      ...answer,
                      response_id: responseId,
                    })),
                  });
                },
                (error) => console.log(error, "ERROR")
              )();
            }
            navigate("/thank-you");
          },
        }
      );
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

  const secondaryGradientColor = useMemo(
    () =>
      `linear-gradient(${tc(secondaryColor)
        .analogous()
        .slice(1)
        .reverse()
        .toString()})`,
    [secondaryColor]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          fontFamily: fontFamily,
          fontStyle: italicize ? "italic" : "normal",
          background:
            style === "DEFAULT"
              ? secondary_gradient
                ? secondaryGradientColor
                : secondaryColor
              : "",
        }}
        color={defaultTextColor}
        width={800}
        maxWidth="md"
        component={Paper}
        elevation={4}
      >
        <Box
          px={4}
          pt={4}
          pb={style === "DEFAULT" ? 0 : 8}
          sx={{
            background:
              style === "DEFAULT"
                ? ""
                : secondary_gradient
                ? secondaryGradientColor
                : secondaryColor,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <Typography color={primaryColor} fontWeight="bold">
              {confirmedAttendees} / {limit ? limit : 0}
            </Typography>
          </Box>
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
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
          px={4}
          pb={4}
        >
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
                variant="standard"
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
          {surveys && accept && surveys.length > 0 && (
            <>
              <Divider sx={{ my: 4, color: "red" }} />

              <Stack gap={2}>
                <Typography
                  fontSize={24}
                  fontWeight="bold"
                  color="primary.main"
                  textAlign="center"
                >
                  Questions
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={4}
                  justifyContent="center"
                >
                  {surveys.map((survey, index) => (
                    <Box
                      border={2}
                      borderRadius={1}
                      borderColor="primary.main"
                      padding={2}
                      key={survey.question.id}
                    >
                      <TextField
                        {...surveyRegister(`answers.${index}.question_id`, {
                          required: "This field is required",
                        })}
                        type="text"
                        name="question_id"
                        defaultValue={survey.question.id}
                        sx={{ display: "none" }}
                      />
                      <FormControl error={!!(errors as any)?.accept} fullWidth>
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          sx={{
                            textAlign: "left",
                            color: primaryColor,
                          }}
                        >
                          {survey.question.question_text}
                        </FormLabel>
                        <RadioGroup
                          key={survey.question.id}
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <Stack
                            justifyContent="center"
                            alignItems="flex-start"
                          >
                            {survey.choices.map((choice) => (
                              <FormControlLabel
                                key={choice.id}
                                value={choice.id}
                                {...surveyRegister(
                                  `answers.${index}.choice_id`,
                                  {
                                    required: "This field is required",
                                  }
                                )}
                                control={<Radio />}
                                label={choice.choice_text}
                              />
                            ))}
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </>
          )}
          <Box mt={4} textAlign="center">
            <Button variant="contained" type="submit" disabled={closed}>
              Submit Response
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
