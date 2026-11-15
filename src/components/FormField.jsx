// REUSABLE: one form field (label + input + error message).
// Used by all three forms, so every form looks and behaves the same.
// "as" can be "input" (default), "select" or "textarea". Use type="checkbox" for tick boxes.
// For selects pass options={["A", "B"]}
export default function FormField({ label, name, as = "input", type = "text", options = [], error, hint, ...rest }) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  // props that every kind of field needs
  const common = {
    id,
    name,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? errorId : undefined,
    ...rest,
  };

  const errorMessage = error && (
    <p className="error" id={errorId}>{error}</p>
  );

  // tick box: the label goes next to the box
  if (type === "checkbox") {
    return (
      <div className="field check">
        <label>
          <input type="checkbox" {...common} /> <span>{label}</span>
        </label>
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint">{hint}</p>}

      {as === "select" && (
        <select {...common}>
          <option value="">Choose...</option>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
      )}

      {as === "textarea" && <textarea rows="4" {...common} />}
      {as === "input" && <input type={type} {...common} />}

      {errorMessage}
    </div>
  );
}
