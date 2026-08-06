# STEMsters Landing Page — Design Spec

**Status:** Approved for planning
**Source brief:** `STEMsters Landing Page — Rebuild Spec` (pasted into conversation, not a repo file)

## Goal

Recreate the STEMsters landing page layout from a reference screenshot, using Fredoka One as the display typeface and a periwinkle/black color palette, built with React + CSS custom-property tokens.

This document records the decisions made during brainstorming that **change or resolve open questions** from the original brief. Where the brief already gives a concrete answer (copy text, button shapes, spacing scale, type scale) and nothing below overrides it, the brief is authoritative — read it alongside this doc, not instead of it.

## Decisions that override or resolve the brief

1. **Stack**: React + CSS custom properties, confirmed (brief's assumption was correct).

2. **Hero illustration**: Reversed — kept as a **placeholder block** (labeled image/collage placeholder, no real artwork), not dropped. Hero keeps the brief's two-column grid (`grid-template-columns: 1fr 1fr`): text left, placeholder block right. Real artwork sourced later replaces the block without a layout change.

3. **Logo strip section**: Reversed — kept, rendered as a row of generic placeholder logo boxes (gray rounded rectangles, no text, no real partner names/marks). Real logos sourced later replace the boxes without a layout change.

4. **Fredoka One scope**: Applied **globally** — nav, headings, body copy, and the logo wordmark all use Fredoka One. This overrides the brief's section 2 scope note, which recommended restricting it to the logo wordmark only for readability. `--font-display`, `--font-heading`, and `--font-body` all resolve to `'Fredoka One', system-ui, sans-serif`.

5. **Header background**: The header/nav bar is not transparent — it shares `--color-bg-hero` with the hero section, so header + hero render as one continuous periwinkle-blue block at the top of the page. No separate header color token is needed.

6. **Color tokens**: Use the exact hex values from the brief's section 3 as the initial token values. The user plans to choose final colors later; because color is fully token-driven, that will be a token-file edit only, not a structural change.

7. **Nav links** (Home / Our Chapters / Volunteer Hours): Placeholder anchors (`href="#"`), not real routes. No routing library (e.g. React Router) is introduced in this pass.

8. **"About ▾" dropdown**: Fully functional (click/keyboard toggle), with placeholder submenu items **Our Mission / Our Team / FAQ**.

9. **Pill filter group** (Volunteering / Our Chapters / Curriculum): Fully functional — one pill active at a time, clicking swaps in a **short, topic-specific placeholder paragraph** below the pills (not identical filler text across all three).

10. **Responsive behavior**: Standard collapse breakpoint (~768px) — nav collapses to a hamburger menu, hero and About sections stack to a single column, buttons/pills wrap as needed. Not shown in the reference; designed fresh for this build.

## Page structure (final)

```
<Header bg="--color-bg-hero">
  <Logo />                      -- "STEMsters", Fredoka One, multi-color per letter
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
  <h2>What is STEMsters?</h2>
  <p>Discover more about STEMsters and our mission to inspire young minds
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
```

## Component tree

```
App
├── Header
│   ├── Logo
│   ├── Nav
│   │   └── NavDropdown ("About")
│   └── HeaderActions (Button, IconAvatar)
├── HeroSection (HeroText, HeroIllustrationPlaceholder)
├── LogoStripPlaceholder
├── Divider
└── AboutSection
    ├── PillGroup
    └── PillPanel
```

Each component owns one section of the page, takes content/state as props, and has no dependency on sibling internals — `PillGroup` reports the active pill up to `AboutSection`, which passes the corresponding placeholder copy into `PillPanel`.

## Fonts

- Single static weight, `FredokaOne-Regular`, no variable axis.
- `.woff2` generated from the existing `.ttf` for production; `.ttf` kept as fallback.
- `OFL.txt` copied to `/public/fonts/OFL.txt` (license required in repo per OFL terms, no UI attribution required).
- `@font-face` block as given in the brief's section 2.

```css
:root {
  --font-display: 'Fredoka One', system-ui, sans-serif;
  --font-heading: 'Fredoka One', system-ui, sans-serif;
  --font-body: 'Fredoka One', system-ui, sans-serif;
}
```

## Color tokens

Use the brief's section 3 values verbatim, plus the header reusing `--color-bg-hero` (decision 5). Placeholder blocks (hero illustration, logo strip) use a neutral gray, not a palette token — they're stand-ins, not final design.

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
