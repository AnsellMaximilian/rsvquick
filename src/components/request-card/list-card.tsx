import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IRequest } from "../../pages/requests/list";
import ValueDisplay from "../common/valueDisplay";
import { Link } from "react-router-dom";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/mui";
import RsvpIcon from "@mui/icons-material/Rsvp";

interface Props {
  request: IRequest;
}

export default function RequestListCard({ request }: Props) {
  return (
    <Card elevation={3} sx={{ flex: 1, minWidth: 250 }}>
      <Box padding={2} bgcolor={request.secondary_color}>
        <Typography color={request.primary_color} fontWeight="bold">
          {request.title}
        </Typography>
      </Box>
      <Box padding={2}>
        <Stack>
          <Typography fontWeight="bold" fontSize={12}>
            Close Date
          </Typography>
          <Typography>{request.close_date}</Typography>
        </Stack>
        <Stack mt={2}>
          <Typography fontWeight="bold">Actions</Typography>
          <Stack gap={2} direction="row" alignItems="center">
            <EditButton hideText recordItemId={request.id} />
            <ShowButton hideText recordItemId={request.id} />
            <DeleteButton hideText recordItemId={request.id} />
            <IconButton
              component={Link}
              to={`/r/${request.id}`}
              color="primary"
            >
              <RsvpIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
