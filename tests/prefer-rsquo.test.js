const RuleTester = require("eslint").RuleTester;
const rule = require("../src/prefer-rsquo");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
  },
});

ruleTester.run("prefer-quot rule", rule, {
  valid: [
    { code: `const good = "Don’t"` },
    { code: `const good = "And then he said: 'hello'"` },
    { code: `<span>I’m just some regular text</span>` },
  ],
  invalid: [
    {
      code: `const bad = "Don't"`,
      output: `const bad = "Don’t"`,
      errors: 1,
    },
    {
      code: "const bad = `Won't`",
      output: "const bad = `Won’t`",
      errors: 1,
    },
    {
      code: "const bad = `you're ${name}`;",
      output: "const bad = `you’re ${name}`;",
      errors: 1,
    },
    {
      code: "const bad = `${foo}: it's ${bar}`;",
      output: "const bad = `${foo}: it’s ${bar}`;",
      errors: 1,
    },
    {
      code: "const bad = `${name} is Alice's dog`;",
      output: "const bad = `${name} is Alice’s dog`;",
      errors: 1,
    },
    {
      code: `<span>You're welcome</span>`,
      output: `<span>You’re welcome</span>`,
      errors: 1,
    },
    {
      code: `<span prop="It's nice to see you">Hello</span>`,
      output: `<span prop="It’s nice to see you">Hello</span>`,
      errors: 1,
    },
    {
      code: `<span>That's Leo's mug!</span>`,
      output: `<span>That’s Leo’s mug!</span>`,
      errors: 1,
    },
    {
      code: `const bad = "don't\\ncan't\\nwon't";`,
      output: `const bad = "don’t\\ncan’t\\nwon’t";`,
      errors: 1,
    },
    {
      code: `const bad = \`
      don't
      can't
      won't\`;`,
      output: `const bad = \`
      don’t
      can’t
      won’t\`;`,
      errors: 1,
    },
  ],
});
