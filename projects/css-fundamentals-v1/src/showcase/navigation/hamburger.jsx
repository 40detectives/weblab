import { hamburger, hamburgerInner, animArrow } from "./hamburger.module.css";
import { clsx } from "clsx";
export function Hamburger() {
  function handleBurgerClick(event) {
    event.currentTarget.classList.toggle("selected");
  }

  return (
    <button
      onClick={handleBurgerClick}
      className={clsx(hamburger, animArrow)}
      type="button"
      aria-label="Menu"
      aria-controls="main-nav"
    >
      <span className={hamburgerInner}></span>
    </button>
  );
}
