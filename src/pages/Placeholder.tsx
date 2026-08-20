export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <span className="eyebrow">Coming next</span>
      <h1 className="text-4xl mt-3">{title}</h1>
      <p className="mt-4 text-inksoft font-light max-w-md mx-auto">
        This page is part of a later build slice. The design system and shell are live —
        we’ll fill this in when we reach it in the roadmap.
      </p>
    </section>
  );
}
