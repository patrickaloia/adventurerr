const db = require('./server/db/db');
const { green, red } = require('chalk');
// const User = require('./db/models/user');
const { User, Exercise, UserExercise } = require('./server/db/models');
// const UserExercise = require('./db/models/userExercise');
const party = [
  {
    firstName: 'dave',
    lastName: 'dave2',
    level: 2,
    class: 'dog',
    alignment: 'neutral ass',
    strength: 13,
    dexterity: 13,
    constitution: 4,
    intelligence: 11,
    wisdom: 11,
    charisma: 3,
    successes: 10,
    failures: 1,
    description: 'loooooooooves the booty'
  }
]

const seed = async () => {
  // console.log(db);
  await db.sync({ force: true });

  await Party.bulkCreate(users);
  // await Exercise.bulkCreate(exercises);
  await Promise.all(party.map(partyMember => Party.create(partyMember)));

  console.log(green('Seeding success!'));
  await db.close();
};

seed().catch(err => {
  console.error(red('Oh no, something went wrong!'));
  console.error(err);
  db.close();
});