function detectApos(context, node, str) {
  if (str.match(/\w'\w/)) {
    context.report({
      node,
      message: `Prefer quotes (’) over apostrophes (')`,
    });
  }
}

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
        detectApos(context, node, node.value);
      },
      JSXText: (node) => {
        detectApos(context, node, node.value);
      },
      TemplateElement: (node) => {
        detectApos(context, node, node.value.cooked);
      },
    };
  },
};
