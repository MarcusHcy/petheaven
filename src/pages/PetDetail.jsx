// Pet details page (one pet). The address looks like /pets/3
// REQ: pet information, with a button that goes to the adoption form
import { Link, useParams } from "react-router-dom";
import PETS from "../data/pets.js";
import { ageLabel } from "../utils/petHelpers.js";
import useFavourites from "../hooks/useFavourites.js";
import ImageSlot from "../components/ImageSlot.jsx";
import PetCard from "../components/PetCard.jsx";
import Notice from "../components/Notice.jsx";

export default function PetDetail() {
  const { id } = useParams();
  const [favs, toggleFav] = useFavourites();
  const pet = PETS.find((p) => p.id === Number(id));

  // someone typed a wrong address
  if (!pet) {
    return (
      <section className="container section">
        <Notice type="error" title="Pet not found">
          We couldn't find that pet. <Link to="/pets">Go back to all pets</Link>
        </Notice>
      </section>
    );
  }

  // up to 3 other pets of the same type
  const similar = PETS.filter((p) => p.species === pet.species && p.id !== pet.id).slice(0, 3);

  const facts = [
    ["Type", pet.species],
    ["Breed", pet.breed],
    ["Age", ageLabel(pet.age)],
    ["Gender", pet.gender],
    ["Size", pet.size],
    ["Good with kids", pet.goodWithKids ? "Yes" : "No"],
    ["Vaccinated", "Yes"],
  ];

  return (
    <>
      <section className="container section pet-detail">
        <p><Link to="/pets">← Back to all pets</Link></p>

        <div className="two-col">
          {/* main photo, plus 2 optional extra photos (they only show if the files exist) */}
          <div>
            <ImageSlot src={`images/pets/${pet.image}.jpg`} alt={`${pet.name}, a ${pet.breed}`} />
            <div className="extra-photos">
              <ImageSlot src={`images/pets/${pet.image}-2.jpg`} alt={`${pet.name} playing`} hideIfMissing />
              <ImageSlot src={`images/pets/${pet.image}-3.jpg`} alt={`${pet.name} resting`} hideIfMissing />
            </div>
          </div>

          <div>
            <h1>{pet.name}</h1>
            <p className="tags">
              {pet.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </p>
            <p>{pet.story}</p>

            <table className="facts">
              <tbody>
                {facts.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row-buttons">
              <Link className="btn" to={`/adopt?pet=${pet.id}`}>Adopt {pet.name}</Link>
              <button className="btn outline" onClick={() => toggleFav(pet.id)} aria-pressed={favs.includes(pet.id)}>
                {favs.includes(pet.id) ? "♥ Saved" : "♡ Save to favourites"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="band">
          <div className="container">
            <h2>More {pet.species.toLowerCase()}s you might like</h2>
            <div className="grid">
              {similar.map((p) => (
                <PetCard key={p.id} pet={p} isFav={favs.includes(p.id)} onToggleFav={toggleFav} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
