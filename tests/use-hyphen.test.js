const RuleTester = require("eslint").RuleTester;
const rule = require("../src/use-hyphen");

// Useful for copying and pasting
// em-dash: —
// en-dash: –
// hyphen: -

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
  },
});

ruleTester.run("use-hyphen rule", rule, {
  valid: [
    { code: `"A good-hyphen"` },
    { code: `<span>A good-hyphen</span>` },
    { code: `"An good encoded&hyphen;"` },
  ],
  invalid: [
    {
      code: `"A bad–endash"`,
      output: `"A bad-endash"`,
      errors: 1,
    },
    {
      code: `"A bad—emdash"`,
      output: `"A bad-emdash"`,
      errors: 1,
    },
    {
      code: `<span>A bad—emdash in JSX</span>`,
      output: `<span>A bad-emdash in JSX</span>`,
      errors: 1,
    },
    {
      code: `"A bad encoded&ndash;endash"`,
      output: `"A bad encoded-endash"`,
      errors: 1,
    },
    {
      code: `"A bad encoded&mdash;emdash"`,
      output: `"A bad encoded-emdash"`,
      errors: 1,
    },
  ]
});
