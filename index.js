require = require("esm")(module);
const index = require("./src/index.js");
const random = require("./src/utils/random.js");
const exportModule = {
  ...index,
  random,
};

module.exports = exportModule;

