// REUSABLE: the coloured title banner at the top of most pages
// usage: <PageHeader title="Our pets">some intro text</PageHeader>
export default function PageHeader({ title, children }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}
