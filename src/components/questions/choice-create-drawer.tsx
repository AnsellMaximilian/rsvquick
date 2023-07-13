import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller, FieldValues } from "react-hook-form";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { HttpError, useTable } from "@refinedev/core";
import { IChoice, IQuestion, Nullable } from "../../utility/types";
import { Create, DeleteButton } from "@refinedev/mui";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography } from "@mui/material";

import { useCreate } from "@refinedev/core";
import { useEffect } from "react";
import EmptyResourceMessage from "../common/empty-resource-message";

export const CreateChoiceDrawer: React.FC<{
  drawerProps: UseModalFormReturnType<IChoice, HttpError, Nullable<IChoice>>;
  question: IQuestion | null;
}> = ({
  question,
  drawerProps: {
    refineCore: { onFinish },
    handleSubmit,
    saveButtonProps,
    watch,
    getValues,
    clearErrors,
    modal: { visible, close },
    register,
    setValue,
    control,
    formState: { errors },
  },
}) => {
  useEffect(() => {
    if (question) {
      setValue("question_id", question.id);
    }
  }, [question, setValue]);

  const { tableQueryResult: choiceQueryResult } = useTable<IChoice, HttpError>({
    resource: "choices",
    queryOptions: { enabled: !!question },
    filters: {
      permanent: [
        {
          field: "question_id",
          operator: "eq",
          value: question?.id,
        },
      ],
    },
  });

  const choices = choiceQueryResult.data?.data;

  return (
    <Drawer
      open={visible}
      onClose={close}
      anchor="right"
      PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
    >
      {question && (
        <Stack padding={2} gap={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography fontSize={20}>{question.question_text}</Typography>
              <Typography fontSize={24}>Create Choice</Typography>
            </Stack>
            <IconButton onClick={() => close()}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                async (values) => {
                  await onFinish({ ...values, question_id: question.id });
                },
                (error) => {
                  console.log(error);
                }
              )();
              setValue("choice_text", "");
            }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="choice_text"
              {...register("choice_text", {
                required: "This field is required",
              })}
              error={!!errors.choice_text}
              helperText={errors.choice_text?.message}
              margin="normal"
              fullWidth
              label="Choice Text"
              name="choice_text"
            />
            <Button sx={{ ml: "auto" }} variant="contained" type="submit">
              Add Choice
            </Button>
          </Box>
          {choices && (
            <Stack gap={2}>
              <Typography fontWeight="bold">Current Choices</Typography>
              {choices.length > 0 ? (
                choices.map((choice) => (
                  <Stack
                    bgcolor="action.hover"
                    p={1}
                    key={choice.id}
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                  >
                    <Typography>{choice.choice_text}</Typography>
                    <DeleteButton
                      resource="choices"
                      hideText
                      recordItemId={choice.id}
                    />
                  </Stack>
                ))
              ) : (
                <EmptyResourceMessage
                  padding={2}
                  message="Create some choices."
                />
              )}
            </Stack>
          )}
        </Stack>
      )}
    </Drawer>
  );
};
