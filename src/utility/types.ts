export interface IQuestion {
  id: string;
  question_text: string;
  request_id: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
