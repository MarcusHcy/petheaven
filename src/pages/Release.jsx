// Release page (give a pet to the society)
// REQ: online form for pet owners who want to release their pet to Pet Heaven
import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm.js";
import { required, email, phone, minLength, numberBetween, mustTick } from "../utils/validators.js";
import { saveSubmission, openMailDraft } from "../utils/submissions.js";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import Notice from "../components/Notice.jsx";

const RULES = {
  ownerName: [required("Your name")],
  email: [required("Email"), email],
  phone: [required("Phone number"), phone],
  petName: [required("Pet's name")],
  species: [required("Pet type")],
  breed: [required("Breed")],
  age: [numberBetween(0, 30, "Age")],
  gender: [required("Gender")],
  vaccinated: [required("This answer")],
  reason: [required("Reason")],
  details: [required("Details"), minLength(20, "Details")],
  agree: [mustTick("Please tick the box to continue.")],
};

const START = {
  ownerName: "", email: "", phone: "", petName: "", species: "", breed: "",
  age: "", gender: "", vaccinated: "", reason: "", details: "", agree: false,
};

export default function Release() {
  const { values, bind, validateAll } = useForm(START, RULES);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const request = {
      ownerName: values.ownerName,
      email: values.email,
      phone: values.phone,
      petName: values.petName,
      petType: values.species,
      breed: values.breed,
      ageInYears: values.age,
      gender: values.gender,
      vaccinated: values.vaccinated,
      reasonForRelease: values.reason,
      details: values.details,
    };

    saveSubmission("Pet release request", request);
    setSent(true);
    openMailDraft(`Pet release request: ${values.petName}`, request);
  };

  if (sent) {
    return (
      <>
        <PageHeader title="Thank you for contacting us" />
        <section className="container section narrow">
          <Notice type="success" title="Your request has been recorded">
            Your email app should have opened with the form filled in. Press Send so our
            administrator gets it. Our staff will contact you soon to talk about the best
            way to help your pet.
          </Notice>
          <p><Link className="btn" to="/">Back to home</Link></p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Release a pet">
        If you can no longer keep your pet, tell us about them and we will find a safe new home.
      </PageHeader>

      <section className="container section narrow">
        <form className="card card-body" onSubmit={handleSubmit} noValidate>
          <h2>About you</h2>
          <FormField label="Your name" autoComplete="name" {...bind("ownerName")} />
          <FormField label="Email" type="email" autoComplete="email" {...bind("email")} />
          <FormField label="Phone number" type="tel" autoComplete="tel" {...bind("phone")} />

          <h2>About your pet</h2>
          <FormField label="Pet's name" {...bind("petName")} />
          <FormField label="Type of pet" as="select" options={["Dog", "Cat"]} {...bind("species")} />
          <FormField label="Breed" hint="Write 'Mixed' if you are not sure." {...bind("breed")} />
          <FormField label="Age in years" type="number" min="0" max="30" step="0.5" {...bind("age")} />
          <FormField label="Gender" as="select" options={["Female", "Male"]} {...bind("gender")} />
          <FormField label="Is your pet vaccinated?" as="select" options={["Yes", "No", "Not sure"]} {...bind("vaccinated")} />

          <h2>Why are you releasing your pet?</h2>
          <FormField
            label="Main reason"
            as="select"
            options={["Moving overseas", "Allergies", "Cannot afford care", "Health problems", "No time", "Other"]}
            {...bind("reason")}
          />
          <FormField
            label="Tell us more"
            as="textarea"
            hint="Include any health or behaviour notes. At least 20 characters."
            {...bind("details")}
          />

          <FormField
            label="I confirm the details above are true and I am the owner of this pet."
            type="checkbox"
            {...bind("agree", true)}
          />

          <button className="btn" type="submit">Send release request</button>
        </form>
      </section>
    </>
  );
}
