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

## Imagery — authentic only

Every photograph on the site comes from the client's own existing website or their
Google Business Profile. No stock imagery is used anywhere.

**22 photographs**, each used exactly once, placed in the box its subject matches.
`logo.jpg` appears three times (nav, host section, footer) as the brand mark.

Three GBP uploads were deliberately **excluded** as unusable:

| File | Why excluded |
| --- | --- |
| `photo_004.jpg` | A flyer advertising a different company — "CALL TOM 719-634-7311" (Colorado area code) |
| `photo_005.jpg` | Unrelated "VacayPrime" stock branding |
| `streetview_001.jpg` | Google Street View of a dental office storefront |

### Sharpness

Every photo panel is capped at the source file's **true pixel width**, so no image is
ever scaled up and nothing blurs. Verified: maximum render-to-native ratio across all
22 photographs is **1.00**. The small originals are presented as mounted prints
(centred, thin outline, soft shadow) rather than stretched to fill their container.

## The availability toast

The sliding notification at bottom-left mirrors the reference site's component —
same position, animation, 4.5s first appearance, 13s rotation, dismissible.

**Its content is deliberately different.** The reference site rotates invented booking
events ("Sarah K. from Connecticut just booked", "2 days ago") presented to visitors as
real, recent activity. Fabricated booking notifications on a live commercial site are
deceptive to customers and fall under the FTC's Rule on Consumer Reviews and
Testimonials, which covers false indicators of social proof.

So this build ships the same component populated with **factual statements about the
portfolio** — real communities, real terms, real policies — all drawn from the
company's own listings.

To change the messages, edit the `spEntries` array in `assets/js/site.js`. If the owner
wants genuine booking activity there, it should be fed from real bookings with the
guest's consent — never invented.

### Known limitation

The source photographs are small — the sidebar images are 238×138 and the banners
800×231. Panels use each image's **native aspect ratio**, so nothing is cropped or
letterboxed, but the images cannot be enlarged much before softening. This is why
several sections (Areas Served, Who Stays Here) use typographic cards rather than
photographs, and why the standalone photo gallery was removed — there simply are not
enough authentic photographs to fill it without repeating.

**Higher-resolution photography from the owner is the single biggest upgrade available
to this site.** Roughly 25–30 good images would allow the gallery to return and every
card to carry a photograph.

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
