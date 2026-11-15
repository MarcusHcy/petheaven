// Top menu. On phones the links hide behind a Menu button.
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SOCIETY } from "../config.js";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About us" },
  { to: "/pets", label: "Our pets" },
  { to: "/join", label: "Join us" },
  { to: "/adopt", label: "Adopt" },
  { to: "/release", label: "Release a pet" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          🐾 {SOCIETY.name}
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        {/* NavLink adds the class "active" to the link of the page we are on */}
        <nav id="main-menu" className={open ? "nav-links open" : "nav-links"} aria-label="Main">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
