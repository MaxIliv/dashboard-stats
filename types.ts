export type Response<User> = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type User = {
  id: number;
  age: number;
  height: number;
  weight: number;
  email: string;
  eyeColor: string;
};
