const sorryRegex = /\bsorry\b/i;

function detectApologies(context, node, str) {
  if (str.match(sorryRegex)) {
    context.report({
      node,
      message: `Avoid saying "sorry" in user facing messages`,
    });
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect unwanted apologies in application copy",
    },
  },
  create: (context) => {
    return {
      Literal: (node) => {
        detectApologies(context, node, node.raw);
      },
      JSXText: (node) => {
        detectApologies(context, node, node.raw);
      },
      TemplateElement: (node) => {
        // See https://github.com/eslint/eslint/issues/16061.
        detectApologies(context, node, context.getSourceCode().getText(node));
      },
    };
  },
};
