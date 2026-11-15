// REQ: "forms are to be mailed to the administrator"
// A frontend-only site can't send emails by itself, so two things happen on submit:
//   1. the form is saved in the browser (so it shows up on the Staff inbox page)
//   2. the visitor's email app opens with the form already written out (mailto link)
import { SOCIETY } from "../config.js";

export const readList = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // ignore, nothing else we can do
  }
};

// saves one submitted form into the inbox list
export const saveSubmission = (type, data) => {
  const list = readList("ph-inbox");
  list.unshift({ id: Date.now(), type, date: new Date().toLocaleString(), data });
  writeList("ph-inbox", list);
};

// "housingType" becomes "Housing Type"
export const niceLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

// "true" becomes "Yes", everything else stays the same
export const niceValue = (v) => (typeof v === "boolean" ? (v ? "Yes" : "No") : String(v));

// opens the email app with the subject and body filled in
export const openMailDraft = (subject, data) => {
  const body = Object.entries(data)
    .map(([key, value]) => `${niceLabel(key)}: ${niceValue(value)}`)
    .join("\n");

  window.location.href =
    `mailto:${SOCIETY.adminEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
};
