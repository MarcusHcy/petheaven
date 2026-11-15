// Staff inbox page
// EXTRA: shows every form that was submitted in this browser, so the whole flow can be
// demonstrated without a database. In a real site this would be a protected admin page.
import { useState } from "react";
import { readList, writeList, niceLabel, niceValue } from "../utils/submissions.js";
import PageHeader from "../components/PageHeader.jsx";

export default function Inbox() {
  const [items, setItems] = useState(() => readList("ph-inbox"));
  const memberCount = readList("ph-members").length;

  const clearAll = () => {
    if (window.confirm("Delete all saved forms and members from this browser?")) {
      writeList("ph-inbox", []);
      writeList("ph-members", []);
      setItems([]);
    }
  };

  return (
    <>
      <PageHeader title="Staff inbox">
        Demo page. It lists the forms submitted in this browser. Registered members: {memberCount}
      </PageHeader>

      <section className="container section narrow">
        {items.length === 0 && (
          <div className="card card-body">
            <p>No forms yet. Try the Join, Adopt or Release page.</p>
          </div>
        )}

        {items.map((item) => (
          <article key={item.id} className="card card-body inbox-item">
            <h3>{item.type} <small className="muted">{item.date}</small></h3>
            <dl>
              {Object.entries(item.data).map(([key, value]) => (
                <div key={key}>
                  <dt>{niceLabel(key)}</dt>
                  <dd>{niceValue(value)}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}

        {items.length > 0 && (
          <button className="btn outline small" onClick={clearAll}>Clear all (demo)</button>
        )}
      </section>
    </>
  );
}
