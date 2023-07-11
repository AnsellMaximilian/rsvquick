import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
  BooleanField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import Background from "../../components/request-card/background";
import { RequestCard } from "../../components/request-card";
import Box from "@mui/material/Box";

export const RequestShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Box>
        <Background backgroundColor={record?.background_color}>
          <RequestCard
            backgroundColor={record?.background_color}
            title={record?.title}
            address={record?.address}
            acceptanceLabel={record?.acceptance_label}
            rejectionLabel={record?.rejection_label}
            closeDate={record?.close_date}
            secondaryColor={record?.secondary_color}
            primaryColor={record?.primary_color}
            limit={record?.limit}
            fontFamily={record?.font_family}
            italicize={record?.italicize}
          />
        </Background>
      </Box>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Address
        </Typography>
        <TextField value={record?.address} />
        <Typography variant="body1" fontWeight="bold">
          Acceptance Label
        </Typography>
        <TextField value={record?.acceptance_label} />
        <Typography variant="body1" fontWeight="bold">
          Rejection Label
        </Typography>
        <TextField value={record?.rejection_label} />
        <Typography variant="body1" fontWeight="bold">
          Limit
        </Typography>
        <NumberField value={record?.limit ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Close Date
        </Typography>
        <DateField value={record?.close_date} />
        <Typography variant="body1" fontWeight="bold">
          Secondary Color
        </Typography>
        <TextField value={record?.secondary_color} />
        <Typography variant="body1" fontWeight="bold">
          Primary Color
        </Typography>
        <TextField value={record?.primary_color} />
        <Typography variant="body1" fontWeight="bold">
          Background Color
        </Typography>
        <TextField value={record?.background_color} />
        <Typography variant="body1" fontWeight="bold">
          Italicize
        </Typography>
        <BooleanField value={record?.italicize} />
        <Typography variant="body1" fontWeight="bold">
          Font Family
        </Typography>
        <TextField value={record?.font_family} />
      </Stack>
    </Show>
  );
};
