// REUSABLE: a message box. type can be "success", "error" or "info"
export default function Notice({ type = "info", title, children }) {
  return (
    <div className={`notice ${type}`} role={type === "error" ? "alert" : "status"}>
      {title && <strong>{title}</strong>}
      <div>{children}</div>
    </div>
  );
}
