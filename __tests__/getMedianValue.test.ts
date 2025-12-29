import { getMedianValue } from '../api/users/stats';

describe('getMedianValue', () => {
  it('should return correct median value', () => {
    const even = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const odd = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(getMedianValue(odd)).toBe(5);
    expect(getMedianValue(even)).toBe(5.5);
  });
});
