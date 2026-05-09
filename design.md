# Hack-Nation Design System (Website + Social)

This document records the design system sourced from Figma and reflected in the repo: **marketing website** specs (`Hack-Nation-Website-Redesign`) and **social templates** (`Posts`). Use it when extending the site or producing matching campaign artwork so typography, color, and layout stay reproducible.

## Figma sources

| Surface | File name (informal) | File key | Primary nodes |
| --- | --- | --- | --- |
| Website | Hack-Nation-Website-Redesign | `J5Vip279UzZWoLS5VRq6Xq` | `64:592` — frame **Polished Hack-Nation Homepage UI** (~**1215px** wide column); `64:595` — hero **`BG`** (shader + title + cities) |
| Social posts | Posts | `NFtqlNAPNcrbxeFSS3GYd4` | Template frames below (swap `1-NNN` → `1:NNN` in Dev Mode URLs) |

Example Post URLs (same file key): Meet Individual `1:5` / `1:30`; Meet Our Speakers `1:51`; Meet Our Sponsors `1:82`; Winner Announcement `1:110`; I Have Been Selected `1:246` / `1:591`; Prize Announcement light/dark `1:958`–`1:1079`; Hackathon Announcement variants `1:939`–`1:1119`; Hub / All Hubs `1:1137`–`1:1209`.

## 1) Core Tokens (from Figma variable defs)

### Color Tokens

- `Palette/onyx` = `#0F110A`
- `Palette/off-blue` = `#E8E8EF` (primary light text on dark social layouts)
- `Palette/soft-periwinkle-800` = `#1900F7` (**primary filled CTA** on the homepage — e.g. “Apply for Next Cohort”; also hub-location accents — use sparingly elsewhere)

Additional colors used on the website frame (`64:592`) that are not all named as separate Palette vars in the export:

- **Page background / paper**: `#FFFDFE` (matches app `--bg`)
- **Nav / glass chrome text**: `#caccff` (lavender; paired with `mix-blend-difference` on nav rows in Figma)
- **“Snow” text on dark pills**: `#FFFBFC` (e.g. “Join us” on onyx button)
- **Footer tagline accent**: `#8CFFF9` (maps to `--accent-b` — “Global AI Talent Launchpad”)

### Typography Tokens

- `caption` = `Space Mono / 400 / 20px / line-height 100 / letter-spacing -2.5%`
- `h3` = `Inter / 500 / 24px / line-height 1.2 / letter-spacing -0.5px`
- `body` = `Geist / 500 / 15px / line-height 18px / letter-spacing -0.15px`

## 2) Project Token Mapping

Defined in `styles.css`:

- `--figma-palette-onyx` -> `#0f110a`
- `--figma-caption-font` -> `"Space Mono", monospace`
- `--figma-h3-font` -> `"Inter", system-ui, sans-serif`
- `--figma-body-font` -> `"Geist", "Inter", system-ui, sans-serif`

Optional alias for social dark-theme copy (not yet required on the web page, but used across Posts):

- `--figma-palette-off-blue` -> `#e8e8ef` (maps Figma `Palette/off-blue`)

App-level aliases:

- `--text` -> `--figma-palette-onyx`
- `--primary` -> `--figma-palette-onyx`
- `--bg` -> `#fffdfe`
- `--muted` -> `rgba(15, 17, 10, 0.7)`
- `--line` -> `rgba(15, 17, 10, 0.12)`
- `--accent-a` -> `#8f82ff`
- `--accent-b` -> `#8cfff9`

## 3) Type Scale Usage

### Website (verified against Figma `64:592`)

