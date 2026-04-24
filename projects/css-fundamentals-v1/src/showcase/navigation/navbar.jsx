import { useState } from "react";
import {
  stickyHeader,
  navContainer,
  navList,
  navFlex,
  navSearch,
  navLink,
  homeLink,
} from "./navbar.module.css";
import { ThemeSwitcher } from "./theme-switcher";
import { clsx } from "clsx";
import { Hamburger } from "./hamburger";

const navLinks = [
  // { name: "Modern CSS Fundamentals", link: "#top", classes: homeLink },
  { name: "Project", link: "#project" },
  { name: "Exercises", link: "#exercises" },
  { name: "Source Code", link: "#source" },
  { name: "Course Site", link: "#course-site" },
];

export function Navbar() {
  const [selectedLink, setSelectedLink] = useState("#top");

  function handleLinkClick(event) {
    setSelectedLink(event.target.getAttribute("href"));
  }

  return (
    <header className={clsx(stickyHeader, navFlex)}>
      <Hamburger />
      <a
        href="#top"
        className={clsx(
          homeLink,
          navLink,
          ["#top", ""].includes(selectedLink) ? "selected" : "",
        )}
        onClick={handleLinkClick}
      >
        Modern CSS Fundamentals
      </a>
      <nav className={clsx(navContainer)} id="main-nav">
        <ul className={navList}>
          {navLinks.map((entry) => (
            <li key={entry.link}>
              <a
                onClick={handleLinkClick}
                href={entry.link}
                className={clsx(
                  selectedLink === entry.link ? "selected" : "",
                  navLink,
                )}
              >
                {entry.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <input
        size={18}
        type="search"
        name="lesson-search"
        id="lesson-search-input"
        className={navSearch}
      />
      <ThemeSwitcher />
    </header>
  );
}
