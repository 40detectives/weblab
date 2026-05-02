import { clsx } from "clsx";
import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Hamburger } from "./hamburger";
import {
  homeLink,
  navContainer,
  navFlex,
  navLink,
  navList,
  navSearch,
  panelClose,
  panelOpen,
  stickyHeader,
} from "./navbar.module.css";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  // { name: "Modern CSS Fundamentals", link: "#top", classes: homeLink },
  { name: "Project", link: "#project" },
  { name: "Exercises", link: "#exercises" },
  { name: "Source Code", link: "#source" },
  { name: "Course Site", link: "#course-site" },
];

export function NavHeader() {
  const mediaQuery = "(width <= 770px)";
  const isSmallScreen = useMediaQuery(mediaQuery);

  return (
    <header className={clsx(stickyHeader, navFlex)}>
      <Navbar
        key={isSmallScreen ? "mobile" : "desktop"}
        isSmallScreen={isSmallScreen}
      />
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

function Navbar({ isSmallScreen }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("#top");

  const toggleSideBar = () => setIsMobileOpen((prev) => !prev);

  function handleLinkClick(event) {
    setSelectedLink(event.target.getAttribute("href"));
  }

  return (
    <nav className={navContainer} id="main-nav">
      {isSmallScreen && (
        <Hamburger ariaControls={"main-nav"} onToggle={toggleSideBar} />
      )}
      <a
        href="#top"
        className={clsx(
          homeLink,
          navLink,
          ["#", "#top", ""].includes(selectedLink) ? "selected" : "",
        )}
        onClick={handleLinkClick}
      >
        Modern CSS Fundamentals
      </a>
      <ul className={clsx(navList, isMobileOpen ? panelOpen : panelClose)}>
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
  );
}
