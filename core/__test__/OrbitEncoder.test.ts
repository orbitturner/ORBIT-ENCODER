import { OrbitEncoder } from '../OrbitEncoder';

const User = {
    "name": "Orbit",
    "age": 21,
    "planet": {
        "id": 4,
        "codename" : "Shadow-Coders",
        "galaxyName" : "Turner"
    }   
};

test('Trying to Encode Some Data with Encode Method', () => {
    const result = OrbitEncoder.encode(User);
    expect(typeof OrbitEncoder.encode(User)).toBe('string');
});

test('Decoding Some Data', () => {
    const result = OrbitEncoder.encode(User);
    expect(OrbitEncoder.decode(result)).toEqual(User);
});