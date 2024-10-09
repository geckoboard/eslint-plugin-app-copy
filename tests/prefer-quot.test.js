const RuleTester = require("eslint").RuleTester;
const rule = require("../src/prefer-quot");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run("prefer-quot rule", rule, {
  valid: [
    { code: `const good = "Don’t"` },
    { code: `const good = "And then he said: 'hello'"` },
  ],
  invalid: [
    {
      code: `const bad = "Don't"`,
      errors: 1,
    },
    {
      code: "const bad = `Don't`",
      errors: 1,
    },
  ],
});
