/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-hudochenkov/order",
    "@stylistic/stylelint-config",
  ],
  plugins: ["stylelint-order"],
};
