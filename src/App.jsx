// REQ: puts all the pages together into one Single Page Application (SPA)
// Each <Route> below is one "page", but the browser never reloads
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Pets from "./pages/Pets.jsx";
import PetDetail from "./pages/PetDetail.jsx";
import Join from "./pages/Join.jsx";
import Adopt from "./pages/Adopt.jsx";
import Release from "./pages/Release.jsx";
import Inbox from "./pages/Inbox.jsx";
import NotFound from "./pages/NotFound.jsx";

// scrolls back to the top whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);;
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/join" element={<Join />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/release" element={<Release />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
