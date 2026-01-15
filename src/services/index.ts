import dayjs, { Dayjs } from 'dayjs';
import { Item } from '../types';

export const DATA: Item[] = [
  {
    id: '1',
    title: 'Deadlift',
    last_update: dayjs(),
    data: [{ id: '1-1', date: dayjs(), charge: 60, reps: 5 }],
  },
  {
    id: '2',
    title: 'Push press',
    last_update: dayjs(),
    data: [{ id: '2-1', date: dayjs(), charge: 40, reps: 2 }],
  },
  {
    id: '3',
    title: 'Hip thrust',
    last_update: dayjs(),
    data: [
      { id: '3-1', date: dayjs(), charge: 150, reps: 1 },
      { id: '3-2', date: dayjs(), charge: 130, reps: 2 },
    ],
  },
];

export const removeItem = (id: string) => {
  return DATA.filter((item) => item.id !== id);
};

type addItemParams = {
  name: string;
  charge: number;
  reps: number;
  date: Dayjs;
};

export const addItem = (params: addItemParams) => {
  const { name, charge, reps, date } = params;
  const newData = [...DATA];

  const formattedItem: Item = {
    id: '',
    title: name,
    last_update: date,
    data: [{ date: date, charge, reps, id: '' }],
  };

  return newData.push(formattedItem);
};
