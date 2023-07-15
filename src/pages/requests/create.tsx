import { Create } from "@refinedev/mui";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { useEffect, useState } from "react";
import { RequestCard } from "../../components/request-card";
import fonts from "../../utility/fonts";
import dayjs from "../../utility/dayjs";
import Background from "../../components/request-card/background";
import { useGetIdentity } from "@refinedev/core";
import { IUser } from "../../components/header";

export const RequestCreate: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const title = watch("title");
  const address = watch("address");
  const closeDate = watch("close_date");
  const limit = watch("limit");
  const acceptanceLabel = watch("acceptance_label");
  const rejectionLabel = watch("rejection_label");
  const secondaryColor = watch("secondary_color");
  const primaryColor = watch("primary_color");
  const fontFamily = watch("font_family");
  const backgroundColor = watch("background_color");
  const italicize = watch("italicize");
  const secondary_gradient = watch("secondary_gradient");
  const background_gradient = watch("background_gradient");
  const style = watch("style");

  useEffect(() => {
    setValue("secondary_color", "#F9F4D7");
    setValue("primary_color", "#846C15");
    setValue("acceptance_label", "Politely Accepts");
    setValue("rejection_label", "Respectfully Declines");
    setValue("font_family", fonts[0]);
    setValue("close_date", dayjs().add(7, "day").format("YYYY-MM-DD"));
    setValue("background_color", "#EEE6B4");
    setValue("italicize", false);
    setValue("secondary_gradient", false);
    setValue("background_gradient", false);
    setValue("style", "DEFAULT");
  }, [setValue]);

  return (
    <Create
      isLoading={formLoading}
      footerButtons={() => (
        <>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              if (user) {
                clearErrors();
                handleSubmit(async (values) => {
                  await onFinish({ ...values, user_id: user.id });
                })();
              }
            }}
          >
            Create Request
          </Button>
        </>
      )}
    >
      <Box marginBottom={4}>
        <Box mb={2}>
          <Typography component="h2" fontSize={24}>
            Preview
          </Typography>
        </Box>
        <Background
          backgroundColor={backgroundColor}
          background_gradient={background_gradient}
        >
          <RequestCard
            backgroundColor={backgroundColor}
            title={title}
            address={address}
            acceptanceLabel={acceptanceLabel}
            rejectionLabel={rejectionLabel}
            closeDate={closeDate}
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            limit={limit}
            fontFamily={fontFamily}
            italicize={italicize}
            secondary_gradient={secondary_gradient}
            background_gradient={background_gradient}
            style={style}
          />
        </Background>
      </Box>
      <Grid component="form" autoComplete="off" container spacing={2}>
        <Grid container item xs={12} md={6} spacing={2} flex={1}>
          <Grid item xs={12}>
            <Typography fontSize={24} fontWeight="semibold">
              General Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("title", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.title}
              helperText={(errors as any)?.title?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Title"
              name="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("address", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.address}
              helperText={(errors as any)?.address?.message}
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Address"
              name="address"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("acceptance_label", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.acceptance_label}
              helperText={(errors as any)?.acceptance_label?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Acceptance Label"
              name="acceptance_label"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("rejection_label", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.rejection_label}
              helperText={(errors as any)?.rejection_label?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Rejection Label"
              name="rejection_label"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("limit", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              error={!!(errors as any)?.limit}
              helperText={(errors as any)?.limit?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              label="Limit"
              name="limit"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("close_date", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.close_date}
              helperText={(errors as any)?.close_date?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Close Date"
              name="close_date"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          spacing={2}
          alignContent="flex-start"
        >
          <Grid item xs={12}>
            <Typography fontSize={24} fontWeight="semibold">
              Visual
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("primary_color", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.primary_color}
              helperText={(errors as any)?.primary_color?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="color"
              label="Primary Color"
              name="primary_color"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              {...register("secondary_color", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.secondary_color}
              helperText={(errors as any)?.secondary_color?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="color"
              label="Secondary Color"
              name="secondary_color"
            />
          </Grid>

          <Grid item xs={4} display="flex" alignItems="center">
            <FormControlLabel
              control={<Switch {...register("secondary_gradient")} />}
              label="Gradient"
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              {...register("background_color", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.background_color}
              helperText={(errors as any)?.background_color?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="color"
              label="Background Color"
              name="background_color"
            />
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <FormControlLabel
              control={<Switch {...register("background_gradient")} />}
              label="Gradient"
            />
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id="font_family">Font</InputLabel>
              <Select
                labelId="font_family"
                label="Age"
                error={!!(errors as any)?.font_family}
                {...register("font_family", {
                  required: "This field is required",
                })}
                defaultValue={fonts[0]}
              >
                {fonts.map((font) => (
                  <MenuItem value={font} key={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <FormControlLabel
              control={<Switch {...register("italicize")} />}
              label="Italicize"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="style">Style</InputLabel>
              <Select
                labelId="style"
                label="Style"
                error={!!(errors as any)?.style}
                {...register("style", {
                  required: "This field is required",
                })}
                defaultValue="DEFAULT"
              >
                <MenuItem value="DEFAULT">DEFAULT</MenuItem>
                <MenuItem value="FANCY">FANCY</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Create>
  );
};
