const RuleTester = require("eslint").RuleTester;
const rule = require("../src/no-apologies");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
  },
});

ruleTester.run("no-apologies rule", rule, {
  valid: [
    { code: `const good = "This is all good"` },
    { code: `const notSorry = "unsorry"` },
  ],
  invalid: [
    {
      code: `const apology = "Sorry"`,
      errors: 1,
    },
    {
      code: `const apology = "Oops, we are sorry, something went wrong"`,
      errors: 1,
    },
    {
      code: "const oops = `Sorry ${name} something went wrong!`",
      errors: 1,
    },
    {
      code: "<span>sorry that won’t work</span>",
      errors: 1,
    },
    {
      code: `const newLines = "sorry\\nwith\\nnew\\nlines";`,
      errors: 1,
    },
  ],
});