- **Hero display line** (`Title` in hero `BG`): `Instrument Serif` **Italic** **64px**, text `#FFFDFE`, tracking **-1.6px**, with **32×24** chevron icon beside the line.
- **Hero + countdown mono strips** (`Cities`): `Space Mono` **20px**, tracking **-0.5px** — full-width `justify-between` row (cities or benefit phrases depending on block); hero strip is light on spectral BG; countdown blocks use **onyx** on `#FFFDFE`.
- **Countdown numerals**: `Geist` **Medium** **96px**, **onyx**, centered, tracking **-3.6px**, line height aligned to **96px**.
- **Countdown supporting line**: `Inter` **Medium** **16px**, **muted onyx** `rgba(15,17,10,0.7)`.
- **Section body copy**: `body` token (`Geist` **Medium** 15/18) — plus section intros at **60px** / **72px** Geist for major headings in long scroll.
- **Experience band headline + stat** (`ExperienceSection`): subtle **diagonal wash** using brand accents at **10%** opacity: `rgba(143,130,255,0.1)` → `rgba(140,255,249,0.1)` (~148°); stat sphere uses **72px** / **22px** Geist inside a **514×514** circular radial using the same accent hues.
- **Programs rail** (`ProgramsSection`): large **60px** Geist headings; step index styling uses tight display figures (e.g. **32px** with strong negative tracking on layered “01 / 02 / 03” treatment); **program cards** use **24px** corner radius (~**343×267** cells in the file).
- **Dark sections** (`TestimonialsSection`): fill **onyx**; testimonial cards use **24px** radius, frosted surfaces `rgba(255,253,254,0.05)` and hairline `rgba(255,253,254,0.1)` — align dark UI to **`Palette/off-blue`** for primary copy where applicable.
- **Partners / long-form** (`PartnersSection`): large bordered panels (**24px** radius, **onyx** hairlines at **10%** opacity) containing hackathon journey, mentor grids, sponsor rails — preserve generous **32px** interior padding where Figma uses it.
- **Closing CTA** (`CTASection`): headline **72px** Geist Medium; subcopy **24px** muted; **primary** button fill **`#1900F7`**, label **18px** Geist Medium, paper text **`#FFFDFE`**, pill height ~**67px**, soft drop shadow; **secondary** paper fill + **onyx** hairline; tertiary line **13px** muted. Background: three-stop pastel gradient (purple / pink / cyan) at **15%** opacity.
- **Footer**: **onyx** field; column titles **15px** Geist Medium paper; links **13px** `rgba(255,253,254,0.6)`; wordmark **18px** Semibold; tagline **13px** in **`#8CFFF9`**.
- **Navigation** (floating **758×72** pill, **25px** radius): frosted bar `rgba(255,253,254,0.2)`; links **15px** / logo row **16px** Geist Medium at **`#caccff`** with difference blend on key rows; **Apply** uses **onyx** pad (**16px** radius) on the right.

Legacy shorthand (still true):

- **Caption rows** / mono UI: `caption` token (`Space Mono`) — align pixel tracking with Figma strips when implementing CSS (**-0.5px** on `64:592` vs variable definition **-2.5%**; follow implementation context).
- **Stat label / small heading style**: `h3` token (`Inter`, 24, medium) — used inside cards and partner columns in the file.

### Social posts (Geist + Instrument Serif)

Posts pair **Geist** (UI weight varies: Regular / Medium / SemiBold / Bold) with **Instrument Serif** for editorial emphasis. Approximate scale from the Posts file:

| Role | Typical spec | Notes |
| --- | --- | --- |
| Promo rail (`Promo_Top` / `Promo_Bottom`) | Geist Regular **20px**, line-height **1.2**, tracking **-1%** | Single horizontal row; often three chips (light) or two (when copy is merged) |
| Section serif headline | Instrument Serif **96px**, tracking ~**-1%** | e.g. “Meet our speakers / sponsors” |
| Large display serif | Instrument Serif **128px**, tight leading ~**0.9** | Hero names, prize amounts, “global hubs” line |
| Meet Individual hero | First line “Meet”: Geist **Medium 128px**; subject name: Instrument Serif **128px**; bio: Geist **SemiBold 36px**; mid CTA: Geist **SemiBold 45px** | Right-anchored stack; arrow glyph `—>` in copy |
| Speaker / winner names | Geist **SemiBold 48px** (placement titles use Instrument Serif **48px**) | Speaker avatars often **196px** circles; winner tiles **~157px** circles, caption **20px** SemiBold |
| “Did you know” / lead-in | Instrument Serif **48px** + Geist SemiBold for numeric prizes **128px** | Secondary sentence Instrument Serif **48px** |
| Code-metaphor posts | Geist **SemiBold 76px** or **96px**; brand word **Hack-Nation** in Instrument Serif inside pseudo-code | Dates / string literals in Instrument Serif |
| Ticket (“I Have Been Selected”) | `HACK-NATION`: Geist **Medium 64px**; bar label Geist **Bold 24px**; meta: **Geist Mono 12px** uppercase, +**1.2px** tracking; values Geist **Bold 14px** | Mono = operational / ticket metaphor |

When in doubt, match an existing frame in the Posts file and duplicate layer styles instead of inventing new sizes.

