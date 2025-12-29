import { User } from '../types';
import { calculateMedianAge } from '../api/users/stats';

const usersSorted: User[] = [
  {
    id: 1,
    age: 18,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 2,
    age: 20,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 3,
    age: 24,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 4,
    age: 27,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 5,
    age: 32,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 6,
    age: 35,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 7,
    age: 60,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
];
const usersEvenSorted: User[] = [
  {
    id: 1,
    age: 18,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 2,
    age: 20,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 3,
    age: 24,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 4,
    age: 27,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 5,
    age: 32,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 6,
    age: 35,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 7,
    age: 60,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
  },
  {
    id: 8,
    age: 80,
    height: 0,
    weight: 0,
    email: '',
    eyeColor: ''
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
