import { VercelRequest, VercelResponse } from '@vercel/node';
import { Response } from '../../types';

type User = {
  birthDate: string;
};

export const fetchUsersData = () =>
  fetch('https://dummyjson.com/users?limit=0&select=birthDate').then((res) =>
    res.json()
  );

type Data = {
  year: number;
  users: number;
};

const prepareChartData = (data: User[]): Data[] => {
  const map = new Map<number, number>();

  data.forEach((user) => {
    const year = Number(user.birthDate.substring(0, 4));
    map.set(year, (map.get(year) ?? 0) + 1);
  });

  const res: Data[] = [];

  map.forEach((users, year) => {
    res.push({ year, users });
  });

  res.sort((a, b) => a.year - b.year)

  return res;
};

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );

  let response: Response<User> = (await fetchUsersData()) as Response<User>;

  const data = prepareChartData(response.users);

  res.status(200).json(data);
}
