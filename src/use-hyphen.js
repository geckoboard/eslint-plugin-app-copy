const enDashRegex = /(\w*)(?:–|&ndash;)(\w*)/g;
const emDashRegex = /(\w*)(?:—|&mdash;)(\w*)/g;

function detectDash(context, node, str) {
  // Check for incorrect en-dash
  if (str.match(enDashRegex)) {
    context.report({
      node,
      message: `Prefer hyphen (-) over en-dash (–) for composite words`,
      fix: (fixer) => {
        const replacement = str.replaceAll(enDashRegex, "$1-$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }

  // Check for incorrect hyphen
  if (str.match(emDashRegex)) {
    context.report({
      node,
      message: `Prefer  hyphen (-) over em-dash (—) for composite words`,
      fix: (fixer) => {
        const replacement = str.replaceAll(emDashRegex, "$1-$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect cases where an &hyphen; (-) should be used instead of a &mdash; (—) or &ndash; (–)",
    },
    fixable: "code",
  },
  create: (context) => {
    return {
      Literal: (node) => {
        detectDash(context, node, node.raw);
      },
      JSXText: (node) => {
        detectDash(context, node, node.raw);
      },
      TemplateElement: (node) => {
        // See https://github.com/eslint/eslint/issues/16061.
        detectDash(context, node, context.getSourceCode().getText(node));
      },
    }
  }
}
