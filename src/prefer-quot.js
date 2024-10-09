module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect strings with &apos; (') instead of &quot; (’)",
    },
  },
  create: (context) => {
    return {
      Literal: (node) => {
        if (node.value.indexOf(`'`) !== -1) {
          context.report({
            node,
            message: `Prefer quotes (’) over apostrophes (')`,
          })
        }
      },
    };
  },
};
