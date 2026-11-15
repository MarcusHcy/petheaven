// Home page
// REQ: tells visitors what Pet Heaven is and where to go next
// EXTRA: hero banner with randomly switching pictures, featured pets, how-it-works steps
import { useMemo } from "react";
import { Link } from "react-router-dom";
import PETS from "../data/pets.js";
import { SOCIETY } from "../config.js";
import HeroCarousel from "../components/HeroCarousel.jsx";
import PetCard from "../components/PetCard.jsx";
import useFavourites from "../hooks/useFavourites.js";

// ADD YOUR PHOTOS: put 4 wide pictures in public/images/hero/ with these names
// (you can add more, just add another line here)
const HERO_SLIDES = [
  { src: "images/hero/hero-1.jpg", alt: "A rescued dog smiling at the camera" },
  { src: "images/hero/hero-2.jpg", alt: "A kitten resting in a volunteer's hands" },
  { src: "images/hero/hero-3.jpg", alt: "Dogs playing together in our garden" },
  { src: "images/hero/hero-4.jpg", alt: "A cat curled up on a soft blanket" },
];

const STEPS = [
  { title: "1. Find a pet", text: "Browse our pets and use the search to find one that suits you." },
  { title: "2. Join us", text: "Register as a member. It only takes a minute." },
  { title: "3. Send a request", text: "Fill in the adoption form for the pet you like." },
  { title: "4. Meet our team", text: "Our staff will interview you and arrange a visit." },
];

export default function Home() {
  const [favs, toggleFav] = useFavourites();

  // picks 3 random pets to show, only done once when the page loads
  const featured = useMemo(() => [...PETS].sort(() => Math.random() - 0.5).slice(0, 3), []);

  const dogCount = PETS.filter((p) => p.species === "Dog").length;
  const catCount = PETS.filter((p) => p.species === "Cat").length;

  return (
    <>
      {/* ---------- Hero banner ---------- */}
      <HeroCarousel slides={HERO_SLIDES}>
        <h1>{SOCIETY.tagline}</h1>
        <p>
          {SOCIETY.name} cares for abandoned cats and dogs until they find a loving home.
          Adopt a pet, release one safely, or become a supporter.
        </p>
        <div className="hero-buttons">
          <Link className="btn" to="/pets">Meet our pets</Link>
          <Link className="btn light" to="/join">Become a member</Link>
        </div>
      </HeroCarousel>

      {/* ---------- Numbers ---------- */}
      <section className="container stats" aria-label="Pets waiting for a home">
        <div><strong>{PETS.length}</strong><span>pets waiting</span></div>
        <div><strong>{dogCount}</strong><span>dogs</span></div>
        <div><strong>{catCount}</strong><span>cats</span></div>
      </section>

      {/* ---------- Featured pets ---------- */}
      <section className="container section">
        <h2>Pets looking for a home</h2>
        <div className="grid">
          {featured.map((pet) => (
            <PetCard key={pet.id} pet={pet} isFav={favs.includes(pet.id)} onToggleFav={toggleFav} />
          ))}
        </div>
        <p className="center">
          <Link className="btn outline" to="/pets">See all pets</Link>
        </p>
      </section>

      {/* ---------- How adoption works ---------- */}
      <section className="band">
        <div className="container">
          <h2>How adoption works</h2>
          <div className="steps">
            {STEPS.map((step) => (
              <div key={step.title} className="step">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Ways to help ---------- */}
      <section className="container section">
        <h2>Ways you can help</h2>
        <div className="grid">
          <div className="card card-body">
            <h3>Adopt</h3>
            <p>Give an abandoned pet a second chance.</p>
            <Link className="btn small" to="/adopt">Adoption form</Link>
          </div>
          <div className="card card-body">
            <h3>Release a pet</h3>
            <p>Can't keep your pet? Tell us and we will help find a safe new home.</p>
            <Link className="btn small" to="/release">Release form</Link>
          </div>
          <div className="card card-body">
            <h3>Become a supporter</h3>
            <p>Join as a member and help pay for food and vet care.</p>
            <Link className="btn small" to="/join">Join now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
