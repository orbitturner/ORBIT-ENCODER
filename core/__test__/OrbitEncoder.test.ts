import { OrbitEncoder } from '../OrbitEncoder';

const User = {
  name: 'Orbit',
  age: 21,
  planet: {
    id: 4,
    codename: 'Shadow-Coders',
    galaxyName: 'Turner',
  },
};

test('Trying to Encode Some Data with Encode Method', () => {
  const result = OrbitEncoder.encode(User);
  expect(typeof result).toBe('string');
});

test('Trying to Encode With URI SAFE', () => {
  const result = OrbitEncoder.encodeWithURIsafe(User);
  expect(typeof result).toBe('string');
});

test('Decoding With URI SAFE', () => {
  const result = OrbitEncoder.encodeWithURIsafe(User);

  expect(OrbitEncoder.decodeURIsafe(result)).toEqual(User);
});
