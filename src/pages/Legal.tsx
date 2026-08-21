import { Link, useParams } from "react-router-dom";
import { legalDocs } from "../data/legal";

export default function Legal() {
  const { slug = "" } = useParams();
  const doc = legalDocs[slug];

  if (!doc) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl">Page not found</h1>
        <Link to="/" className="btn-primary mt-6">Back home</Link>
      </section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <span className="eyebrow">Policies</span>
      <h1 className="text-4xl md:text-5xl mt-3">{doc.title}</h1>
      <p className="text-sm text-muted mt-2">Last updated {doc.updated}</p>

      <div className="mt-4 text-xs bg-peach/70 text-flamedeep rounded-xl px-4 py-3">
        Template — replace bracketed details with your business information and have it
        reviewed before you go live.
      </div>

      <p className="mt-8 text-inksoft font-light leading-relaxed">{doc.intro}</p>

      <div className="mt-8 space-y-8">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl">{s.h}</h2>
            <div className="mt-2 space-y-2 text-inksoft font-light leading-relaxed">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-line flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {Object.values(legalDocs).map((d) => (
          <Link
            key={d.slug}
            to={`/policies/${d.slug}`}
            className={d.slug === slug ? "text-flame font-medium" : "text-inksoft hover:text-flame"}
          >
            {d.title}
          </Link>
        ))}
      </div>
    </article>
  );
}
