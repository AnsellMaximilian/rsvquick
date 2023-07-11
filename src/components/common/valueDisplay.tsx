import { Stack, Typography } from "@mui/material";
import {
  BooleanField,
  DateField,
  NumberField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import React from "react";
import Box from "@mui/material/Box";

export default function ValueDisplay({
  label,
  value,
  isDate = false,
  isColor = false,
}: {
  label: string;
  value: number | string | undefined | boolean;
  isDate?: boolean;
  isColor?: boolean;
}) {
  let valueDisplay: React.ReactNode | null = null;
  switch (typeof value) {
    case "string":
      valueDisplay = isDate ? (
        <DateField value={value} />
      ) : isColor ? (
        <Box bgcolor={value} width={50} height={50}></Box>
      ) : (
        <TextField value={value} />
      );

      break;
    case "number":
      valueDisplay = <NumberField value={value} />;
      break;
    case "boolean":
      valueDisplay = <BooleanField value={value} />;
      break;
    default:
      break;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight="bold">
        {label}
      </Typography>
      {valueDisplay}
    </Stack>
  );
}
