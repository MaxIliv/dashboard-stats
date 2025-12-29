import { User } from '../types';
import { calculateMedianAge } from '../api/users/stats';

const usersSorted: User[] = [
  {
    id: 1,
    age: 18,
  },
  {
    id: 2,
    age: 20,
  },
  {
    id: 3,
    age: 24,
  },
  {
    id: 4,
    age: 27,
  },
  {
    id: 5,
    age: 32,
  },
  {
    id: 6,
    age: 35,
  },
  {
    id: 7,
    age: 60,
  },
];
const usersEvenSorted: User[] = [
  {
    id: 1,
    age: 18,
  },
  {
    id: 2,
    age: 20,
  },
  {
    id: 3,
    age: 24,
  },
  {
    id: 4,
    age: 27,
  },
  {
    id: 5,
    age: 32,
  },
  {
    id: 6,
    age: 35,
  },
  {
    id: 7,
    age: 60,
  },
  {
    id: 8,
    age: 80,
  },
];

const usersRandomlySorted = usersSorted.toSorted(() => (Math.random() > 0.5 ? 1 : -1));
const usersEvenRandomlySorted = usersEvenSorted.toSorted(() => (Math.random() > 0.5 ? 1 : -1));

describe('calculateMedianAge', () => {
  it('should calculate users median age correctly', () => {
    expect(calculateMedianAge(usersRandomlySorted)).toBe(27);
    expect(calculateMedianAge(usersEvenRandomlySorted)).toBe(29.5);
  });
});
