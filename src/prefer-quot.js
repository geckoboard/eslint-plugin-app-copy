const aposRegex = /(\w)'(\w)/g;

function detectApos(context, node, str) {
  const matches = str.matchAll(aposRegex);

  for (const match of matches) {
    context.report({
      node,
      message: `Prefer quotes (’) over apostrophes (')`,
      fix: (fixer) => {
        const replacement = str.replaceAll(aposRegex, '$1’$2');
        return fixer.replaceText(node, replacement);
      },
    });
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect strings with &apos; (') instead of &quot; (’)",
    },
    fixable: "code",
  },
  create: (context) => {
    return {
      Literal: (node) => {
        detectApos(context, node, node.raw);
      },
      JSXText: (node) => {
        detectApos(context, node, node.raw);
      },
      TemplateElement: (node) => {
        // See https://github.com/eslint/eslint/issues/16061.
        detectApos(context, node, context.getSourceCode().getText(node));
      },
    };
  },
};
