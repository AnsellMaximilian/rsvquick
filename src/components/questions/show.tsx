import React from "react";
import { IChoice, IQuestion } from "../../utility/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dot from "@mui/icons-material/FiberManualRecord";
import { DeleteButton } from "@refinedev/mui";
import { BaseKey } from "@refinedev/core";

export default function QuestionShow({
  question,
  showChoiceCreateDrawer,
  setSelectedQuestion,
  choices,
}: {
  question: IQuestion;
  showChoiceCreateDrawer: (id?: BaseKey | undefined) => void;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<IQuestion | null>>;
  choices?: IChoice[];
}) {
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
          <Button
            size="small"
            onClick={() => {
              setSelectedQuestion(question);
              showChoiceCreateDrawer();
            }}
          >
            Create Choices
          </Button>
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
            {choices && choices.length > 0 ? (
              choices.map((c) => (
                <Stack direction="row" gap={2} key={c.id}>
                  <Typography>{c.choice_text}</Typography>
                  <Typography fontWeight="bold">50%</Typography>
                </Stack>
              ))
            ) : (
              <Typography>Please add some choices.</Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
