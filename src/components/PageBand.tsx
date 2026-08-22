/**
 * Coloured page header, so inner pages carry the homepage's language instead of
 * opening on plain white. Tones mirror the bands used down the homepage.
 */
const tones = {
  coral: "bg-navbar text-cream",
  sun: "bg-sun text-[#a83c12]",
  berry: "bg-berry text-cream",
  bloom: "bg-bloom text-white",
} as const;

export type BandTone = keyof typeof tones;

export default function PageBand({
  eyebrow,
  title,
  blurb,
  tone = "coral",
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  tone?: BandTone;
}) {
  return (
    <section className={`${tones[tone]}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-14">
        {eyebrow && (
          <span className="eyebrow opacity-90">{eyebrow}</span>
        )}
        <h1 className="font-display italic text-[34px] md:text-[46px] leading-[1.08] mt-2 text-current">
          {title}
        </h1>
        {blurb && (
          <p className="mt-3 text-[15px] md:text-[16px] max-w-2xl opacity-95">{blurb}</p>
        )}
      </div>
    </section>
  );
}
