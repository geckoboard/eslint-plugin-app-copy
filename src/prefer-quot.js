function hasApos(str) {
  return str.match(/\w'\w/);
}

const errorMessage = `Prefer quotes (’) over apostrophes (')`;

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
        if (hasApos(node.value)) {
          context.report({
            node,
            message: errorMessage,
          })
        }
      },
      TemplateElement: (node) => {
        if (hasApos(node.value.cooked)) {
          context.report({
            node,
            message: errorMessage,
          })
        }
      }
    };
  },
};
