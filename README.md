# Scottsdale Condominium Rentals — Website Rebuild

A complete redesign of [scottsdaleazcondorentals.com](http://www.scottsdaleazcondorentals.com/) —
a single-page, premium marketing site for a veteran-owned Arizona furnished-rental agency.

**Live preview:** https://zaddywebbuilds.github.io/scottsdaleazcondorentals/

---

## What this is

The original site is a 2011-era table layout with a keyword-stuffed sidebar and small,
low-resolution imagery. This rebuild keeps **all of the original business content** —
services, communities, amenities, areas served, contact details — and re-presents it as a
modern, single-scroll experience.

## Structure

| Section | Purpose |
| --- | --- |
| Announcement ticker | Rotating availability / phone / rates |
| Sticky nav | Collapses to a full-screen menu under 900px |
| Hero | Full-bleed image, trust badges, parallax |
| Trust strip | Veteran owned · Licensed AZ agent · 20+ communities · 7 areas · no fees |
| About | Company story + animated counters |
| A day in the Valley | Four-tab timeline (Morning / Afternoon / Sunset / Evening) |
| Services | Corporate · Vacation · Relocation · Medical & recovery |
| What's included | Four amenity groups drawn from the original property listings |
| Gallery | 28 images, 9 category filters, keyboard-navigable lightbox |
| Communities | Six-tab portfolio (Kierland Greens, Grayhawk, Troon North, Plaza Residences, Montana del Sol, private homes) |
| Areas | Eight area cards with hover detail |
| Who stays here | Corporate · Relocating families · Medical · Snowbirds & golf |
| Location | Hand-built SVG map of the Valley + landmark cards |
| Reviews | Six testimonials — **see note below** |
| Host | Veteran-owned / licensed-agent positioning |
| FAQ | Eight-question accordion |
| Enquiry form | Mirrors the original search form; submits via `mailto:` |
| Footer | Full sitemap + credentials |

## Business details carried over

- **Phone:** 480-699-9915
- **Email:** info@scottsdaleazcondorentals.com
- **Areas:** North Scottsdale, Old Town Scottsdale, Paradise Valley, Phoenix, Carefree, Cave Creek, Fountain Hills
- **Credentials:** Veteran owned · The Principal is a Licensed Real Estate Agent in Arizona
- **Communities:** Kierland Greens (15221 N. Clubgate Dr.), Vintage at Grayhawk, Troon North,
  Plaza Residences, Montana del Sol, Villa Antigua, Montage, The Groves, Villa Rita,
  The Overlook, Coyote Canyon, Signature at Scottsdale, Villages North, Sunset Cove,
  High Desert Village

## Design rules enforced in this build

- **Pink palette** — Sonoran sunset: deep plum `#26101B`, desert rose `#D94F7A`, blush `#FBE7EE`, shell `#FFF6F9`.
- **No background images anywhere.** Every photograph is a real `<img>` sitting on the surface
  with text beside or beneath it. Verified: zero elements carry a CSS `background-image`.
- **Nothing is ever cropped.** All photo frames use `object-fit: contain` on a fixed 3:2 panel,
  and images are fetched from Unsplash *without* `fit=crop`, so the full frame is always visible.
- **No repeated images.** 55 images fill 55 slots — every box on the site has its own
  content-matched photograph. (The only second reference to `hero.jpg` is the `og:image`
  social-preview meta tag, which never renders on the page.)
- **No dead space between segments.** Section padding is tight and sections butt directly
  against each other, separated by colour rather than whitespace. The gallery is a seamless
  zero-gap mosaic.
- **Booking popup** — a two-panel modal (photo + form) opened by any of the 21 "Check
  Availability" CTAs; closes on ✕, backdrop click, or Escape; swaps to a thank-you state on submit.
- **3D tilt** on all 26 cards, disabled on touch devices and under `prefers-reduced-motion`.

## Tech

Plain HTML, CSS and vanilla JavaScript — no build step, no dependencies, no framework.
Deploys as static files to GitHub Pages.

- `index.html` — all markup
- `assets/css/site.css` — design system + responsive rules
- `assets/js/site.js` — nav, tabs, accordion, gallery filter, lightbox, counters, parallax, form
- `assets/img/` — 44 optimised images

Accessibility and performance notes: respects `prefers-reduced-motion`, lazy-loads
below-fold imagery, uses semantic landmarks, and ships zero third-party JavaScript.
Only Google Fonts is loaded externally.

---

## ⚠️ Before going live

1. **Replace the testimonials.** The six reviews in the `#reviews` section are
   illustrative placeholders written for the pitch. Swap them for genuine guest
   reviews (an HTML comment marks the section).
2. **Wire up the enquiry form.** It currently opens the visitor's mail client via
   `mailto:`. For reliable capture, point it at Formspree, Netlify Forms, or a
   server endpoint.
3. **Swap in real property photography.** Interior, pool and desert images are
   licensed stock placeholders. The genuine photos carried over from the existing
   site and Google Business Profile are the `real-*.jpg` files.
4. **Confirm the stats.** "20+ communities" and "7 areas served" are derived from the
   current site's own property and area listings — verify before publishing.

## Image credits

- `real-*.jpg` — the client's existing website and Google Business Profile
- All other imagery — [Unsplash](https://unsplash.com/license) (free for commercial use)
