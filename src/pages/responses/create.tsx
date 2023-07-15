import { HttpError, useOne, useTable } from "@refinedev/core";
import { RequestCard } from "../../components/request-card";
import Background from "../../components/request-card/background";
import { useParams } from "react-router-dom";
import { IRequest, IResponse } from "../requests/list";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { IChoice, IQuestion } from "../../utility/types";
import { CircularProgress } from "@mui/material";

export const ResponseCreate: React.FC = () => {
  const { id } = useParams();

  const { data } = useOne<IRequest, HttpError>({
    resource: "requests",
    id,
  });

  useDocumentTitle(`${data?.data?.title} | RSVQuick`);

  const request = data?.data;
  const { tableQueryResult: responseTableQueryResult } = useTable<
    IResponse,
    HttpError
  >({
    resource: "responses",
    queryOptions: {
      enabled: !!data?.data,
    },
    filters: {
      permanent: [
        {
          field: "request_id",
          operator: "eq",
          value: data?.data?.id || "",
        },
      ],
    },
  });

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

  return data && id && responseTableQueryResult.data ? (
    <Background
      backgroundColor={data.data.background_color}
      responseView
      background_gradient={data.data.background_gradient}
    >
      <RequestCard
        backgroundColor={data.data.background_color}
        title={data.data.title}
        address={data.data.address}
        acceptanceLabel={data.data.acceptance_label}
        rejectionLabel={data.data.rejection_label}
        closeDate={data.data.close_date}
        secondaryColor={data.data.secondary_color}
        primaryColor={data.data.primary_color}
        limit={data.data.limit}
        fontFamily={data.data.font_family}
        italicize={data.data.italicize}
        requestId={id}
        responses={responseTableQueryResult.data.data}
        secondary_gradient={data.data.secondary_gradient}
        style={data.data.style}
        surveys={questions?.map((q) => ({
          question: q,
          choices: choices?.filter((c) => c.question_id === q.id) || [],
        }))}
      />
    </Background>
  ) : (
    <Background backgroundColor="background.default" responseView>
      <CircularProgress />
    </Background>
  );
};
