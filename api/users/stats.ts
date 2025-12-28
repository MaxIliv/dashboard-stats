import type { VercelRequest, VercelResponse } from '@vercel/node';

type Response = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
type User = {
  id: number;
  age: number;
};

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  let response: Response = await fetch(
    'https://dummyjson.com/users?limit=0'
  ).then((res) => res.json());

  res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );

  res.status(200).json({
    total: 200,
    medianAge: 32,
    users: response?.total ?? 0,
  });
}
