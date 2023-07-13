import {
  useShow,
  IResourceComponentsProps,
  useDelete,
  useNotification,
} from "@refinedev/core";
import { DateField, Show, useDataGrid } from "@refinedev/mui";
import QRCode from "react-qr-code";

import { Typography, Stack, Grid, Button, Divider } from "@mui/material";
import Background from "../../components/request-card/background";
import { RequestCard } from "../../components/request-card";
import Box from "@mui/material/Box";
import ValueDisplay from "../../components/common/valueDisplay";
import { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResponse } from "./list";

import { useRef } from "react";
import html2canvas from "html2canvas";

export const RequestShow: React.FC<IResourceComponentsProps> = () => {
  const { mutate } = useDelete();
  const { open } = useNotification();
  const qrCodeRef = useRef(null);

  const copyQRCodeAsImage = async () => {
    try {
      if (qrCodeRef.current) {
        const canvas = await html2canvas(qrCodeRef.current);
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
          }
        });
      }
      open?.({
        type: "success",
        key: "copy-success",
        message: "Success",
        description: "QR Code Copied to Clipboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        headerName: "Accept",
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
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  mutate({
                    resource: "responses",
                    id: row.id,
                  });
                }}
              >
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
    [mutate]
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
                responses={responseDataGridProps.rows as IResponse[]}
              />
            </Background>
          </Box>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} lg={6}>
              <Stack spacing={2}>
                <Typography fontWeight={600} fontSize={24}>
                  Scan Me!
                </Typography>
                {request.id && (
                  <Stack gap={2}>
                    <Box ref={qrCodeRef} width="min-content">
                      <QRCode value={request.id as string} />
                    </Box>
                    <Stack direction="row" gap={2}>
                      <Button onClick={copyQRCodeAsImage} variant="outlined">
                        Copy QR Code as Image
                      </Button>
                    </Stack>
                  </Stack>
                )}
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
          <Divider sx={{ my: 4 }} />
          <Stack gap={2}>
            <Typography fontWeight="bold" fontSize={24}>
              Responses{" "}
              {responseDataGridProps.rows.filter((row) => row.accept).length}/
              {request.limit}
            </Typography>
            <DataGrid
              columns={responseColumns}
              {...responseDataGridProps}
              autoHeight
            />
          </Stack>
        </Box>
      )}
    </Show>
  );
};