## 4) Component Primitives (website)

These reusable primitives are used across sections:

- **Container** (`.container`): centered max-width layout wrapper (~**1215px** content alignment in Figma `64:592`)
- **Pill Button** (`.pill`): rounded action style with `primary` and `subtle` variants — Figma uses **full pills** (`rounded-[50px]`, **32×16** px padding) for hero CTAs; **primary marketing CTA** fill **`#1900F7`** with **18px** medium labels on the closing section
- **Card** (`.card`): bordered content card with soft shadow — **24px** radius matches Programs / testimonials / partner slabs
- **Cities Row** (`.cities`): mono caption strip used in hero and countdown (**20px** Space Mono, full-width justify-between)
- **Stat Bubble** (`.stat-bubble`): circular radial-gradient stat highlight (**514px** diameter treatment in Experience section)
- **Navigation**: centered floating bar with logo + section anchors + Apply — see **Website** typography for chrome colors and blend behavior

## 5) Section System

Figma layer names on **`64:592`** map to implementation areas as follows:

| Figma block | Role |
| --- | --- |
| `App` | Root scroll column (`#FFFDFE`) |
| `BG` (**`64:595`**) | Hero spectral **`IMG`** + **`Effect`** ellipses + **`Title`** (hero headline + **`Cities`** strip) + avatar **`People`** ribbon |
| Countdown **`BG`** | Timer numerals, benefit **`Cities`** row, closing **`Cities`** row with chevron, muted deadline sentence, **Join us** / **Partner with us** pills |
| **`ExperienceSection`** | “Launchpad” narrative + **514px** stat orb (accent radial) |
| **`ProgramsSection`** | “How we work” **01 / 02 / 03** cards + large bordered **Hackathon** journey canvas inside nested **`Container`** |
| **`TestimonialsSection`** | Dark **onyx** field + hero video/image + testimonial cards |
| **`PartnersSection`** | Partner tiers, sponsor grids, **Venture Lab** slab, combined partner CTA region |
| **`CTASection`** | **Ready to build?** + dual pills + deadline microcopy on pastel tri-gradient |
| **`Footer`** | Four columns + legal row |

Implementation naming (codebase):

- **Hero**: shader-driven spectral background + React geometry animation stage (align headline/cities/chevron with **`64:595`** `Title` / `Cities`)
- **Countdown**: event urgency block with timer, supporting line, and CTA pills (match **96px** timer + mono strips + pill specs above)
- **Launchpad**: value proposition text + circular global builder stat (`ExperienceSection`)
- **Programs**: process cards and nested hackathon story (`ProgramsSection` + inner containers)
- **Sponsors / partners**: neutral or brand logos inside `PartnersSection`
- **Final CTA + Footer**: `CTASection` + `Footer`

## 6) Hero Animation System (React + Motion)

### Layering Model

- **Layer 1 (base)**: `.hero` CSS dark spectral fallback gradients
- **Layer 2 (shader)**: `#fluid-bg` WebGL canvas from `script.js`
- **Layer 3 (geometry UI)**: React mount `#hero-app` with split hero stage layout
- **Layer 4 (nav)**: sticky glass navbar with blend-mode assisted contrast

### Stage Timeline (auto-run once)

1. `hack-nation` -> typed text appears on right panel
2. `h-n` -> typed contraction
3. `you-infinity` -> typed final prompt
4. `network` -> radial graph grows with propagated edges and labels
5. `unicorn` -> node set morphs into unicorn wireframe and holds final state

Timing constants are centralized in `src/hero/HeroStage.jsx` (`STAGE_TIMINGS`).

### Hero Component Files

- `hero-main.jsx`: boots shader + countdown and mounts React hero app
- `src/hero/HeroStage.jsx`: stage orchestration/state machine
- `src/hero/TypingText.jsx`: typewriter transitions with completion callbacks
- `src/hero/networkData.js`: network graph + unicorn wireframe point generation
- `src/hero/NetworkSvg.jsx`: node/edge rendering and morph animations

### Accessibility + Motion Behavior

- If `prefers-reduced-motion: reduce` is enabled, hero skips staged sequencing and lands on the final unicorn state directly.
- Foreground text maintains contrast via blend strategy and fallback rules.

## 7) Social posts — recurring structure

These patterns repeat across frames in `Posts` (`NFtqlNAPNcrbxeFSS3GYd4`). Use them as building blocks when designing new squares or stories.

