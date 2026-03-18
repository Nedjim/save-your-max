import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

export type ApiFetchType = {
  endpoint: string;
  body?: any;
  options?: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
};

export type Device = 'web' | 'ios' | 'android';

export type UserPayload = {
  email: string;
  password: string;
};

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

export type CreateItemParams = {
  charge: number;
  reps: number;
  date: CalendarDate;
};

export type UpdateItemParams = Partial<CreateItemParams> & { id: string };
