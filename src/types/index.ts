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

export type Exercise = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Performance = {
  id: string;
  date: Date;
  charge: number;
  reps: number;
  createdAt: Date;
  updatedAt: Date;
  exerciceId: string;
};

export type CreatePerformanceParams = {
  charge: number;
  reps: number;
  date: CalendarDate;
};

export type UpdatePerformanceParams = Partial<CreatePerformanceParams> & {
  id: string;
};
