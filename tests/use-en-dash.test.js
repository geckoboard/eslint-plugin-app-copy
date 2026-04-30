const RuleTester = require("eslint").RuleTester;
const rule = require("../src/use-en-dash");

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

ruleTester.run("use-en-dash rule", rule, {
  valid: [
    { code: `"A good 0–9 endash"` },
    { code: `<span>A good 0–9 endash in JSX</span>` },
    { code: `"A good encoded 0&ndash;9 endash"` },
  ],
  invalid: [
    {
      code: `"A hyphen 0-9"`,
      output: `"A hyphen 0–9"`,
      errors: 1,
    },
    {
      code: `"An emdash 0—9"`,
      output: `"An emdash 0–9"`,
      errors: 1,
    },
    {
      code: `"Correct dash but spaces 0 - 9"`,
      output: `"Correct dash but spaces 0–9"`,
      errors: 1,
    },
    {
      code: `<span>A hyphen in JSX 0-9</span>`,
      output: `<span>A hyphen in JSX 0–9</span>`,
      errors: 1,
    },
    {
      code: `"A bad encoded 0&mdash;9 emdash"`,
      output: `"A bad encoded 0–9 emdash"`,
      errors: 1,
    },
    {
      code: `"A bad encoded 0&hyphen;9 hyphen"`,
      output: `"A bad encoded 0–9 hyphen"`,
      errors: 1,
    },
  ]
});
