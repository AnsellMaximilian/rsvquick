import React from "react";
import { IQuestion } from "../../utility/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dot from "@mui/icons-material/FiberManualRecord";
import { DeleteButton } from "@refinedev/mui";

export default function QuestionShow({ question }: { question: IQuestion }) {
  return (
    <Box bgcolor="action.hover" p={2} borderRadius={2}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography fontSize={20} fontStyle="italic">
            {question.question_text}
          </Typography>
        </Box>
        <Stack direction="row" gap={2} alignItems="center">
          <Button size="small">Create Choices</Button>
          <DeleteButton
            hideText
            resource="questions"
            recordItemId={question.id}
          />
        </Stack>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <Box
          paddingX={2}
          paddingY={1}
          borderLeft={4}
          borderColor="primary.main"
          ml={1}
        >
          <Stack gap={1}>
            <Stack direction="row" gap={2}>
              <Typography>No I don't think so</Typography>
              <Typography fontWeight="bold">50%</Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography>No I don't think so</Typography>
              <Typography fontWeight="bold">50%</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
