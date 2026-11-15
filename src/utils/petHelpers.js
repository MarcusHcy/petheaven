// small helpers for showing pet ages

// puts the age into a group, used by the age filter
export const ageGroup = (age) => {
  if (age < 1) return "Baby (under 1)";
  if (age <= 3) return "Young (1 to 3)";
  if (age <= 7) return "Adult (4 to 7)";
  return "Senior (8+)";
};

export const AGE_GROUPS = ["Baby (under 1)", "Young (1 to 3)", "Adult (4 to 7)", "Senior (8+)"];

// 0.5 becomes "6 months", 3 becomes "3 years"
export const ageLabel = (age) => {
  if (age < 1) return `${Math.round(age * 12)} months`;
  return age === 1 ? "1 year" : `${age} years`;
};
