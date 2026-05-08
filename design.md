# Hack-Nation Landing Page Design System

This file defines the design system imported from Figma and used in the current implementation.

- File: `Hack-Nation-Website-Redesign`
- Figma file key: `J5Vip279UzZWoLS5VRq6Xq`
- Primary page node: `64:592` (`64-592` in URL format)
- Hero background node: `64:595` (`64-595` in URL format)

## 1) Core Tokens (from Figma variable defs)

### Color Tokens

- `Palette/onyx` = `#0F110A`

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

App-level aliases:

- `--text` -> `--figma-palette-onyx`
- `--primary` -> `--figma-palette-onyx`
- `--bg` -> `#fffdfe`
- `--muted` -> `rgba(15, 17, 10, 0.7)`
- `--line` -> `rgba(15, 17, 10, 0.12)`
- `--accent-a` -> `#8f82ff`
- `--accent-b` -> `#8cfff9`

## 3) Type Scale Usage

- **Display/hero heading**: `Instrument Serif` italic with tight tracking
- **Caption rows (cities / top strips)**: `caption` token (`Space Mono`)
- **Section body copy**: `body` token (`Geist`, 15/18)
- **Stat label / small heading style**: `h3` token (`Inter`, 24, medium)

## 4) Component Primitives

These reusable primitives are used across sections:

- **Container** (`.container`): centered max-width layout wrapper
- **Pill Button** (`.pill`): rounded action style with `primary` and `subtle` variants
- **Card** (`.card`): bordered content card with soft shadow
- **Cities Row** (`.cities`): mono caption strip used in hero and countdown
- **Stat Bubble** (`.stat-bubble`): circular radial-gradient stat highlight

## 5) Section System

- **Hero**: shader-driven spectral background + React geometry animation stage
- **Countdown**: event urgency block with timer, supporting line, and CTA pills
- **Launchpad**: value proposition text + circular global builder stat
- **Programs**: process cards (`01` to `04`)
- **Sponsors**: neutral logo placeholders
- **Final CTA + Footer**: close action and meta info

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

## 7) Import Notes

- Fonts are imported in `index.html` from Google Fonts:
  - `Geist`
  - `Inter`
  - `Space Mono`
  - `Instrument Serif`
- Hero visuals are now primarily procedural (shader-driven) instead of image-driven.
- Node `64:595` alignment rules implemented:
  - Hero title is bottom-aligned in the section
  - Caption cities row sits directly below title
  - Right-side chevron indicator is included beside heading
- The design is tokenized in `styles.css` under `:root` for future scaling.
- Use these tokens instead of raw hardcoded values when extending the page.
