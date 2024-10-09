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
  valid: [],
  invalid: [
    {
      code: `const apology = "Sorry"`,
      errors: 1,
    }
  ],
});
