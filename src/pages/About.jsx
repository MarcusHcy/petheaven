// About page
// REQ: communicates the purpose, facilities and pet information of the society
import PageHeader from "../components/PageHeader.jsx";
import ImageSlot from "../components/ImageSlot.jsx";
import { SOCIETY } from "../config.js";

// ADD YOUR PHOTOS: one picture for each facility in public/images/about/
const FACILITIES = [
  { name: "Dog kennels", image: "kennels", text: "Clean, roomy kennels with daily walks and playtime." },
  { name: "Cat lounge", image: "cat-lounge", text: "A quiet room with climbing shelves, beds and toys." },
  { name: "Play yard", image: "play-yard", text: "A fenced garden where our dogs can run and socialise." },
  { name: "Vet room", image: "vet-room", text: "Health checks, vaccinations and neutering before adoption." },
];

const FAQS = [
  { q: "Why do I need to be a member to adopt?", a: "Membership lets us keep track of everyone who has applied and helps us follow up after adoption." },
  { q: "Is there a fee to adopt?", a: "We ask for a small adoption donation that goes towards food, vaccinations and neutering." },
  { q: "What happens after I send the form?", a: "A staff member will contact you, interview you and arrange a visit to meet the pet." },
  { q: "Can I give my pet to Pet Heaven?", a: "Yes. Please fill in the release form and our team will get in touch to discuss the best option." },
];

export default function About() {
  return (
    <>
      <PageHeader title="About Pet Heaven">
        A charity that cares for abandoned cats and dogs.
      </PageHeader>

      {/* ---------- Purpose ---------- */}
      <section className="container section two-col">
        <div>
          <h2>Our purpose</h2>
          <p>
            {SOCIETY.name} is a charity society that looks after the welfare of abandoned pets,
            meaning cats and dogs whose owners can no longer keep them.
          </p>
          <p>
            We give each animal food, medical care and love until our staff can find them a
            suitable home. Visitors can ask to adopt a pet, or ask us to take in a pet they can
            no longer look after.
          </p>
          <p>
            Our team follows up every online request, interviews each person and makes sure
            the pet goes to a safe and caring home.
          </p>
        </div>

        {/* ADD YOUR PHOTO: a team or volunteers picture, public/images/about/team.jpg */}
        <ImageSlot src="images/about/team.jpg" alt="Pet Heaven staff and volunteers with some of our pets" />
      </section>

      {/* ---------- Facilities ---------- */}
      <section className="band">
        <div className="container">
          <h2>Our facilities</h2>
          <div className="grid">
            {FACILITIES.map((f) => (
              <article key={f.name} className="card">
                <ImageSlot src={`images/about/${f.image}.jpg`} alt={f.name} />
                <div className="card-body">
                  <h3>{f.name}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Visit + FAQ ---------- */}
      <section className="container section two-col">
        <div>
          <h2>Visit us</h2>
          <p><strong>Address:</strong> {SOCIETY.address}</p>
          <p><strong>Opening hours:</strong> {SOCIETY.hours}</p>
          <p><strong>Phone:</strong> {SOCIETY.phone}</p>
          <p><strong>Email:</strong> {SOCIETY.adminEmail}</p>
        </div>

        <div>
          <h2>Common questions</h2>
          {FAQS.map((item) => (
            <details key={item.q} className="faq">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
