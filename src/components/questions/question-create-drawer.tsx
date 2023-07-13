import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { BaseKey, HttpError } from "@refinedev/core";
import { IQuestion, Nullable } from "../../utility/types";
import { Create } from "@refinedev/mui";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography } from "@mui/material";

import { useCreate } from "@refinedev/core";
import { useEffect } from "react";

export const CreateQuestionDrawer: React.FC<{
  drawerProps: UseModalFormReturnType<
    IQuestion,
    HttpError,
    Nullable<IQuestion>
  >;
  request_id: string;
  showChoiceCreateDrawer: (id?: BaseKey | undefined) => void;
}> = ({
  request_id,
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
    setValue("request_id", request_id);
  }, [request_id, setValue]);

  return (
    <Drawer
      open={visible}
      onClose={close}
      anchor="right"
      PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
    >
      <Stack padding={2} gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={24}>Create Question</Typography>
          <IconButton onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit(
              async (values) => {
                await onFinish({ ...values, request_id });
              },
              (error) => {
                console.log(error);
              }
            )();
            setValue("question_text", "");
            setTimeout(() => close(), 500);
          }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            id="question_text"
            {...register("question_text", {
              required: "This field is required",
            })}
            error={!!errors.question_text}
            helperText={errors.question_text?.message}
            margin="normal"
            fullWidth
            label="Question Text"
            name="question_text"
          />
          <Button sx={{ ml: "auto" }} variant="contained" type="submit">
            Create Question
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};
