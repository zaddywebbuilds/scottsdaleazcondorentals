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

## The orbital hero

The hero is a rotating chrome orb with eight of the client's own photographs circling it —
built entirely from CSS transforms. The ring spins on a 46s loop, each photograph
counter-rotates so it stays upright, and the orb carries a rotating conic band that reads
as the sphere physically rolling.

**Why CSS and not video.** The brief suggested MP4 → SVG → emoji. That chain doesn't hold
up: mobile browsers restrict video autoplay (so the orb would sit frozen on phones), and an
emoji can't display a photograph at all. CSS transforms are GPU-composited, animate smoothly
on mobile, add no file weight, and honour `prefers-reduced-motion`. Same effect, no
tradeoffs.

Geometry is verified rather than eyeballed: all eight satellites sit at an identical radius,
spaced exactly 45° apart, inside the ring and clear of the orb, at both desktop and 375px.

## Area photographs — Wikimedia Commons

The eight Areas Served cards use freely licensed photographs of the actual named places.
Each was visually checked against its card copy before use; one candidate (a shot through a
shop window) was rejected and replaced.

| Card | Subject | Photographer | Licence |
| --- | --- | --- | --- |
| North Scottsdale | Pinnacle Peak | Beyond My Ken | CC BY-SA 4.0 |
| Old Town Scottsdale | Old Town sign | Dru Bloomfield | CC BY 2.0 |
| Paradise Valley | View from Camelback Mountain | dconvertini | CC BY-SA 2.0 |
| Phoenix | Downtown skyline | Alan Stark | CC BY-SA 2.0 |
| Carefree | Carefree sundial | Marine 69-71 | CC BY-SA 4.0 |
| Cave Creek | Frontier Town | Marine 69-71 | CC BY-SA 4.0 |
| Fountain Hills | Homes below Red Mountain | Bernard Gagnon | CC BY-SA 3.0 |
| Anywhere You Need | Tempe skyline | Siphonophora | CC BY-SA 4.0 |

**These licences require attribution.** The table above satisfies it for the repository; if
the site goes live on the client's domain, keep a visible credits line or an equivalent
attribution page. CC BY-SA additionally carries share-alike terms.

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

## Guest reviews — real, and there is only one

The reviews section now shows the company's **actual Google review**, quoted verbatim and
attributed. The six placeholder testimonials that were previously here have been deleted.

**Scottsdale Condominium Rentals has exactly one Google review**: 5.0 stars from Jeri
Kelley, posted three months before this build. That is the whole review corpus, so the
section is built around one strong review rather than padded out.

`AggregateRating` structured data reflects the true numbers — `ratingValue 5.0`,
`reviewCount 1`. Do not inflate these: Google penalises false review markup, and the
figure must match what is publicly verifiable on the Business Profile.

**Highest-value marketing action available:** ask past guests for reviews. Review volume
is one of the strongest local-search ranking signals, and going from 1 to 15 reviews would
do more for this business than any further design work. There is a "Write a review" button
wired into the section.

### One thing to confirm

The review names **Mark** ("Mark was so awesome to work with"). That is presumably the
principal, but it is not stated anywhere on the existing site, so it has deliberately
**not** been added to the host section. Confirm who Mark is and the About copy can name
him — a named, licensed local agent converts far better than an anonymous one.

## Community pages

Each community now has its own indexable page under `/communities/`, so searches like
"Kierland Greens rental" or "Troon North furnished home" can land directly on the right
page instead of the homepage.

| Page | Covers |
| --- | --- |
| `kierland-greens.html` | Kierland Greens Villas, 15221 N. Clubgate Dr. |
| `grayhawk.html` | Vintage at Grayhawk |
| `troon-north.html` | Troon North homes and golf casitas |
| `plaza-residences.html` | Plaza Residences, Old Town |
| `montana-del-sol.html` | Montana del Sol, Villa Antigua, Montage, Villages North |
| `private-homes.html` | Private furnished homes across the Valley |

Each carries a unique title and meta description, its own canonical URL, `Accommodation`
and `BreadcrumbList` structured data, unit configurations, amenities, terms, and
cross-links to the other five. All six are linked from the portfolio tabs on the homepage
and listed in `sitemap.xml`.

**To edit or add a community:** update `.props.json`, then run

```bash
pwsh -File build-communities.ps1
```

That regenerates all six pages and rewrites `sitemap.xml`.

## WhatsApp — built, currently switched off

WhatsApp contact is fully implemented and **disabled by default**. When enabled it adds
four touchpoints: a floating action button, a row in the enquiry contact list, a button in
the mobile bar, and a footer link — all opening `wa.me` with a prefilled message.

**Why it ships disabled.** WhatsApp registration cannot be verified programmatically.
`wa.me` is only a click-to-chat redirector: it returns an identical page for registered and
unregistered numbers alike (verified by probing a deliberately fake number, which behaved
the same as the real one). WhatsApp publishes no public lookup API. Shipping the buttons
unverified risks sending customers into a dead end.

**To confirm in ten seconds:** open `https://wa.me/14806999915` on a phone with WhatsApp
installed. If it opens a chat with the business, they are registered.

**To enable:** in `assets/js/site.js`, set `enabled: true` in the `WHATSAPP` object. That
is the only change required.

## The booking-activity toast

The sliding notification at bottom-left mirrors the reference site's component — same
position, animation, 4.5s first appearance, 13s rotation, dismissible, suppressed under
`prefers-reduced-motion`. It rotates booking events with a property thumbnail and a
relative timestamp ("4 days ago", "Yesterday").

### ⚠️ The entries are placeholder data, not real bookings

The `spEntries` array in `assets/js/site.js` contains **invented** booking activity,
written to demonstrate the component. Nobody named in it booked anything.

**This must be replaced with a genuine booking feed before the site goes live on the
client's domain.** Presenting fabricated booking activity to visitors as real, recent
events is deceptive, and in the US it falls under the FTC's Rule on Consumer Reviews and
Testimonials, which covers false indicators of social proof. The exposure is higher here
than for a typical site because the principal is a licensed Arizona real estate agent,
and licensees are held to professional advertising standards.

Two safe ways to keep the component:

1. **Feed it real bookings.** Keep the entries anonymised ("A family from Chicago") so no
   guest is identified without consent, but base every entry on a booking that actually
   happened. This is how legitimate social-proof tools work.
2. **Switch it to factual portfolio notes.** Real communities, real terms, real policies —
   the same visual effect with nothing invented. The previous revision of this file used
   this approach and can be recovered from git history.

The entries live in one array and are trivial to swap.

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
