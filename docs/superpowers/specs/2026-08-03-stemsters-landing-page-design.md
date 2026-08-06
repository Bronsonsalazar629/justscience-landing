# JustScience Landing Page — Design Spec

**Status:** Implemented (see Rebrand note below)
**Source brief:** `STEMsters Landing Page — Rebuild Spec` (pasted into conversation, not a repo file)

## Rebrand note (post-implementation)

The site originally shipped under the name **STEMsters** per the brief and the decisions below. It was subsequently rebranded to **JustScience**: all "STEMsters" copy/branding was replaced, the colored-letter text wordmark was replaced with a real logo image, the display font was changed from Fredoka One to **Okine Sans**, and the color palette below was replaced with JustScience's brand colors. An **Acknowledgements** section was also added at the bottom of the page, crediting Carnegie Mellon University's Center for Student Diversity and Inclusion. This doc has been updated in place to reflect the current, shipped state — sections below describe what's live now, not the original STEMsters version.

## Goal

Recreate the landing page layout from a reference screenshot, using Okine Sans as the display typeface and JustScience's brand palette, built with React + CSS custom-property tokens.

This document records the decisions made during brainstorming that **change or resolve open questions** from the original brief. Where the brief already gives a concrete answer (copy text, button shapes, spacing scale, type scale) and nothing below overrides it, the brief is authoritative — read it alongside this doc, not instead of it.

## Decisions that override or resolve the brief

