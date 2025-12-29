import { VercelRequest, VercelResponse } from '@vercel/node';
import { Response } from '../../types';

type User = {
  birthDate: string;
}

export const fetchUsersData = () =>
  fetch(
    'https://dummyjson.com/users?limit=0&select=birthDate'
  ).then((res) => res.json());


type Data = {
  year: string;
  count: number;
}

const prepareChartData = (data: User[]): Data[] => {
  const map = new Map<string, number>();

  data.forEach((user) => {
    const year = user.birthDate.substring(0, 4);
    map.set(year, (map.get(year) ?? 0) + 1);
  })

  const res: Data[] = [];

  map.forEach((count, year) => {
    res.push({ year, count })
  })

  return res;
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {

  let response: Response<User> = await fetchUsersData() as Response<User>;

  const data = prepareChartData(response.users);


  res.status(200).json(data);
}
