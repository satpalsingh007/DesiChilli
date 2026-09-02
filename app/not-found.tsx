import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" id="main">
      <section className="section">
        <div className="section-head">
          <h1 className="section-title">This recap walked off set</h1>
        </div>
        <p className="page-prose">
          That page is gone, or the slug never existed. Head back to the{" "}
          <Link href="/">latest recaps</Link> before the next nomination.
        </p>
      </section>
    </main>
  );
}