1. **Stack**: React + CSS custom properties, confirmed (brief's assumption was correct).

2. **Hero illustration**: Reversed — kept as a **placeholder block** (labeled image/collage placeholder, no real artwork), not dropped. Hero keeps the brief's two-column grid (`grid-template-columns: 1fr 1fr`): text left, placeholder block right. Real artwork sourced later replaces the block without a layout change.

3. **Logo strip section**: Reversed — kept, rendered as a row of generic placeholder logo boxes (gray rounded rectangles, no text, no real partner names/marks). Real logos sourced later replace the boxes without a layout change.

4. **Display font scope**: Applied **globally** — nav, headings, body copy all use the display font. This overrides the brief's section 2 scope note, which recommended restricting a display font to the logo wordmark only for readability. `--font-display`, `--font-heading`, and `--font-body` all resolve to the same family. (Originally Fredoka One; changed to **Okine Sans** — MADE Okine Sans, personal-use license from MadeType — in the rebrand. The logo wordmark itself no longer uses this token at all, since the logo became a real image asset — see decision 12.)

5. **Header background**: The header/nav bar is not transparent — it shares `--color-bg-hero` with the hero section, so header + hero render as one continuous periwinkle-blue block at the top of the page. No separate header color token is needed.

6. **Color tokens**: Use the exact hex values from the brief's section 3 as the initial token values. The user plans to choose final colors later; because color is fully token-driven, that will be a token-file edit only, not a structural change.

7. **Nav links** (Home / Our Chapters / Volunteer Hours): Placeholder anchors (`href="#"`), not real routes. No routing library (e.g. React Router) is introduced in this pass.

8. **"About ▾" dropdown**: Fully functional (click/keyboard toggle), with placeholder submenu items **Our Mission / Our Team / FAQ**.

9. **Pill filter group** (Volunteering / Our Chapters / Curriculum): Fully functional — one pill active at a time, clicking swaps in a **short, topic-specific placeholder paragraph** below the pills (not identical filler text across all three).

10. **Responsive behavior**: Standard collapse breakpoint (~768px) — nav collapses to a hamburger menu, hero and About sections stack to a single column, buttons/pills wrap as needed. Not shown in the reference; designed fresh for this build.

11. **Animation**: Full motion, via `framer-motion` (new dependency). Three layers:
    - **Page load**: hero content (headline, buttons, paragraph) animates in on mount (fade/slide).
    - **Scroll-reveal**: logo strip and About section animate in as they enter the viewport (`whileInView`).
    - **Hover/interactive**: buttons, pills, and the About dropdown get hover/tap micro-transitions (scale/color).
    Not in the original reference or brief; added per user request during planning.

12. **Logo wordmark → real image (rebrand)**: The `Logo` component no longer renders "STEMsters" as individually colored `<span>` letters. It renders the actual JustScience logo (`src/assets/logo.png`, trimmed to content bounds) as an `<img>`, sized via CSS (`height: 32px; width: auto`). The per-letter color tokens (`--color-logo-1` through `--color-logo-4`) were removed from `tokens.css` since nothing references them anymore.

13. **Acknowledgements section (rebrand addition)**: A new section was added at the bottom of the page, after `AboutSection`, crediting Carnegie Mellon University's Center for Student Diversity and Inclusion with a heading ("Acknowledgements") and their logo image (`src/assets/cmu-center.png`). Same scroll-reveal (`whileInView`) treatment as `LogoStrip`/`AboutSection`, same token-driven spacing/typography. Not part of the original brief — added directly per user request, not run through the full brainstorming/planning process the original build used.

## Page structure (final)

```
<Header bg="--color-bg-hero">
  <Logo />                      -- JustScience logo image (src/assets/logo.png)
  <Nav>
    Home | Our Chapters | Volunteer Hours | About ▾ (dropdown: Our Mission / Our Team / FAQ)
  </Nav>
  <HeaderActions>
    <Button variant="outline">Contact Us</Button>
    <IconAvatar />
  </HeaderActions>
</Header>

<HeroSection bg="--color-bg-hero">
  <HeroText>
    <h1>Sparking imagination & innovation one experiment at a time</h1>
    <ButtonGroup>
      <Button variant="primary">Learn More</Button>
      <Button variant="outline">Contact</Button>
    </ButtonGroup>
    <p>Join our mission to ignite curiosity and creativity through hands-on STEM projects today!</p>
  </HeroText>
  <HeroIllustrationPlaceholder />  <!-- labeled placeholder box, no real artwork -->
</HeroSection>

<LogoStripPlaceholder />  <!-- row of generic gray placeholder boxes, no real logos -->

<Divider />

<AboutSection bg="--color-bg-page">
  <h2>What is JustScience?</h2>
  <p>Discover more about JustScience and our mission to inspire young minds
     through interactive STEM education!</p>
  <PillButtonGroup>
    <Pill>Volunteering</Pill>
    <Pill>Our Chapters</Pill>
    <Pill variant="active">Curriculum</Pill>
  </PillButtonGroup>
  <PillPanel>
    <!-- short placeholder paragraph, content depends on active pill -->
  </PillPanel>
</AboutSection>

<Divider />

<AcknowledgementsSection>
  <h2>Acknowledgements</h2>
  <img src="src/assets/cmu-center.png" alt="Carnegie Mellon University Center for Student Diversity and Inclusion" />
</AcknowledgementsSection>
```

## Component tree

```
App
├── Header
│   ├── Logo (image, not text — decision 12)
│   ├── Nav
│   │   └── NavDropdown ("About")
│   └── HeaderActions (Button, IconAvatar)
├── HeroSection (HeroText, HeroIllustrationPlaceholder)
├── LogoStripPlaceholder
├── Divider
├── AboutSection
│   ├── PillGroup
│   └── PillPanel
├── Divider
└── AcknowledgementsSection (decision 13)
```

Each component owns one section of the page, takes content/state as props, and has no dependency on sibling internals — `PillGroup` reports the active pill up to `AboutSection`, which passes the corresponding placeholder copy into `PillPanel`.

## Fonts

- **Okine Sans** (MADE Okine Sans, MadeType) — single Regular weight, personal-use license. Source + `LICENSE.txt` kept in `okine-sans/` at the repo root (untracked, matching how `fredoka-one/` was handled); production copies (`.otf` + `.woff2`) live in `public/fonts/`.
- `.woff2` generated from the source `.otf` for production; `.otf` kept as fallback.
- Commercial use of this font requires a separate paid license from MadeType (pixelsurplus.com/products/made-okine-sans) — the personal-use terms apply to this deployment.
- `@font-face` in `src/styles/global.css`:

```css
@font-face {
  font-family: 'Okine Sans';
  src: url('/fonts/OkineSans-Regular.woff2') format('woff2'),
       url('/fonts/OkineSans-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

```css
:root {
  --font-display: 'Okine Sans', system-ui, sans-serif;
  --font-heading: 'Okine Sans', system-ui, sans-serif;
  --font-body: 'Okine Sans', system-ui, sans-serif;
}
```

## Color tokens

JustScience brand palette (replaces the original STEMsters periwinkle/black scheme):

| Name | Hex | Used for |
|---|---|---|
| Deep Ocean | `#31465A` | Primary text, button/pill borders, primary button background, active-pill text |
| Matcha Green | `#C7DFA3` | Active-pill background |
| Vanilla Milk | `#FFFDF7` | Page background, pill background, primary button text |
| Airy Blue | `#89B9E6` | Hero/header background |
| Frozen Aqua | `#D9F0FF` | Dividers, placeholder block backgrounds |

Placeholder blocks (hero illustration, logo strip) use Frozen Aqua rather than a separate neutral gray — they're still stand-ins, not final imagery, just styled from the live palette instead of a throwaway gray.

## Spacing & type scale

Use the brief's section 3 spacing scale and type scale as starting values, adjusted by eye during implementation since they were estimated from a screenshot, not measured from source.

## Out of scope (unchanged from brief)

- Exact pixel-perfect spacing (estimated values only).
- Real partner logo assets — placeholder boxes only, per decision 3.
- Real hero artwork — placeholder block only, per decision 2.

## Testing notes

- Dropdown open/close (click outside to close, keyboard Escape/Enter) needs interaction tests.
- Pill group active-state switching and corresponding panel content need interaction tests.
- Responsive breakpoint behavior (nav collapse, stacking) needs a viewport-size test or visual check.
- `AcknowledgementsSection` needs a render test (heading + logo image with correct alt text) — same pattern as `AboutSection`.
