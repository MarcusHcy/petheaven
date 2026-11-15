// REQ: small checking functions for the forms.
// Each one returns an error message, or "" if the value is fine.

export const required = (label) => (v) =>
  v && String(v).trim() ? "" : `${label} is required.`;

export const email = (v) =>
  /^\S+@\S+\.\S+$/.test(v || "") ? "" : "Enter a valid email address.";

export const phone = (v) =>
  /^\+?[\d\s-]{8,15}$/.test(v || "") ? "" : "Enter a valid phone number (8 to 15 digits).";

export const minLength = (n, label) => (v) =>
  (v || "").trim().length >= n ? "" : `${label} needs at least ${n} characters.`;

export const numberBetween = (min, max, label) => (v) => {
  const n = Number(v);
  return v !== "" && !Number.isNaN(n) && n >= min && n <= max
    ? ""
    : `${label} must be a number from ${min} to ${max}.`;
};

// for tick boxes
export const mustTick = (message) => (v) => (v ? "" : message);

// date can't be in the past (dates are yyyy-mm-dd so they can be compared as text)
export const notInPast = (v) => {
  const today = new Date().toISOString().slice(0, 10);
  return v && v >= today ? "" : "Pick today or a future date.";
};

// goes through a list of rules and returns the first error found
export const check = (value, rules) => {
  for (const rule of rules) {
    const message = rule(value);
    if (message) return message;
  }
  return "";
};
