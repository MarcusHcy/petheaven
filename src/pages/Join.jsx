// Join page (member registration)
// REQ: lets visitors register as a member and supporter of the society
// REQ: form validation, saved in the browser, and a draft email to the administrator
import { useState } from "react";
import { Link } from "react-router-dom";
import { MEMBERSHIPS } from "../config.js";
import useForm from "../hooks/useForm.js";
import { required, email, phone, mustTick } from "../utils/validators.js";
import { readList, writeList, saveSubmission, openMailDraft } from "../utils/submissions.js";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import Notice from "../components/Notice.jsx";

// what each field needs to pass
const RULES = {
  fullName: [required("Full name")],
  email: [required("Email"), email],
  phone: [required("Phone number"), phone],
  membership: [required("Membership type")],
  agree: [mustTick("Please tick the box to continue.")],
};

const START = {
  fullName: "",
  email: "",
  phone: "",
  membership: "",
  volunteer: false,
  foster: false,
  agree: false,
};

export default function Join() {
  const { values, bind, validateAll } = useForm(START, RULES);
  const [problem, setProblem] = useState("");
  const [newMember, setNewMember] = useState(null); // set once the form is sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setProblem("");
    if (!validateAll()) return;

    // stop the same email joining twice
    const members = readList("ph-members");
    const alreadyJoined = members.some((m) => m.email.toLowerCase() === values.email.toLowerCase());
    if (alreadyJoined) {
      setProblem("This email is already registered. You can go ahead and use the adoption form.");
      return;
    }

    const member = {
      memberId: "PH-" + Math.floor(1000 + Math.random() * 9000),
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      membership: values.membership,
      wantsToVolunteer: values.volunteer,
      wantsToFoster: values.foster,
    };

    writeList("ph-members", [...members, member]);
    saveSubmission("New member", member);
    setNewMember(member);
    openMailDraft("New member registration", member);
  };

  // after sending, show a thank you instead of the form
  if (newMember) {
    return (
      <>
        <PageHeader title="Welcome to the Pet Heaven family!" />
        <section className="container section narrow">
          <Notice type="success" title={`Thank you, ${newMember.fullName}`}>
            Your member number is <strong>{newMember.memberId}</strong>. Your email app should
            have opened with your details filled in. Press Send so our administrator gets a copy.
          </Notice>
          <p className="row-buttons">
            <Link className="btn" to="/pets">Meet our pets</Link>
            <Link className="btn outline" to="/adopt">Adopt a pet</Link>
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Join us">
        Become a member and supporter. Members can send adoption requests.
      </PageHeader>

      <section className="container section narrow">
        {problem && <Notice type="error" title="Could not register">{problem}</Notice>}

        <form className="card card-body" onSubmit={handleSubmit} noValidate>
          <FormField label="Full name" autoComplete="name" {...bind("fullName")} />
          <FormField label="Email" type="email" autoComplete="email" {...bind("email")} />
          <FormField label="Phone number" type="tel" autoComplete="tel" placeholder="+65 9123 4567" {...bind("phone")} />
          <FormField label="Membership type" as="select" options={MEMBERSHIPS} {...bind("membership")} />

          <fieldset>
            <legend>How would you like to help? (optional)</legend>
            <FormField label="I can volunteer at the shelter" type="checkbox" {...bind("volunteer", true)} />
            <FormField label="I can foster a pet at home" type="checkbox" {...bind("foster", true)} />
          </fieldset>

          <FormField
            label="I agree to be contacted by Pet Heaven staff."
            type="checkbox"
            {...bind("agree", true)}
          />

          <button className="btn" type="submit">Register</button>
        </form>
      </section>
    </>
  );
}
