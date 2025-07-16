import React, { useState, useEffect } from "react";
import useScrollDirection from "../../hooks/useScrollDirection";
import "./Header.css";

const Header = () => {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [activePage, setActivePage] = useState("ideas"); // Default active page
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active page based on URL path
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("about")) {
      setActivePage("about");
    } else if (path.includes("services")) {
      setActivePage("services");
    } else if (path.includes("careers")) {
      setActivePage("careers");
    } else if (path.includes("contact")) {
      setActivePage("contact");
    } else if (path.includes("work")) {
      setActivePage("work");
    } else {
      setActivePage("ideas"); // Default to ideas
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(".header__mobile-nav") &&
        !event.target.closest(".header__burger")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when scrolling
  useEffect(() => {
    if (mobileMenuOpen && scrollDirection === "down") {
      setMobileMenuOpen(false);
    }
  }, [scrollDirection, mobileMenuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`header ${
        scrollDirection === "down" ? "header--hidden" : ""
      } ${scrollY > 50 ? "header--scrolled" : ""}`}
    >
      <div className="header__container">
        <div className="header__logo">
          <img src="/logo.png" alt="Suitmedia" />
        </div>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <a
            href="/work"
            className={`header__nav-item ${
              activePage === "work" ? "header__nav-item--active" : ""
            }`}
          >
            Work
          </a>
          <a
            href="/about"
            className={`header__nav-item ${
              activePage === "about" ? "header__nav-item--active" : ""
            }`}
          >
            About
          </a>
          <a
            href="/services"
            className={`header__nav-item ${
              activePage === "services" ? "header__nav-item--active" : ""
            }`}
          >
            Services
          </a>
          <a
            href="/ideas"
            className={`header__nav-item ${
              activePage === "ideas" ? "header__nav-item--active" : ""
            }`}
          >
            Ideas
          </a>
          <a
            href="/careers"
            className={`header__nav-item ${
              activePage === "careers" ? "header__nav-item--active" : ""
            }`}
          >
            Careers
          </a>
          <a
            href="/contact"
            className={`header__nav-item ${
              activePage === "contact" ? "header__nav-item--active" : ""
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Burger Menu Button */}
        <button
          className={`header__burger ${
            mobileMenuOpen ? "header__burger--active" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`header__mobile-nav ${
            mobileMenuOpen ? "header__mobile-nav--open" : ""
          }`}
        >
          <nav className="header__mobile-nav-content">
            <a
              href="/work"
              className={`header__mobile-nav-item ${
                activePage === "work" ? "header__mobile-nav-item--active" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="/about"
              className={`header__mobile-nav-item ${
                activePage === "about" ? "header__mobile-nav-item--active" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/services"
              className={`header__mobile-nav-item ${
                activePage === "services"
                  ? "header__mobile-nav-item--active"
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="/ideas"
              className={`header__mobile-nav-item ${
                activePage === "ideas" ? "header__mobile-nav-item--active" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Ideas
            </a>
            <a
              href="/careers"
              className={`header__mobile-nav-item ${
                activePage === "careers"
                  ? "header__mobile-nav-item--active"
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </a>
            <a
              href="/contact"
              className={`header__mobile-nav-item ${
                activePage === "contact"
                  ? "header__mobile-nav-item--active"
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Overlay for mobile menu */}
        <div
          className={`header__mobile-overlay ${
            mobileMenuOpen ? "header__mobile-overlay--visible" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      </div>
    </header>
  );
};

export default Header;
