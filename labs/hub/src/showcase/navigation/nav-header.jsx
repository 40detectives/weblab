import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Hamburger } from "./hamburger";
import {
  backdrop,
  homeLink,
  navContainer,
  navFlex,
  navLink,
  navList,
  navSearch,
  panelClose,
  panelOpen,
  stickyHeader,
} from "./nav-header.module.css";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  // { name: "Modern CSS Fundamentals", link: "#top", classes: homeLink },
  { name: "Project", link: "#project" },
  { name: "Exercises", link: "#exercises" },
  { name: "Source Code", link: "#source" },
  { name: "Course Site", link: "#course-site" },
];

export function NavHeader({ portalTarget }) {
  const mediaQuery = "(width <= 770px)";
  const isSmallScreen = useMediaQuery(mediaQuery);

  return (
    <header className={clsx(stickyHeader, navFlex)}>
      <Navbar
        key={isSmallScreen ? "mobile" : "desktop"}
        isSmallScreen={isSmallScreen}
        portalTarget={portalTarget}
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

function Navbar({ isSmallScreen, portalTarget }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("#top");

  useEffect(() => {
    function handleWindowClick(e) {
      console.log("yeah Window click!");
      console.log("target: ", e.target);
      if (
        e.target.classList.contains(stickyHeader) ||
        e.target.classList.contains(navList) ||
        e.target.closest("#mode-switcher") !== null
      ) {
        return;
      }
      setIsMobileOpen(false);
    }
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  const panelStatus = clsx(navList, isMobileOpen ? panelOpen : panelClose);

  function handleBurgerClick(event) {
    event.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  }

  function handleLinkClick(event) {
    setSelectedLink(event.target.getAttribute("href"));
  }

  return (
    <>
      <nav className={navContainer} id="main-nav">
        {isSmallScreen && (
          <Hamburger
            ariaControls={"main-nav"}
            onClick={handleBurgerClick}
            className={isMobileOpen ? "selected" : undefined}
          />
        )}
        <a
          href="#top"
          className={clsx(
            homeLink,
            navLink,
            ["#", "#top", ""].includes(selectedLink) ? "selected" : "",
          )}
          onClick={handleLinkClick}
          tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
        >
          Modern CSS Fundamentals
        </a>
        {isMobileOpen ? (
          createPortal(
            <>
              <div className={backdrop}></div>
              <NavList
                handleLinkClick={handleLinkClick}
                selectedLink={selectedLink}
                className={panelStatus}
              />
            </>,
            portalTarget.current,
          )
        ) : (
          <NavList
            handleLinkClick={handleLinkClick}
            selectedLink={selectedLink}
            className={panelStatus}
          />
        )}
      </nav>
    </>
  );
}

function NavList({ handleLinkClick, selectedLink, className }) {
  return (
    <ul className={className}>
      {navLinks.map((entry) => (
        <li key={entry.link}>
          <a
            tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
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
  );
}
