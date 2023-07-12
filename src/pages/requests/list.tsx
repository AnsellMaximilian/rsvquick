import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Link } from "react-router-dom";
import RsvpIcon from "@mui/icons-material/Rsvp";
import { IconButton } from "@mui/material";

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
}

export interface IResponse {
  id: string;
  responder_name: string;
  accepted_at: string;
  accept: boolean;
}

export const RequestList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "address",
        flex: 1,
        headerName: "Address",
        minWidth: 200,
      },
      {
        field: "acceptance_label",
        flex: 1,
        headerName: "Acceptance Label",
        minWidth: 200,
      },
      {
        field: "rejection_label",
        flex: 1,
        headerName: "Rejection Label",
        minWidth: 200,
      },
      {
        field: "limit",
        flex: 1,
        headerName: "Limit",
        type: "number",
        minWidth: 200,
      },
      {
        field: "close_date",
        flex: 1,
        headerName: "Close Date",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
              <IconButton component={Link} to={`/r/${row.id}`} color="primary">
                <RsvpIcon />
              </IconButton>
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

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
