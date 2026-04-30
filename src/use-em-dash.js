const enDashRegex = /(\w*\s)(?:–|&ndash;)(\s\w*)/g;
const hyphenRegex = /(\w*\s)(?:--?-?|&hyphen;)(\s\w*)/g;

function detectDash(context, node, str) {
  // Check for incorrect en-dash
  if (str.match(enDashRegex)) {
    context.report({
      node,
      message: `Prefer em-dash (—) over en-dash (–)`,
      fix: (fixer) => {
        const replacement = str.replaceAll(enDashRegex, "$1—$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }

  // Check for incorrect hyphen
  if (str.match(hyphenRegex)) {
    context.report({
      node,
      message: `Prefer em-dash (—) over hyphen (-)`,
      fix: (fixer) => {
        const replacement = str.replaceAll(hyphenRegex, "$1—$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect cases where an &mdash; (—) should be used instead of a &hyphen; (-) or &ndash; (–)",
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
