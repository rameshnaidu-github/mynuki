import { Link } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="max-w-xl mx-auto px-6 py-20 md:py-28 text-center">
      <h1 className="font-display italic text-flame text-[38px] md:text-[46px]">{title}</h1>
      <p className="mt-4 text-inksoft text-[15px] leading-relaxed">
        We couldn’t find the page you were after — it may have moved, or the link
        may be out of date.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/shop" className="btn-primary">Shop all products</Link>
        <Link to="/" className="btn-outline">Back home</Link>
      </div>
    </section>
  );
}
