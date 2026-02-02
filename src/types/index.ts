import { Dayjs } from 'dayjs';

export type Category = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

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
