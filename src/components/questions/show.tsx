import React from "react";
import { IAnswer, IChoice, IQuestion } from "../../utility/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dot from "@mui/icons-material/FiberManualRecord";
import { DeleteButton } from "@refinedev/mui";
import { BaseKey } from "@refinedev/core";
import { IResponse } from "../../pages/requests/list";

export default function QuestionShow({
  question,
  showChoiceCreateDrawer,
  setSelectedQuestion,
  answers,
  responses,
  choices,
}: {
  question: IQuestion;
  showChoiceCreateDrawer: (id?: BaseKey | undefined) => void;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<IQuestion | null>>;
  choices?: IChoice[];
  answers?: IAnswer[];
  responses?: IResponse[];
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
          flex={1}
        >
          <Stack gap={1} sx={{ width: "100%" }}>
            {choices && responses && answers && choices.length > 0 ? (
              choices.map((c) => {
                const totalResponses = responses.length;
                const totalChosen = answers.filter(
                  (answer) => answer.choice_id === c.id
                ).length;
                const percentage =
                  totalChosen > 0
                    ? Math.round((totalChosen / totalResponses) * 100 * 100) /
                      100
                    : 0;
                return (
                  <Stack
                    direction="row"
                    gap={2}
                    key={c.id}
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Typography>{c.choice_text}</Typography>
                    <Typography fontWeight="bold">
                      {totalChosen} / {totalResponses} ({percentage}%)
                    </Typography>
                  </Stack>
                );
              })
            ) : (
              <Typography>Please add some choices.</Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
