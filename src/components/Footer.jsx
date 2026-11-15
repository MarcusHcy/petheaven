// Bottom of every page: contact details and quick links
import { Link } from "react-router-dom";
import { SOCIETY } from "../config.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>🐾 {SOCIETY.name}</h3>
          <p>{SOCIETY.tagline}</p>
        </div>

        <div>
          <h3>Visit us</h3>
          <p>{SOCIETY.address}</p>
          <p>{SOCIETY.hours}</p>
          <p>{SOCIETY.phone}</p>
        </div>

        <div>
          <h3>Quick links</h3>
          <p><Link to="/pets">Our pets</Link></p>
          <p><Link to="/join">Become a member</Link></p>
          <p><Link to="/release">Release a pet</Link></p>
          <p><Link to="/inbox">Staff inbox</Link></p>
        </div>
      </div>

      <p className="footer-end">© {new Date().getFullYear()} {SOCIETY.name}. Student project for ISIT207.</p>
    </footer>
  );
}
