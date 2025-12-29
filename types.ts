export type Response = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
export type User = {
  id: number;
  age: number;
};
