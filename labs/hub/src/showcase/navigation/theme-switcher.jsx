import MoonIcon from "@assets/moon-stars.svg";
import SunIcon from "@assets/sun-high.svg";
// import { useState } from "react";
import { ReactSVG } from "react-svg";
import { radioSwitch } from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  /*
  const isDarkMode = useState(
    window.matchMedia("(prefers-color-scheme: dark)"),
  );
  const currentIcon = ...
  */
  return (
    <fieldset id="mode-switcher" className={radioSwitch}>
      <legend>Select a color mode:</legend>
      <input type="radio" name="mode" id="theme-switch-light" value="light" />
      <label htmlFor="theme-switch-light">
        <ReactSVG wrapper="span" className="injected-icon" src={SunIcon} />
      </label>
      <input type="radio" name="mode" id="theme-switch-dark" value="dark" />
      <label htmlFor="theme-switch-dark">
        <ReactSVG wrapper="span" className="injected-icon" src={MoonIcon} />
      </label>
    </fieldset>
  );
}
