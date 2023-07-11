import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
  BooleanField,
} from "@refinedev/mui";
import QRCode from "react-qr-code";

import { Typography, Stack, Grid } from "@mui/material";
import Background from "../../components/request-card/background";
import { RequestCard } from "../../components/request-card";
import Box from "@mui/material/Box";
import ValueDisplay from "../../components/common/valueDisplay";

export const RequestShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const request = data?.data;

  return (
    <Show isLoading={isLoading}>
      {request && (
        <Box>
          <Box>
            <Background backgroundColor={request.background_color}>
              <RequestCard
                backgroundColor={request.background_color}
                title={request.title}
                address={request.address}
                acceptanceLabel={request.acceptance_label}
                rejectionLabel={request.rejection_label}
                closeDate={request.close_date}
                secondaryColor={request.secondary_color}
                primaryColor={request.primary_color}
                limit={request.limit}
                fontFamily={request.font_family}
                italicize={request.italicize}
              />
            </Background>
          </Box>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} lg={6}>
              <Stack spacing={2}>
                <Typography fontWeight={600} fontSize={24}>
                  Scan Me!
                </Typography>
                {request.id && <QRCode value={request.id as string} />}
              </Stack>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box>
                <Box mb={2}>
                  <Typography fontWeight={600} fontSize={24}>
                    Info
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                    <ValueDisplay label="ID" value={request.id} />
                  </Grid> */}
                  <Grid item xs={12}>
                    <ValueDisplay label="Title" value={request.title} />
                  </Grid>
                  <Grid item xs={12}>
                    <ValueDisplay label="Address" value={request.address} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Accept Label"
                      value={request.acceptance_label}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Reject Label"
                      value={request.rejection_label}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay label="Limit" value={request.limit} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Close Date"
                      value={request.close_date}
                      isDate
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Secondary Color"
                      value={request.secondary_color}
                      isColor
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Primary Color"
                      value={request.primary_color}
                      isColor
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="BG Color"
                      value={request.background_color}
                      isColor
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay label="Italicize" value={request.italicize} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ValueDisplay
                      label="Font Family"
                      value={request.font_family}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Show>
  );
};
