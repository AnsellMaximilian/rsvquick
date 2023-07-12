import { HttpError, useOne, useTable } from "@refinedev/core";
import { RequestCard } from "../../components/request-card";
import Background from "../../components/request-card/background";
import { useParams } from "react-router-dom";
import { IRequest, IResponse } from "../requests/list";

export const ResponseCreate: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne<IRequest, HttpError>({
    resource: "requests",
    id,
  });

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

  return data && id && responseTableQueryResult.data ? (
    <Background backgroundColor={data.data.background_color} responseView>
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
      />
    </Background>
  ) : (
    <h1>Wait</h1>
  );
};
