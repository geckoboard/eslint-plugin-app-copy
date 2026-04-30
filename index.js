const NoApologies = require("./src/no-apologies");
const PreferRsquo = require("./src/prefer-rsquo");
const UseEMDash = require("./src/use-em-dash");
const UseENDash = require("./src/use-en-dash");
const UseHyphen = require("./src/use-hyphen");

module.exports = {
  rules: {
    "no-apologies": NoApologies,
    "prefer-rsquo": PreferRsquo,
    "use-em-dash": UseEMDash,
    "use-en-dash": UseENDash,
    "use-hyphen": UseHyphen,
  }
};
