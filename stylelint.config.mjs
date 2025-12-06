/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-hudochenkov/order",
    "@stylistic/stylelint-config",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "value-keyword-case": [
      "lower",
      {
        camelCaseSvgKeywords: true,
        ignoreKeywords: ["/A[3|4|5]|(JIS-)?B[4|5]/"],
      },
    ],
    "comment-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["stylelint-commands", "after-comment"],
        ignoreComments: ["/^[a-z-]*:.*;$/"],
      },
    ],
    "property-no-vendor-prefix": [
      true,
      { ignoreProperties: ["text-size-adjust"] },
    ],
    "@stylistic/selector-list-comma-newline-after": null,
  },
};
