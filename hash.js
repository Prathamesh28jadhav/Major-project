// hash.js  OR  createAdmin.js
const bcrypt = require("bcryptjs");

const password = "Admin@123";

bcrypt.hash(password, 10).then((hashedPassword) => {
    console.log("Hashed Password:", hashedPassword);
});
