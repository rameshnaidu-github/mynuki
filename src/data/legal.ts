// Policy copy for Dabble & Dahlia. NOT legal advice: have these reviewed, and add
// these reviewed before taking live payments — Razorpay checks these pages
// during activation.

export interface LegalSection {
  h: string;
  body: string[];
}
export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT = "hello@dabbledanddahlia.online";
const BIZ = "Dabble and Dahlia";
const ADDR = "Xim University, Nijigada, Kurki, Plot No:12(A, Harirajpur, Kakudia, Odisha 752050";

export const legalDocs: Record<string, LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    updated: "August 2026",
    intro: `These terms govern your use of the Dabble & Dahlia website and your purchase of our products. By using the site or placing an order, you agree to them. The site is operated by ${BIZ}, ${ADDR}.`,
    sections: [
      { h: "Products & orders", body: [
        "We sell 3D-printed homeware and DIY miniature kits. Product images are illustrative; small variation in colour and finish is normal for pieces printed and finished by hand.",
        "An order is confirmed only after successful payment. We may decline or cancel an order (with a full refund) if an item is unavailable or a pricing error occurs.",
      ]},
      { h: "Pricing & payment", body: [
        "All prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise. Payments are processed securely by Razorpay; we do not store your card details.",
      ]},
      { h: "Acceptable use", body: [
        "You agree not to misuse the site, attempt to disrupt it, or submit false information. Accounts are for your personal use.",
      ]},
      { h: "Liability", body: [
        "Our kits include small parts and are intended for ages 14+ unless stated otherwise on the product page. To the extent permitted by law, Dabble & Dahlia is not liable for indirect or incidental losses arising from use of the products or site.",
      ]},
      { h: "Contact", body: [ `Questions about these terms? Email ${CONTACT}, or write to ${BIZ}, ${ADDR}.` ]},
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "August 2026",
    intro: `This policy explains what personal data Dabble & Dahlia collects and how we use it. We collect only what we need to run the shop. The data controller is ${BIZ}, ${ADDR}.`,
    sections: [
      { h: "What we collect", body: [
        "Account details (name, email) when you register; shipping details and order history when you buy; and any information you send us through forms.",
        "We use privacy-respecting defaults and do not sell your data.",
      ]},
      { h: "How we use it", body: [
        "To create your account, process and deliver orders, respond to your requests, and send order-related emails. Payment is handled by Razorpay under their own privacy policy.",
      ]},
      { h: "Where it's stored", body: [
        "Your data is stored securely with our infrastructure provider (Supabase) with row-level access controls so only you can see your own account data.",
      ]},
      { h: "Your rights", body: [
        `You can request access to, correction of, or deletion of your personal data by emailing ${CONTACT}.`,
      ]},
      { h: "Cookies", body: [
        "We use only the storage needed to keep you signed in and remember your cart. We do not use advertising trackers by default.",
      ]},
    ],
  },

  refunds: {
    slug: "refunds",
    title: "Refund & Cancellation Policy",
    updated: "August 2026",
    intro: "We want you to love making with Dabble & Dahlia. Here's how cancellations and refunds work.",
    sections: [
      { h: "Cancellations", body: [
        "You can cancel an order before it is dispatched for a full refund — email us as soon as possible with your order number.",
      ]},
      { h: "Returns", body: [
        "Unopened items can be returned within 7 days of delivery for a full refund. Because each piece is printed to order, opened or partially built kits are not returnable unless faulty.",
      ]},
      { h: "Damaged or missing parts", body: [
        `If an order arrives damaged or with a part missing, email ${CONTACT} within 7 days with your order number and a photo, and we'll send a replacement or refund.`,
      ]},
      { h: "Refund timing", body: [
        "Approved refunds are issued to your original payment method via Razorpay, typically within 5–7 business days.",
      ]},
    ],
  },

  shipping: {
    slug: "shipping",
    title: "Shipping Policy",
    updated: "August 2026",
    intro: "How and when your Dabble & Dahlia order reaches you.",
    sections: [
      { h: "Where we ship", body: [ "We currently ship across India." ]},
      { h: "Dispatch & delivery", body: [
        "Orders are dispatched within 2–3 business days and typically arrive within 4–7 business days, depending on your location.",
      ]},
      { h: "Charges", body: [
        "Shipping is a flat ₹99, and free on orders over ₹1,200. Any charges are shown at checkout before payment.",
      ]},
      { h: "Tracking", body: [
        "Once dispatched, you'll receive tracking details by email. You can also view your orders in your account.",
      ]},
    ],
  },
};

export const legalList = Object.values(legalDocs);
