# 207 Analytix — Site Development Handoff

> **Last updated:** June 1, 2026  
> **Status:** In progress — paused after Session 1  
> **Repo:** [207-analytix/207-site](https://github.com/207-analytix/207-site)  
> **Supabase project:** `wznicchxpogzdiqeyckg` (us-east-1)

---

## Project Overview

A two-page marketing/product site for **207 Analytix** (Portland, ME data consultancy) and their flagship product **Alexandria** (AI-powered knowledge base). Built as static HTML/CSS/JS, hosted on GitHub Pages, with Supabase as the backend for contact form submissions.

### Pages
| File | Purpose |
|------|---------|
| `index.html` | Main 207 Analytix site (5 sections: hero, services, Alexandria preview, process, contact) |
| `alexandrea.html` | Dedicated Alexandria product page |
| `404.html` | Custom 404 error page |
| `style.css` | Shared stylesheet (design tokens, components, dark mode) |
| `main.js` | Shared JS (theme toggle, nav, Supabase contact form logic) |
| `favicon.svg` | SVG favicon (light + dark mode aware) |
| `_config.yml` | GitHub Pages config (no Jekyll theme) |

---

## Session 1 — What Was Completed

### ✅ Done

- **Full site built from scratch** — both pages, all 5 sections each, responsive (mobile-first, 375px+), light/dark mode with toggle
- **Design system** — Nexus palette (warm beige + teal accent), Instrument Sans font, fluid type scale, 4px spacing tokens
- **Supabase backend set up**
  - Project created in `us-east-1`
  - Tables: `customers` (name, email, created_at), `engagements` (customer_id, interest, message, status, created_at)
  - RLS enabled with `anon` insert policies on both tables
  - Publishable key (non-secret) wired into `main.js`
- **Contact form built** — replaces `mailto:` CTA in both `index.html` and `alexandrea.html`; fields: name, email, interest (dropdown), message; posts to Supabase; inline success/error feedback
- **`_config.yml` pushed** to repo for GitHub Pages compatibility
- **`404.html`** pushed with actual content

### ⚠️ Incomplete (Paused Mid-Session)

The large files (`index.html`, `alexandrea.html`, `style.css`, `main.js`) hit the tool push limit before their **updated content** was committed. The repo currently has the **original versions** of these files (no contact form).

**Next session must push:**
- `index.html` — with contact form replacing `<a href="mailto:...">` in the `#contact` section
- `alexandrea.html` — same contact form swap
- `style.css` — with contact form CSS appended (`.contact-form`, `.contact-form__field`, etc.)
- `main.js` — with Supabase URL/key at top + form submission handler

---

## Supabase Details

| Item | Value |
|------|-------|
| Project ID | `wznicchxpogzdiqeyckg` |
| Region | us-east-1 |
| API URL | `https://wznicchxpogzdiqeyckg.supabase.co` |
| Publishable key | `sb_publishable_iDUHjsXn1hok3uGcfRU7dg_T7P7XEyG` |
| Tables | `customers`, `engagements` |

### Schema

```sql
-- customers
id            uuid  PRIMARY KEY DEFAULT gen_random_uuid()
name          text  NOT NULL
email         text  NOT NULL
created_at    timestamptz DEFAULT now()

-- engagements
id            uuid  PRIMARY KEY DEFAULT gen_random_uuid()
customer_id   uuid  REFERENCES customers(id)
interest      text
message       text
status        text  DEFAULT 'new'
created_at    timestamptz DEFAULT now()
```

### RLS Policies (already applied)
```sql
-- Allow anonymous inserts
CREATE POLICY "anon insert customers"  ON customers  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon insert engagements" ON engagements FOR INSERT TO anon WITH CHECK (true);
```

---

## What Needs to Happen Next

### Priority 1 — Push Updated Files
Either continue in the AI assistant (new session) or run locally:

```bash
git clone https://github.com/207-analytix/207-site.git
cd 207-site
# Replace index.html, alexandrea.html, style.css, main.js
# with the versions containing the contact form
git add .
git commit -m "Add contact form + Supabase integration"
git push origin main
```

### Priority 2 — Enable GitHub Pages
1. Repo → **Settings → Pages**
2. Source: **Deploy from branch**, branch: `main`, folder: `/ (root)`
3. Save — site goes live at `https://207-analytix.github.io/207-site/`

### Priority 3 — Custom Domain (optional)
Add a `CNAME` file to the repo root with your domain (e.g., `207analytix.com`), then configure DNS:
- `A` records pointing to GitHub Pages IPs
- Or `CNAME` record pointing to `207-analytix.github.io`

### Priority 4 — Future Enhancements (backlog)
- [ ] Email notification on new form submission (Supabase Edge Function → Resend/SendGrid)
- [ ] Admin view to see submissions (simple password-protected page or Supabase Studio)
- [ ] Alexandria product page deeper content (features, pricing, demo request flow)
- [ ] Analytics (Plausible or simple Supabase event logging)
- [ ] Blog/case studies section

---

## Design Notes

- **Font:** Instrument Sans (Google Fonts) — `400, 500, 600, 700`
- **Palette:** Nexus (warm beige surfaces `#f7f6f2`, teal primary `#01696f`)
- **Dark mode:** `data-theme="dark"` on `<html>`, toggle in nav, system preference fallback
- **Contact form interest dropdown values** map directly to Supabase `engagements.interest` column:
  - `tier_1_web_application`
  - `tier_2_data_stewardship`
  - `tier_3_expert_analysis`
  - `tier_4_data_education`
  - `tier_5_custom_consultation`

---

## File State Reference

| File | In repo | Has contact form | Notes |
|------|---------|-----------------|-------|
| `index.html` | ✅ | ❌ | Needs re-push with form |
| `alexandrea.html` | ✅ | ❌ | Needs re-push with form |
| `style.css` | ✅ | ❌ | Needs re-push with form CSS |
| `main.js` | ✅ | ❌ | Needs re-push with Supabase logic |
| `404.html` | ✅ | n/a | Complete |
| `favicon.svg` | ✅ | n/a | Complete |
| `_config.yml` | ✅ | n/a | Complete |
