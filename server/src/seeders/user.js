const { faker } = require("@faker-js/faker");
const User = require("../models/userModel");

const createUser = async (numUsers) => {
  try {
    const userPromise = [];
    for (let i = 0; i < numUsers; i++) {
      const tempUser = await User.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(10),
        password: "password",
      });

      userPromise.push(tempUser);
    }
    Promise.all(userPromise);
    console.log("User created", numUsers);
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = { createUser };
