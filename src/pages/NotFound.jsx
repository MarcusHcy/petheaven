// shown when someone goes to an address that doesn't exist
import { Link } from "react-router-dom";
import Notice from "../components/Notice.jsx";

export default function NotFound() {
  return (
    <section className="container section">
      <Notice type="error" title="Page not found">
        That page doesn't exist. <Link to="/">Go back home</Link>
      </Notice>
    </section>
  );
}
