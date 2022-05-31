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

test('Trying to Encode Some Data with Raw Encode Method', () => {
  const result = OrbitEncoder.rawEncode(User);
  expect(typeof result).toBe('string');
});

test('Trying to Encode Some Data with Raw Encode UTF-16 Method', () => {
  const result = OrbitEncoder.rawEncodeUTF16(User);
  expect(typeof result).toBe('string');
});

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

test('Decoding With RawUTF16-EncLZ', () => {
  const result = OrbitEncoder.rawEncodeUTF16(User);

  expect(OrbitEncoder.rawDecodeUTF16(result)).toEqual(User);
});

test('Decoding With Raw-EncLZ', () => {
  const result = OrbitEncoder.rawEncode(User);

  expect(OrbitEncoder.rawDecode(result)).toEqual(User);
});

test('Decoding With Standards-Decode', () => {
  const result = OrbitEncoder.encode(User);

  expect(OrbitEncoder.decode(result)).toEqual(User);
});
