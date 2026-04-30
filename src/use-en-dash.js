const hyphenRegex = /(\d+)\s?(?:-|&hyphen;)\s?(\d+)/g;
const emDashRegex = /(\d+)\s?(?:—|&mdash;)\s?(\d+)/g;
const enDashSpacesRegex = /(\d+)\s(?:–|&ndash;)\s(\d+)/g;

function detectDash(context, node, str) {
  // Check for incorrect em-dash
  if (str.match(emDashRegex)) {
    context.report({
      node,
      message: `Prefer en-dash (–) over em-dash (—) for numeric ranges`,
      fix: (fixer) => {
        const replacement = str.replaceAll(emDashRegex, "$1–$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }

  // Check for incorrect hyphen
  if (str.match(hyphenRegex)) {
    context.report({
      node,
      message: `Prefer en-dash (–) over hyphen (-) for numeric ranges`,
      fix: (fixer) => {
        const replacement = str.replaceAll(hyphenRegex, "$1–$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }

  // Check for spaces
  if (str.match(enDashSpacesRegex)) {
    context.report({
      node,
      message: `Removes spaces around en-dash (–) for numeric ranges`,
      fix: (fixer) => {
        const replacement = str.replaceAll(enDashSpacesRegex, "$1–$2");
        return fixer.replaceText(node, replacement);
      }
    })
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect cases where an &ndash; (–) should be used instead of a &mdash; (—) or &hyphen; (-)",
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
