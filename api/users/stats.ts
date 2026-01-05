import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Response, User } from '../../types';

export const fetchUsersData = () =>
  fetch(
    'https://dummyjson.com/users?limit=0&select=age,height,weight,eyeColor,email'
  ).then((res) => res.json());

export const getMostFreqItem = (data: string[]) => {
  const freqMap = new Map<string, number>();

  data.forEach((color) => {
    freqMap.set(color, (freqMap.get(color) ?? 0) + 1);
  });

  let res = '';
  let max = 0;

  freqMap.forEach((value, key) => {
    if (max < value) {
      max = value;
      res = key;
    }
  });

  return { res, max };
};

export const calculateAverage = (data: number[]) => {
  return data.reduce((acc, el) => acc + el) / data.length;
};

export const calculateMedianAge = (data: User[]) => {
  const ageArray = data.map((user) => user.age).sort((a, b) => a - b);

  return getMedianValue(ageArray);
};

export const getMedianValue = (data: any[]) => {
  const len = data.length;

  // even
  if (len % 2 === 0) {
    const middle = Math.floor(len / 2);
    const prev = middle - 1;

    return (data[middle] + data[prev]) / 2;
  }

  const middle = Math.floor(len / 2);

  return data[middle];
};

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  let response: Response<User> = (await fetchUsersData()) as Response<User>;

  const medianAge = calculateMedianAge(response.users);
  const averageHeight = calculateAverage(
    response.users.map((user) => user.height)
  );
  const averageWeight = calculateAverage(
    response.users.map((user) => user.weight)
  );
  const averageEmailLength = calculateAverage(
    response.users.map((user) => user.email?.length || 0)
  );
  const { res: mostFrequentEyeColor, max: mostFrequentEyeColorCount } =
    getMostFreqItem(response.users.map((user) => user.eyeColor));

  res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );

  res.status(200).json({
    total: 200,
    medianAge,
    users: response?.total ?? 0,
    averageHeight,
    averageWeight,
    averageEmailLength,
    mostFrequentEyeColor,
    mostFrequentEyeColorCount,
  });
}
