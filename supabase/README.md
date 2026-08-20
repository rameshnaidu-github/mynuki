# MyNuki · Supabase setup

One-time setup so auth (and later catalog/orders) works.

## 1. Create the project
1. Go to <https://supabase.com> and create a free account + new project.
2. Wait for it to finish provisioning.

## 2. Add your keys to the app
1. In Supabase: **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. Paste them into `.env.local` in the project root:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```
4. Restart the dev server (`npm run dev`).

## 3. Create the database tables
1. In Supabase: **SQL Editor → New query**.
2. Run `migrations/0001_profiles.sql` (profiles).
3. Run `migrations/0002_orders.sql` (orders).
4. Run `migrations/0003_wishlists.sql` (wishlist sync).
5. Run `migrations/0004_customization_requests.sql` ("Make It Yours" form).

## 3b. Razorpay (test payments) — optional
1. Create a free account at <https://dashboard.razorpay.com> and stay in **Test mode**.
2. **Settings → API Keys → Generate Test Key**.
3. Copy the **Key ID** (starts with `rzp_test_`) into `.env.local` as
   `VITE_RAZORPAY_KEY_ID=rzp_test_...` and restart the dev server.
4. Test card at checkout: `4111 1111 1111 1111`, any future expiry, any CVV.

If you leave the key blank, checkout runs in **demo mode**: it records the order
in Supabase without a payment step, so you can still see the full flow.

## 3c. Production checkout — Edge Functions (secure payments)

The repo ships two Edge Functions in `supabase/functions/`:
`razorpay-create-order` (creates the order with the secret) and
`razorpay-verify` (verifies the payment signature). Deploy them so payments are
verified server-side — the key **secret** stays on the server, never in the browser.

Run these (the CLI is installed via Homebrew):

```bash
# one-time
supabase login
supabase link --project-ref gholuhegvemnstcdyapa

# store the keys as function secrets (SECRET stays server-side)
supabase secrets set RAZORPAY_KEY_ID=rzp_test_TS93NRQaM0qSOc \
                     RAZORPAY_KEY_SECRET=YOUR_TEST_SECRET

# deploy both functions
supabase functions deploy razorpay-create-order
supabase functions deploy razorpay-verify
```

Until they're deployed, checkout automatically falls back to the key-only test
flow — so the app keeps working either way. Once deployed, the frontend uses the
verified flow with no code change.

## 3d. Order-confirmation emails (optional)

`supabase/functions/send-order-email` sends a branded receipt via
[Resend](https://resend.com) after each order. Until it's configured it no-ops,
so orders work fine without it.

```bash
# 1. Create a free Resend account, verify a sender/domain, get an API key.
supabase secrets set RESEND_API_KEY=re_xxx \
                     ORDER_EMAIL_FROM="MyNuki <orders@yourdomain.com>"
# For quick testing, omit ORDER_EMAIL_FROM to use Resend's onboarding sender
# (which can only email your own Resend account address).

# 2. Deploy
supabase functions deploy send-order-email
```

## 4. (Optional) Enable Google sign-in
1. Supabase: **Authentication → Providers → Google → enable**.
2. Add your Google OAuth client ID/secret (from Google Cloud Console).
3. Add `http://localhost:5173` and your production URL to the allowed redirect URLs.

Email/password sign-up works without step 4. If you want to skip the
"confirm your email" step during development, turn off
**Authentication → Providers → Email → Confirm email**.
