// REUSABLE: one pet in the list. Used on the Home page, the Pets page and the pet details page.
import { Link } from "react-router-dom";
import ImageSlot from "./ImageSlot.jsx";
import { ageLabel } from "../utils/petHelpers.js";

export default function PetCard({ pet, isFav, onToggleFav }) {
  return (
    <article className="card pet-card">
      <Link to={`/pets/${pet.id}`} aria-label={`See details for ${pet.name}`}>
        <ImageSlot src={`images/pets/${pet.image}.jpg`} alt={`${pet.name}, a ${pet.breed}`} />
      </Link>

      {/* heart button, the favourites are saved in the browser */}
      <button
        className={isFav ? "heart on" : "heart"}
        aria-pressed={isFav}
        aria-label={isFav ? `Remove ${pet.name} from favourites` : `Add ${pet.name} to favourites`}
        onClick={() => onToggleFav(pet.id)}
      >
        {isFav ? "♥" : "♡"}
      </button>

      <div className="card-body">
        <h3>
          {pet.species === "Dog" ? "🐶" : "🐱"} {pet.name}
        </h3>
        <p className="muted">{pet.breed}</p>
        <p>
          {ageLabel(pet.age)} · {pet.gender} · {pet.size}
        </p>

        <p className="tags">
          {pet.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </p>

        <Link className="btn small" to={`/pets/${pet.id}`}>Meet {pet.name}</Link>
      </div>
    </article>
  );
}
