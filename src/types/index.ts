import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export type Category = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Item = {
  id: string;
  date: Date;
  charge: number;
  reps: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
};

export type ItemModalMode = 'CREATE' | 'UPDATE' | 'DELETE';

export type CreateItemPayload = {
  charge: number;
  reps: number;
  date: CalendarDate;
};

export type UpdateItemPayload = Partial<CreateItemPayload> & { id: string };
