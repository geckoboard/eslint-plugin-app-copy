const RuleTester = require("eslint").RuleTester;
const rule = require("../src/use-em-dash");

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

ruleTester.run("use-em-dash rule", rule, {
  valid: [
    { code: `"A good — dash"` },
    { code: `"An encoded &mdash; dash"` },
    { code: `<span>A good — dash in JSX</span>` },
    { code: `"A mid-word hyphen is ok!"` },
    { code: `"A numerical 0–9 range is also ok!"` },
    { code: `"A numerical range with spaces 0 – 9"` },
  ],
  invalid: [
    {
      code: `"A bad - hyphen"`,
      output: `"A bad — hyphen"`,
      errors: 1,
    },
    {
      code: `<span>A bad - hyphen in JSX</span>`,
      output: `<span>A bad — hyphen in JSX</span>`,
      errors: 1,
    },
    {
      code: `"A bad encoded &hyphen; hyphen"`,
      output: `"A bad encoded — hyphen"`,
      errors: 1,
    },
    {
      code: `"A bad – endash"`,
      output: `"A bad — endash"`,
      errors: 1,
    },
    {
      code: `"A bad encoded &ndash; endash"`,
      output: `"A bad encoded — endash"`,
      errors: 1,
    },
    {
      code: `"no double -- dashes"`,
      output: `"no double — dashes"`,
      errors: 1,
    },
    {
      code: `"no triple --- dashes"`,
      output: `"no triple — dashes"`,
      errors: 1,
    }
  ]
});
