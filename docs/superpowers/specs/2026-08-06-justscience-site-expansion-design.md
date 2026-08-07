# JustScience Site Expansion — Design Spec

**Status:** Approved for planning
**Builds on:** `2026-08-03-stemsters-landing-page-design.md` (the original single-page build, since rebranded to JustScience)

## Goal

Expand the JustScience site from a single-page landing page into a real multi-page site with routing: new pages (Our Mission, Our Team, FAQ, Our Chapters, Programs, Gallery, Start a Chapter, Volunteer, Sponsor Us, Request a Visit, Donate Now, Contact), a restructured header nav with a second dropdown, a sitewide footer, and two new homepage sections (hero subtext, a mission quote).

## Decisions

1. **Routing**: Add `react-router-dom`. Nav links become real routes instead of `href="#"` placeholders. This is a first for the project — everything so far has been a single unrouted page.

2. **Layout shell**: `Header` and the new `Footer` move out of the homepage-specific tree into a `Layout` component (`<Header /><Outlet /><Footer />`) that wraps every route, so they render consistently across all pages without duplication.

3. **Placeholder pages share one component**: Eight of the new pages (Our Chapters, Programs, Volunteer, Sponsor Us, Request a Visit, Donate Now, Contact, Volunteer Hours) have no real content beyond a name — the brief only gave labels for these. Rather than eight near-identical files, one `PlaceholderPage` component takes a `title` and renders it with the site's existing "details coming soon" copy pattern (matching `PillFilter`'s panel copy). Each route passes its own title.

4. **Header nav restructure**: Trimmed from a flat 8-item list to 6 top-level items + 2 dropdowns, to avoid an overcrowded header:
   - Home
   - About ▾ → Our Mission | Our Team | FAQ (existing dropdown, was placeholder `href="#"`, now real routes)
   - Our Chapters
   - Programs
   - Gallery
   - Get Involved ▾ → Start a Chapter | Volunteer | Sponsor Us | Request a Visit | Donate Now (new dropdown)
   - Volunteer Hours

5. **`NavDropdown` generalized**: Currently hardcoded for "About ▾" with a fixed `ITEMS` array of plain strings rendered as `href="#"`. Generalized to accept `label` and `items` (each `{ label, path }`) as props, rendering real `<Link>`s. Used twice now (About, Get Involved) instead of once.

6. **Our Chapters vs. Start a Chapter**: Different pages. "Our Chapters" is a directory of existing chapters (placeholder — no real chapter list was provided). "Start a Chapter" is the full how-to-join guide (real content, given in full — see below).

7. **Programs**: A new placeholder page, not a rename of the existing homepage "Curriculum" pill — that pill and its copy are untouched.

8. **FAQ**: Real questions, placeholder answers (no answers were provided). Page-only — not duplicated as a homepage section, to avoid maintaining the same content in two places.

