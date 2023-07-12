import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { DateField, Show, useDataGrid } from "@refinedev/mui";
import QRCode from "react-qr-code";

import { Typography, Stack, Grid, Button } from "@mui/material";
import Background from "../../components/request-card/background";
import { RequestCard } from "../../components/request-card";
import Box from "@mui/material/Box";
import ValueDisplay from "../../components/common/valueDisplay";
import { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const RequestShow: React.FC<IResourceComponentsProps> = () => {
  const responseColumns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 25,
      },
      {
        field: "accepted_at",
        flex: 1,
        headerName: "Accepted At",
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "responder_name",
        flex: 1,
        headerName: "Name",
        minWidth: 150,
      },
      {
        field: "accept",
        flex: 1,
        headerName: "accept",
        type: "boolean",
        minWidth: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <Button variant="contained" color="error">
                Dismiss
              </Button>
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ],
    []
  );
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const request = data?.data;

  const { dataGridProps: responseDataGridProps } = useDataGrid({
    resource: "responses",
    queryOptions: {
      enabled: !!request,
    },
    filters: {
      permanent: [
        {
          field: "request_id",
          operator: "eq",
          value: request?.id || "",
        },
      ],
    },
  });

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
                  <Grid item xs={12} md={6} lg={12}>
                    <ValueDisplay label="Title" value={request.title} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={12}>
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
          <DataGrid
            columns={responseColumns}
            {...responseDataGridProps}
            autoHeight
          />
        </Box>
      )}
    </Show>
  );
};
