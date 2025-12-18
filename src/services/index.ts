import dayjs from 'dayjs';
import { Item } from '../types';

export const DATA: Item[] = [
  {
    id: '1',
    title: 'Deadlift',
    last_update: dayjs(),
    values: [{ date: dayjs(), charge: 60, reps: 5 }],
  },
  {
    id: '2',
    title: 'Push press',
    last_update: dayjs(),
    values: [{ date: dayjs(), charge: 40, reps: 2 }],
  },
  {
    id: '3',
    title: 'Hip thrust',
    last_update: dayjs(),
    values: [
      { date: dayjs(), charge: 150, reps: 1 },
      { date: dayjs(), charge: 130, reps: 2 },
    ],
  },
];
