import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Hamburger } from "./hamburger";
import {
  backdrop,
  navContainer,
  navFlex,
  navFlexChild,
  navLink,
  navLinkHome,
  navList,
  navSearch,
  panelClose,
  panelOpen,
  stickyHeader,
} from "./nav-header.module.css";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  // { name: "Weblab Hub", link: "#top", classes: homeLink },
  { name: "Current Work", link: "#current-work" },
  { name: "Tech Stack", link: "#tech-stack" },
  { name: "Learning Paths", link: "#learning-paths" },
  { name: "Change Log", link: "#changelog" },
  // { name: "Portfolio", link: "#portfolio" },
];

export function NavHeader({ portalTarget }) {
  const mediaQuery = "(width <= 694px)";
  const isSmallScreen = useMediaQuery(mediaQuery);

  return (
    <header className={clsx(stickyHeader, navFlex)}>
      <Navbar
        key={isSmallScreen ? "mobile" : "desktop"}
        isSmallScreen={isSmallScreen}
        portalTarget={portalTarget}
      />
      <input
        // size={18}
        type="search"
        name="lesson-search"
        id="lesson-search-input"
        className={clsx(navSearch, navFlexChild)}
      />
      <ThemeSwitcher className={navFlexChild} />
    </header>
  );
}

function Navbar({ isSmallScreen, portalTarget }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("#top");

  useEffect(() => {
    function handleWindowClick(event) {
      console.log("yeah Window click!");
      console.log("target: ", event.target);
      if (
        event.target.classList.contains(stickyHeader) ||
        event.target.classList.contains(navList) ||
        event.target.closest("#mode-switcher") !== null
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
            navFlexChild,
            navLinkHome,
            navLink,
            ["#", "#top", ""].includes(selectedLink) ? "selected" : "",
          )}
          onClick={handleLinkClick}
          tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
        >
          Weblab Hub
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
        <li key={entry.link} className={navFlexChild}>
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
