import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Response, User } from '../../types';


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
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  let response: Response = (await fetch(
    'https://dummyjson.com/users?limit=0&select=age,height,weight,eyeColor'
  ).then((res) => res.json())) as Response;

  const medianAge = calculateMedianAge(response.users);

  res.setHeader('Access-Control-Allow-Origin', '*'); // or specific origin

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  );

  res.status(200).json({
    total: 200,
    medianAge,
    users: response?.total ?? 0,
  });
}
