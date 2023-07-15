import React from "react";
import { CreateButton, List } from "@refinedev/mui";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import RequestListCard from "../../components/request-card/list-card";
import { IUser } from "../../components/header";
import { useGetIdentity } from "@refinedev/core";

export interface IRequest {
  id: string;
  background_color: string;
  title: string;
  address: string;
  acceptance_label: string;
  rejection_label: string;
  close_date: string;
  secondary_color: string;
  primary_color: string;
  limit: number;
  font_family: string;
  italicize: boolean;
  background_gradient: boolean;
  secondary_gradient: boolean;
  style: string;
}

export interface IResponse {
  id: string;
  responder_name: string;
  accepted_at: string;
  accept: boolean;
}

export const RequestList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  const { data } = useList<IRequest>({
    resource: "requests",
    queryOptions: {
      enabled: !!user,
    },
    filters: [
      {
        field: "user_id",
        operator: "eq",
        value: user?.id,
      },
    ],
  });

  const requests = data?.data;

  return (
    <List>
      {requests ? (
        requests.length > 0 ? (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {requests.map((req) => (
              <RequestListCard key={req.id} request={req} />
            ))}
          </Box>
        ) : (
          <Box
            padding={2}
            bgcolor="action.hover"
            borderRadius={2}
            minHeight={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Stack gap={4} alignItems="center">
              <Typography color="palette.text.primary">
                No RSVP requests. You can start creating one by pushing the
                "Create" button.
              </Typography>
              <CreateButton />
            </Stack>
          </Box>
        )
      ) : (
        <Box
          padding={2}
          bgcolor="action.hover"
          borderRadius={2}
          minHeight={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}
    </List>
  );
};
