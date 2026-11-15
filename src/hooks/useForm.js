// REQ: data entry validation. One hook used by all three forms (Join, Adopt, Release)
// "rules" looks like: { email: [required("Email"), email] }
import { useState } from "react";
import { check } from "../utils/validators.js";

export default function useForm(initialValues, rules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // runs the rules for one field and saves the error message (empty text = no error)
  const validateField = (name, value) => {
    const message = check(value, rules[name] || []);
    setErrors((old) => ({ ...old, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues((old) => ({ ...old, [name]: newValue }));
    if (errors[name]) validateField(name, newValue); // clears the error as soon as they fix it
  };

  // check a field when the user clicks out of it
  const handleBlur = (e) => validateField(e.target.name, values[e.target.name]);

  // checks every field when the form is submitted, returns true if all good
  const validateAll = () => {
    const newErrors = {};
    Object.keys(rules).forEach((name) => {
      const message = check(values[name], rules[name]);
      if (message) newErrors[name] = message;
    });
    setErrors(newErrors);

    // jump to the first field with a problem
    setTimeout(() => document.querySelector("[aria-invalid='true']")?.focus(), 0);
    return Object.keys(newErrors).length === 0;
  };

  // gives a form field everything it needs in one go: <FormField {...bind("email")} />
  const bind = (name, isCheckbox = false) => ({
    name,
    ...(isCheckbox ? { checked: values[name] } : { value: values[name] }),
    onChange: handleChange,
    onBlur: handleBlur,
    error: errors[name],
  });

  const setField = (name, value) => setValues((old) => ({ ...old, [name]: value }));
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, bind, validateAll, setField, reset };
}
