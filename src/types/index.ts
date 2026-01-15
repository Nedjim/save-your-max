import { Dayjs } from 'dayjs';

export type Item = {
  id: string;
  title: string;
  last_update: Dayjs;
  data: ItemValue[];
};

export type ItemValue = {
  id: string;
  date: Dayjs;
  charge: number;
  reps: number;
};
