# eslint-plugin-app-copy

An ESLint plugin to enforce Geckoboard's in-house style guide for application copy.

## Installation

Assuming you already have ESLint installed in your project, simply run:

`npm install --save-dev https://github.com/geckoboard/eslint-plugin-app-copy@latest`

## Configuration

Within your `.eslintrc` file you'll need to add this plugin to the plugins section, and add the additional rules:

```
{
    plugins: ['app-copy'],
    rules: {
        'app-copy/no-apologies': 'warn',
        'app-copy/prefer-quot': 'error',
    }
}
```

## Rules

### no-apologies

This rule discourages the use of the word "sorry" in messages. Although it's sometimes included in user-facing error messages, most of the time we don't have any control over the cause of the error, so at Geckoboard we discourage its use.

#### valid
```
const stringLiteral = "Your upload failed. Please try again.";
```

#### invalid
```
const stringLiteral = "Sorry, your upload failed.";
const templateString = `We are sorry ${name}, but something went wrong!`;
```

### prefer-quot

This rule encourages the use of &quot (’) over &apos (') in text. This rule is **auto fixable**.

#### valid
```
const MyComponent = () => (<span>That’s Leo’s mug!</span>);
const stringLiteral = "You don’t have permission to do that!";
const templateString = `Fido is ${name}’s dog`;
```

#### invalid
```
const MyComponent = () => (<span>That's Leo's mug!</span>);
const stringLiteral = "You don't have permission to do that!";
const templateString = `Fido is ${name}'s dog`;
```
