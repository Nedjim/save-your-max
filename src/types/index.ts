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

export type CreateItemPayload = {
  charge: number;
  reps: number;
};
