import {
  useShow,
  IResourceComponentsProps,
  useDelete,
  useNotification,
  useMany,
  HttpError,
  useTable,
} from "@refinedev/core";
import { DateField, Show, useDataGrid } from "@refinedev/mui";
import QRCode from "react-qr-code";

import { Typography, Stack, Grid, Button, Divider } from "@mui/material";
import Background from "../../components/request-card/background";
import { RequestCard } from "../../components/request-card";
import Box from "@mui/material/Box";
import ValueDisplay from "../../components/common/valueDisplay";
import { useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IRequest, IResponse } from "./list";

import { useRef } from "react";
import html2canvas from "html2canvas";
import { useModalForm } from "@refinedev/react-hook-form";
import { IAnswer, IChoice, IQuestion, Nullable } from "../../utility/types";
import { CreateQuestionDrawer } from "../../components/questions/question-create-drawer";
import QuestionShow from "../../components/questions/show";
import { CreateChoiceDrawer } from "../../components/questions/choice-create-drawer";
import EmptyResourceMessage from "../../components/common/empty-resource-message";

export const RequestShow: React.FC<IResourceComponentsProps> = () => {
  const { mutate } = useDelete();
  const { open } = useNotification();
  const qrCodeRef = useRef(null);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );

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
  const { queryResult } = useShow<IRequest>();
  const { data, isLoading } = queryResult;
  const request = data?.data;

  const { dataGridProps: responseDataGridProps } = useDataGrid<IResponse>({
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

  // request drawer
  const questionCreateDrawerFormProps = useModalForm<
    IQuestion,
    HttpError,
    Nullable<IQuestion>
  >({
    refineCoreProps: { action: "create", resource: "questions" },
    syncWithLocation: true,
    warnWhenUnsavedChanges: false,
  });

  const {
    modal: { show: showQuestionCreateDrawer },
  } = questionCreateDrawerFormProps;

  // choice drawer
  const choiceCreateDrawerFormProps = useModalForm<
    IChoice,
    HttpError,
    Nullable<IChoice>
  >({
    refineCoreProps: { action: "create", resource: "choices" },
    syncWithLocation: true,
  });

  const {
    modal: { show: showChoiceCreateDrawer },
  } = choiceCreateDrawerFormProps;

  const { tableQueryResult: questionQueryResult } = useTable<
    IQuestion,
    HttpError
  >({
    resource: "questions",
    queryOptions: { enabled: !!request },
    filters: {
      permanent: [
        {
          field: "request_id",
          operator: "eq",
          value: request?.id,
        },
      ],
    },
  });

  const questions = questionQueryResult.data?.data;

  const { tableQueryResult: choicesQueryResult } = useTable<IChoice, HttpError>(
    {
      resource: "choices",
      queryOptions: { enabled: !!questions },
      filters: {
        permanent: [
          {
            field: "question_id",
            operator: "in",
            value: questions?.map((q) => q.id),
          },
        ],
      },
    }
  );

  const choices = choicesQueryResult.data?.data;

  const { tableQueryResult: answerQueryReseult } = useTable<IAnswer, HttpError>(
    {
      resource: "answers",
      queryOptions: { enabled: !!questions },
      filters: {
        permanent: [
          {
            field: "question_id",
            operator: "in",
            value: questions?.map((q) => q.id),
          },
        ],
      },
    }
  );

  const answers = answerQueryReseult.data?.data;

  const confirmedAttendeeResponses: IResponse[] = useMemo(
    () => responseDataGridProps.rows.filter((res) => res.accept),
    [responseDataGridProps]
  );
  const confirmedAttendeeAnswers = useMemo(
    () =>
      answers?.filter((answer) =>
        confirmedAttendeeResponses
          .map((res) => res.id)
          .includes(answer.response_id)
      ),
    [answers, confirmedAttendeeResponses]
  );

  console.log({ confirmedAttendeeAnswers, confirmedAttendeeResponses });

  return (
    <Show isLoading={isLoading}>
      {request && (
        <Box>
          <Box>
            <Background
              backgroundColor={request.background_color}
              background_gradient={request.background_gradient}
            >
              <RequestCard
                backgroundColor={request.background_color}
                title={request.title}
                address={request.address}
                acceptanceLabel={request.acceptance_label}
                rejectionLabel={request.rejection_label}
                closeDate={request.close_date}
                secondaryColor={request.secondary_color}
                secondary_gradient={request.secondary_gradient}
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
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Typography fontSize={24}>Questions</Typography>
              <Button
                onClick={() => showQuestionCreateDrawer()}
                variant="outlined"
              >
                Create Questions
              </Button>
            </Stack>
            {questions && questions.length ? (
              <Stack gap={2}>
                {questions.map((q) => (
                  <QuestionShow
                    key={q.id}
                    question={q}
                    showChoiceCreateDrawer={showChoiceCreateDrawer}
                    setSelectedQuestion={setSelectedQuestion}
                    answers={confirmedAttendeeAnswers?.filter(
                      (answer) => answer.question_id === q.id
                    )}
                    responses={confirmedAttendeeResponses}
                    choices={choices?.filter(
                      (choice) => choice.question_id === q.id
                    )}
                  />
                ))}
              </Stack>
            ) : (
              <EmptyResourceMessage message="No questions. Create some." />
            )}
          </Stack>
          <CreateQuestionDrawer
            showChoiceCreateDrawer={showChoiceCreateDrawer}
            drawerProps={questionCreateDrawerFormProps}
            request_id={request.id}
          />
          <CreateChoiceDrawer
            drawerProps={choiceCreateDrawerFormProps}
            question={selectedQuestion}
          />
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
