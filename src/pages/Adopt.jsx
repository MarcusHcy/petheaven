// Adopt page (adoption request form)
// REQ: online form for a MEMBER who wants to adopt a specific pet
// The member email is checked against the members saved on the Join page.
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PETS from "../data/pets.js";
import useForm from "../hooks/useForm.js";
import { required, email, phone, minLength, notInPast, mustTick } from "../utils/validators.js";
import { readList, saveSubmission, openMailDraft } from "../utils/submissions.js";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import Notice from "../components/Notice.jsx";

const RULES = {
  memberEmail: [required("Member email"), email],
  fullName: [required("Full name")],
  phone: [required("Phone number"), phone],
  petId: [required("Pet")],
  housing: [required("Housing type")],
  otherPets: [required("This answer")],
  experience: [required("Experience")],
  reason: [required("Reason"), minLength(20, "Your reason")],
  visitDate: [notInPast],
  agree: [mustTick("Please tick the box to continue.")],
};

export default function Adopt() {
  const [params] = useSearchParams();

  // if we arrived from a pet page (/adopt?pet=3), that pet is already chosen
  const startPet = params.get("pet") || "";

  const { values, bind, validateAll } = useForm(
    {
      memberEmail: "", fullName: "", phone: "", petId: startPet,
      housing: "", otherPets: "", experience: "", reason: "",
      visitDate: "", agree: false,
    },
    RULES
  );

  const [notMember, setNotMember] = useState(false);
  const [sent, setSent] = useState(null);

  // list for the pet dropdown
  const petOptions = PETS.map((p) => ({ value: String(p.id), label: `${p.name} (${p.breed})` }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotMember(false);
    if (!validateAll()) return;

    // only members can adopt
    const members = readList("ph-members");
    const member = members.find((m) => m.email.toLowerCase() === values.memberEmail.toLowerCase());
    if (!member) {
      setNotMember(true);
      return;
    }

    const pet = PETS.find((p) => String(p.id) === values.petId);
    const request = {
      memberId: member.memberId,
      memberEmail: values.memberEmail,
      fullName: values.fullName,
      phone: values.phone,
      petWanted: `${pet.name} (${pet.breed})`,
      housing: values.housing,
      otherPets: values.otherPets,
      experience: values.experience,
      reason: values.reason,
      preferredVisitDate: values.visitDate,
    };

    saveSubmission("Adoption request", request);
    setSent({ petName: pet.name });
    openMailDraft(`Adoption request for ${pet.name}`, request);
  };

  if (sent) {
    return (
      <>
        <PageHeader title="Request sent!" />
        <section className="container section narrow">
          <Notice type="success" title={`Thank you for your interest in ${sent.petName}`}>
            Your email app should have opened with the request filled in. Press Send so our
            administrator gets it. Our staff will contact you to arrange an interview.
          </Notice>
          <p><Link className="btn" to="/pets">Back to our pets</Link></p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Adoption request">
        Tell us a little about you and the pet you would like to adopt.
      </PageHeader>

      <section className="container section narrow">
        {notMember && (
          <Notice type="error" title="We can't find that member email">
            Only members can adopt. <Link to="/join">Join here first</Link>, then come back.
          </Notice>
        )}

        <form className="card card-body" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Member email"
            type="email"
            hint="The email you used when you joined."
            {...bind("memberEmail")}
          />
          <FormField label="Full name" autoComplete="name" {...bind("fullName")} />
          <FormField label="Phone number" type="tel" autoComplete="tel" {...bind("phone")} />
          <FormField label="Which pet would you like to adopt?" as="select" options={petOptions} {...bind("petId")} />
          <FormField
            label="Where do you live?"
            as="select"
            options={["HDB flat", "Condominium", "Landed property", "Other"]}
            {...bind("housing")}
          />
          <FormField
            label="Do you have other pets at home?"
            as="select"
            options={["No", "Yes, dogs", "Yes, cats", "Yes, other animals"]}
            {...bind("otherPets")}
          />
          <FormField
            label="Experience with pets"
            as="select"
            options={["First time owner", "Some experience", "Very experienced"]}
            {...bind("experience")}
          />
          <FormField
            label="Why would you like to adopt this pet?"
            as="textarea"
            hint="At least 20 characters."
            {...bind("reason")}
          />
          <FormField label="Preferred date to visit" type="date" {...bind("visitDate")} />
          <FormField
            label="I understand that staff will interview me before the adoption is approved."
            type="checkbox"
            {...bind("agree", true)}
          />

          <button className="btn" type="submit">Send request</button>
        </form>
      </section>
    </>
  );
}