9. **Quote block**: New homepage section (not duplicated on the Our Mission page, which otherwise has no separate mission-statement text — it reuses this same quote as its own centerpiece content rather than inventing mission copy that wasn't provided).

10. **Contact email**: `contact@justscience.org` (the original content had `STEMstersOutreach@gmail.com`; explicitly replaced per the JustScience rebrand).

11. **"Hours & Awards" dropped entirely** — not a page, not a footer link. Was in the original footer content but explicitly excluded.

12. **Copy adaptation**: All "STEMsters" references in the new content (team bio, footer copyright) become "JustScience", consistent with the existing rebrand. Stray zero-width-joiner characters (‍) from the pasted "Start a Chapter" content are stripped as copy-paste artifacts, not real formatting.

## Site map

```
/                    HomePage (existing sections + 2 new: hero subtext, quote block)
/our-mission         OurMissionPage (quote + placeholder note)
/our-team            OurTeamPage (real founder bios)
/faq                 FAQPage (real questions, placeholder answers)
/our-chapters        PlaceholderPage title="Our Chapters"
/programs            PlaceholderPage title="Programs"
/gallery              GalleryPage (placeholder project grid)
/start-a-chapter     StartAChapterPage (real 4-step content)
/volunteer           PlaceholderPage title="Volunteer"
/sponsor             PlaceholderPage title="Sponsor Us"
/request-a-visit     PlaceholderPage title="Request a Visit"
/donate              PlaceholderPage title="Donate Now"
/contact             PlaceholderPage title="Contact"
/volunteer-hours     PlaceholderPage title="Volunteer Hours"
```

## Page content

### Homepage additions

**Hero subtext** (new paragraph in `HeroSection`, under the existing body copy):
> We're a passionate group of students bringing hands-on science experiences directly to communities, inspiring the next generation of scientists and innovators.

**Quote section** (new component, placed after `AboutSection`, before `AcknowledgementsSection`):
> "Science is not meant to be kept in the lab; it's the toolbox for citizenship. To make it accessible is to empower every mind to question, understand, and shape the world they live in."
> — Tahmid H.

### Our Mission (`/our-mission`)

Heading "Our Mission", the same quote block as the homepage (Tahmid H.), and a placeholder line ("More about our mission coming soon.") since no separate mission-statement copy was provided.

### Our Team (`/our-team`)

Heading "Founding Team". Body copy (verbatim, brand-adapted):
> JustScience began in 2023 when friends from Arcadia High School started hands-on projects for local programs. As more schools and students got involved, the work spread nationwide. Today, the founding team helps guide direction and scalability.

Three founder cards:
| Name | Role | School |
|---|---|---|
| Ivan Leong | Founder | Northwestern University |
| Andrew Liu | Co-Founder | University of California, Berkeley |
| Ian Peng | Co-Founder | University of Pennsylvania |

### FAQ (`/faq`)

Heading "Frequently Asked Questions". Three items, each with a placeholder answer:
- **What age groups do you teach?** — Answer coming soon.
- **What is project based learning?** — Answer coming soon.
- **How long is a lesson?** — Answer coming soon.

### Start a Chapter (`/start-a-chapter`)

Heading "Start A Chapter". Four numbered steps (verbatim content, stray `‍` characters stripped):

**01 — Why Start a Chapter?**
- Gain valuable leadership experience
- Enhance your college application
- Making a difference in your community
- Earn service hours
- Develop skills that will benefit both your personal growth and future opportunities

**02 — Apply to Become a Chapter at Your High School or College**
Fill out our Chapter Interest Form to set up an online interview with our team! Once we contact you, gather at least 5 enthusiastic members from your school to join your chapter and become part of your team! We look forward to helping you get started!

**03 — Build Your Team**
- **President:** Lead the chapter & oversee operations! Ensure all sign-ups are filled out. Lead officer meetings.
- **Vice President:** Support the President, manage the spreadsheet for volunteer hours, ensuring proper recording of hours.
- **Secretary:** Manage Google Classroom & send meeting reminders and recaps.
- **Public Relations:** Manage Instagram by posting reminders and updates!

**04 — Establishing a Successful Chapter**
- **Attend Training:** Coordinate with our corporate board to set up and participate in training sessions, available both in person and virtually, to effectively prepare for running your chapter.
- **Promote Your Chapter:** Share information about your new JustScience chapter with your school and community to build awareness and attract interest.
- **Engage Volunteers:** Actively reach out to potential volunteers, encouraging their involvement to strengthen your chapter.

### Gallery (`/gallery`)

Heading "Gallery". A placeholder project grid — a handful of gray placeholder boxes (same visual language as the homepage's `LogoStrip` and hero illustration placeholders), no real images. Explicitly out of scope: real project photos.

### Placeholder pages (`PlaceholderPage` component)

Used for: Our Chapters, Programs, Volunteer, Sponsor Us, Request a Visit, Donate Now, Contact, Volunteer Hours. Each renders its `title` as an `<h1>` and a fixed "This page is coming soon — check back for updates!" message, styled with existing design tokens. The Contact page additionally shows the same address/email that's in the footer, since a Contact page with no contact info would be pointless.

## Footer (new, sitewide)

Rendered in `Layout`, below every page's `<Outlet />`.

**Quick Links:** Home · About · Our Chapters · Programs · Start a Chapter · Volunteer Hours · Contact
(Trimmed from the original 8-item footer list: "Curriculum" → "Programs" to match the real nav name, "Hours & Awards" dropped per decision 11.)

**Address:** 600 S San Gabriel Blvd, San Gabriel, CA 91776

**Email:** contact@justscience.org

**Copyright:** Copyright © 2026 JustScience - All rights reserved

## Architecture / file structure

```
src/
  main.jsx                    -- wraps <App /> in <BrowserRouter>
  App.jsx                     -- <Routes> definitions, wrapped in <Layout>
  layouts/
    Layout.jsx                -- Header + <Outlet /> + Footer
  components/
    Header.jsx                -- modified: NAV_LINKS become {label, path}, renders 2 NavDropdowns
    NavDropdown.jsx            -- generalized: takes label + items props
    Footer.jsx                 -- new
    QuoteSection.jsx            -- new, homepage quote block
    PlaceholderPage.jsx         -- new, generic "coming soon" page
  pages/
    HomePage.jsx               -- existing homepage sections + QuoteSection, moved here from App.jsx
    OurMissionPage.jsx
    OurTeamPage.jsx
    FAQPage.jsx
    GalleryPage.jsx
    StartAChapterPage.jsx
```

`HeroSection.jsx` gets one new paragraph added (the subtext); no structural change.

## Out of scope

- Real chapter directory content (Our Chapters page).
- Real program list (Programs page).
- Real gallery photos.
- Real FAQ answers.
- Any actual form functionality (Chapter Interest Form, donation processing, contact form) — pages describe these but don't implement working forms/payment.
- Mobile nav for two dropdowns — the existing mobile hamburger menu will need to accommodate both "About" and "Get Involved" dropdowns; exact interaction (nested collapse vs. flat list) is left to implementation to match the existing mobile nav pattern as closely as possible.

## Testing notes

- Routing smoke test: each route renders without crashing and shows its expected heading.
- `NavDropdown` tests need updating for the generalized `label`/`items` props (existing About-dropdown behavior — click/outside-click/Escape/Enter — must still pass unchanged).
- `PlaceholderPage` gets one shared test (renders title + coming-soon message) rather than one per page.
- Footer renders the Quick Links, address, email, and copyright text.
