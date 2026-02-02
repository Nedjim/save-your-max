import dayjs from 'dayjs';
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


// type addItemParams = {
//   name: string;
//   charge: number;
//   reps: number;
//   date: Dayjs;
// };

// export async function addCategory(title: string) {
//   const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/categories`;
//   const res = await fetch(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title }),
//   });
// }
