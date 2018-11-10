const Sequelize = require('sequelize');
const db = require('../db');

const Party = db.define('party', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.INTEGER
  },
  class: {
    type: Sequelize.STRING,
  },
  alignment: {
    type: Sequelize.STRING,
  },
  strength: {
    type: Sequelize.INTEGER
  },
  dexterity: {
    type: Sequelize.INTEGER
  },
  constitution: {
    type: Sequelize.INTEGER
  },
  intelligence: {
    type: Sequelize.INTEGER
  },
  wisdom: {
    type: Sequelize.INTEGER
  },
  charisma: {
    type: Sequelize.INTEGER
  },
  successes: {
    type: Sequelize.INTEGER
  },
  failures: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  uri: {
    type: Sequelize.STRING
  }
});

module.exports = Party;

// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };