export interface IQuestion {
  id: string;
  question_text: string;
  request_id: string;
}

export interface IChoice {
  id: string;
  choice_text: string;
  question_id: string;
}

export interface IAnswer {
  id: string;
  question_id: string;
  response_id: string;
  choice_id: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
