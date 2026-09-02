type PageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function PageShell({ title, children }: PageShellProps) {
  return (
    <main className="wrap" id="main">
      <section className="section">
        <div className="section-head">
          <h1 className="section-title">{title}</h1>
        </div>
        <div className="page-prose">{children}</div>
      </section>
    </main>
  );
}
