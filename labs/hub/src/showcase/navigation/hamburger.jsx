import { clsx } from "clsx";
import { animArrow, hamburger, hamburgerInner } from "./hamburger.module.css";
export function Hamburger({ ariaControls, onClick, className }) {
  return (
    <button
      tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
      onClick={onClick}
      className={clsx(hamburger, animArrow, className)}
      type="button"
      aria-label="Menu"
      aria-controls={ariaControls}
    >
      <span className={hamburgerInner}></span>
    </button>
  );
}
