// EXTRA: big picture banner that switches to a random picture every 5 seconds.
// - starts on a random picture
// - pauses while the mouse is over it
// - arrows and dots let the visitor change picture themselves
// - stays still if the visitor has "reduce motion" turned on
// Whatever is put between the tags (heading, buttons) shows on top of the pictures.
import { useState, useEffect } from "react";
import ImageSlot from "./ImageSlot.jsx";

export default function HeroCarousel({ slides, children }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * slides.length));
  const [paused, setPaused] = useState(false);

  // picks a random slide that is not the one already showing
  const randomNext = () => {
    setIndex((current) => {
      let next = current;
      while (next === current && slides.length > 1) {
        next = Math.floor(Math.random() * slides.length);
      }
      return next;
    });
  };

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  // timer that changes the picture
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    const timer = setInterval(randomNext, 5000);
    return () => clearInterval(timer); // clean up when paused or when leaving the page
  }, [paused]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Pictures of our pets"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* all pictures sit on top of each other, only the active one is visible */}
      {slides.map((slide, i) => (
        <div key={slide.src} className={i === index ? "hero-slide active" : "hero-slide"} aria-hidden={i !== index}>
          <ImageSlot src={slide.src} alt={slide.alt} ratio={null} />
        </div>
      ))}

      <div className="hero-shade" />
      <div className="container hero-content">{children}</div>

      <button className="hero-arrow left" onClick={goPrev} aria-label="Previous picture">‹</button>
      <button className="hero-arrow right" onClick={goNext} aria-label="Next picture">›</button>

      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            className={i === index ? "dot on" : "dot"}
            onClick={() => setIndex(i)}
            aria-label={`Show picture ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
