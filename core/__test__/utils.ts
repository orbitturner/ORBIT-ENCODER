export function generateUsers(len: number) {
  let Users = [];
  const planetes = ['Earth', 'Mars', 'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  for (let i = 0; i < len; i++) {
    let nom = `Orbit-${i + 1}`;
    let age = Math.floor(Math.random() * 100) + 1;
    let planetId = Math.floor(Math.random() * planetes.length);
    let planet = {
      id: planetId + 1,
      codename: 'Shadow-Coders',
      galaxyName: 'Turner',
    };

    let objet = {
      name: nom,
      age: age,
      planet: planet,
    };

    Users.push(objet);
  }

  return Users;
}
