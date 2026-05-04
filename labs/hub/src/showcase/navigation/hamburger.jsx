import { clsx } from "clsx";
import { animArrow, hamburger, hamburgerInner } from "./hamburger.module.css";
export function Hamburger({ ariaControls, onToggle }) {
  function handleBurgerClick(event) {
    event.currentTarget.classList.toggle("selected");
    onToggle();
  }

  return (
    <button
      tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
      onClick={handleBurgerClick}
      className={clsx(hamburger, animArrow)}
      type="button"
      aria-label="Menu"
      aria-controls={ariaControls}
    >
      <span className={hamburgerInner}></span>
    </button>
  );
}
