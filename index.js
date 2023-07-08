const fs = require("fs/promises");
const path = require("path");

const pathJoin = path.join(__dirname, "db", "contacts.json");
const pathResolve = path.resolve("db", "contacts.json");
console.log("pathJoin", pathJoin);
console.log("pathResolve", pathResolve);
console.log("path.resolve", path.resolve());
console.log("__dirname", __dirname);

/**
 * test docs
 * @returns {Promise</void>}
 */