### Light vs dark

- **Light**: canvas reads **white**; text **onyx** `#0F110A`; logo mark dark.
- **Dark**: fill **onyx** `#0F110A`; primary text **off-blue** `#E8E8EF`; logo mark light. Gradient “IMG” layer may use **color-burn** toward onyx instead of light luminosity treatment.

### Background stack (atmospheric)

Most templates share a backdrop composed of:

1. **`IMG`** — wide photographic gradient (orange / teal family), often ~50% opacity.
2. **Radial wash** — SVG overlay (light posts: luminosity blend; dark: stronger burn toward onyx).
3. **`Effect`** — two large blurred ellipses with **color-dodge** (light) or **hue** (dark) at ~50% opacity for spectral highlights.
4. **`Sphere`** — wireframe globe asset, partially off-canvas (top or bottom bleed) for tech/network motif.

Preserve **generous margins**; promo rails align to ~**77–88px** horizontal inset with **~903px** wide rows where three-way `justify-between` promos are used.

### Named bands (Figma layer names)

- **`Promo_Top`** — logo vector (~54×58) + three labels: “Hack-Nation”, “Global AI hackathon”, “In collaboration with MIT Sloan Club”.
- **`Promo_Bottom`** — recruitment CTA split (either three phrases or two merged lines). Microcopy varies per template but typography stays Geist 20px / -1% tracking.

### Content archetypes in inventory

- **Spotlight / alum** — circular photo (~563px), sphere graphic, asymmetric headline (“Meet …”).
- **Speakers / sponsors** — serif section title + grid or staggered layout; sponsors may use logo grid **250px** column width.
- **Winners** — tri-column podium; challenge logo strip; ElevenLabs-style sponsor lockup where relevant.
- **Prize / hype** — “Did you know?” + large prize line + supporting paragraph; optional circular “people” cutouts.
- **Pseudo-code acquisition** — monospace-adjacent Geist blocks with Instrument Serif brand insertions.
- **Hub** — map/graphic + “Our new hub location is in **City**” (Instrument 48px lead-in + 128px city); supporting Geist SemiBold **36px** body.
- **All hubs** — Instrument **64px** city chips with **48px** gap; right banner Geist SemiBold **128px** (“Our *global* hubs”).
- **Ticket** — bordered ticket container, dashed perforation, barcode strip; Geist Mono metadata grid.

## 8) Import Notes

- Fonts are imported in `index.html` from Google Fonts:
  - `Geist`
  - `Inter`
  - `Space Mono`
  - `Instrument Serif`
- Social templates also use **Geist Mono** for ticket / logistics labels; include it when exporting static assets or implementing motion variants.
- Hero visuals are primarily procedural (shader-driven) instead of image-driven.
- Hero copy alignment matches Figma **`64:595`** (`Title` / **`124:254`**): display line and **`Cities`** strip use **`#fffdfe`** on the spectral **`BG`**; title sits bottom-aligned in the hero block with the cities row directly beneath and a **chevron** beside the headline (see live implementation in hero styles).
- The design is tokenized in `styles.css` under `:root` for future scaling.
- Use these tokens instead of raw hardcoded values when extending the page or generating new brand-safe layouts.

## 9) Reproducibility checklist (web + social)

1. **Colors**: Only **onyx**, **off-blue** (on dark), white fills, and existing spectral/accent hues — avoid ad hoc grays unless matched to Figma.
2. **Type**: Stick to **Geist + Instrument Serif** on social; **Space Mono** for mono ticket labels; do not introduce third display families for campaign work.
3. **Composition**: Keep **Promo_Top/Bottom** aligned to established inset; maintain **sphere / IMG / Effect** layering order when adding new backgrounds.
4. **Photography**: Circular crops for people; sponsor logos at consistent bounding widths; preserve logo clearspace from partner guidelines.
5. **Variants**: Export **light + dark** pairs where the file already branches — same grid, swapped fills and text tokens.
6. **Proof**: Before publishing, compare against the nearest sibling frame in `Posts` (same archetype) for margins, type sizes, and blend modes.
7. **Website**: Diff against Figma **`64:592`** for section order, **24px** card radius, **50px** hero CTAs vs **~67px** marketing CTA, **`#1900F7`** primary fill, and Experience/CTA gradients built from **`rgba(143,130,255,…)`** + **`rgba(140,255,249,…)`** (+ pink stop on the closing band).
