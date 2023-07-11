import { Create } from "@refinedev/mui";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError, IResourceComponentsProps, useOne } from "@refinedev/core";
import { useEffect, useState } from "react";
import { RequestCard } from "../../components/request-card";
import fonts from "../../utility/fonts";
import dayjs from "../../utility/dayjs";
import Background from "../../components/request-card/background";
import { useParams } from "react-router-dom";
import { IRequest } from "../requests/list";

export const ResponseCreate: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne<IRequest, HttpError>({
    resource: "requests",
    id,
  });

  return data && id ? (
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
      />
    </Background>
  ) : (
    <h1>Wait</h1>
  );
};
