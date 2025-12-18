import { Dayjs } from "dayjs";

export type Item = {
  id: string;
  title: string;
  last_update: Dayjs;
  values: ItemValue[];
};

export type ItemValue = {
  date: Dayjs;
  charge: number;
  reps: number;
};
