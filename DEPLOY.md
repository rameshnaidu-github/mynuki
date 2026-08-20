# Deploying MyNuki

The app is a static Vite build (`dist/`) plus Supabase (already cloud-hosted).
This guide takes you from "runs on my Mac" to "live on the internet".

---

## 0. Before you start

You'll need accounts for:
- **GitHub** (to host the code) — recommended
- **Vercel** *or* **Netlify** (to host the site) — free tier is fine
- **Supabase** — already set up
- **Razorpay** — test now; live needs KYC (see §5)

Environment variables the site needs (same names, your values):

| Variable | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `VITE_RAZORPAY_KEY_ID` | Razorpay → Settings → API Keys |

> These are **public** keys (safe in the browser). Never add the Razorpay **secret**
> or Supabase **service_role** key here — those live only in Edge Function secrets.

---

## 1. Push the code to GitHub

```bash
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/mynuki.git
git push -u origin main
```

---

## 2. Deploy — Vercel (recommended)

1. vercel.com → **Add New → Project** → import your GitHub repo.
2. Framework preset: **Vite**. Build command `npm run build`, output `dist` (auto-detected).
3. **Environment Variables** → add the three `VITE_…` vars above.
4. **Deploy.** `vercel.json` already handles SPA routing (deep links won't 404).

## 2-alt. Deploy — Netlify

1. netlify.com → **Add new site → Import an existing project** → pick the repo.
2. Build settings are read from `netlify.toml` (build `npm run build`, publish `dist`, SPA redirect included).
3. **Site settings → Environment variables** → add the three `VITE_…` vars.
4. **Deploy.**

Either host gives you HTTPS and a `*.vercel.app` / `*.netlify.app` URL immediately.

---

## 3. Custom domain

- Buy a domain, then add it in the host's **Domains** settings and follow the DNS steps.
- HTTPS is issued automatically.

---

## 4. Point Supabase at production

In Supabase → **Authentication → URL Configuration**:
- **Site URL** → your production URL
- **Redirect URLs** → add your production URL (and Vercel/Netlify preview URLs)
- If you use Google login, add the same URLs in Google Cloud OAuth settings.

Then **re-enable email confirmation** (Authentication → Providers → Email → Confirm
email — I turned it off for testing) and set up **custom SMTP** so account/reset
emails are branded and not rate-limited.

---

## 5. Go live on payments (Razorpay)

1. Complete Razorpay **KYC / business activation** (needs a registered business + bank account).
2. Razorpay checks that your **policy pages** are publicly reachable — they are, at
   `/policies/terms`, `/policies/privacy`, `/policies/refunds`, `/policies/shipping`
   (⚠️ fill in the bracketed business details first).
3. Switch to **live** keys:
   - Update `VITE_RAZORPAY_KEY_ID` (host env) to the live key id.
   - `supabase secrets set RAZORPAY_KEY_ID=<live> RAZORPAY_KEY_SECRET=<live-secret>`
   - Redeploy the functions: `supabase functions deploy razorpay-create-order && supabase functions deploy razorpay-verify`

---

## 6. Turn on order emails (optional)

See `supabase/README.md` §3d — create a Resend key, set the secrets, and
`supabase functions deploy send-order-email`.

---

## 7. Before you announce it — quick checklist

- [ ] Filled real business details into the policy pages
- [ ] Email confirmation re-enabled + SMTP configured
- [ ] Razorpay in live mode, one real ₹ test purchase works
- [ ] Order confirmation email arrives
- [ ] Custom domain + HTTPS working
- [ ] Supabase on a paid plan if you expect steady traffic (free projects pause after ~1 week idle)
- [ ] Replaced the placeholder product images with real photos
- [ ] `og:image` set to an absolute URL of a 1200×630 social image
- [ ] Tested signup → browse → cart → checkout → order on a phone

---

## Local commands

```bash
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```
