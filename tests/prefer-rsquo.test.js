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
    { code: `"I&rsquo;ve used an HTML entity here, which is fine as well"` },
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
      code: `const bad = "can&apos;t use the wrong HTML entity as a workaround"`,
      output: `const bad = "can’t use the wrong HTML entity as a workaround"`,
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
      code: `<span>You won&apos;t get away with it</span>`,
      output: `<span>You won’t get away with it</span>`,
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
