# PrepX – Full Project Documentation

This document explains how the PrepX website is structured, why specific HTML tags and CSS/JS patterns were used, and how to extend or customize pages safely. It complements and links to all concrete files in the repository.

## Contents

- Project overview and routing
- Design system and theming
- Page-by-page breakdown
  - Landing (`landing/index.html`, `style.css`, `script.js`)
  - Login (`login/login.html`, `login.css`, `login.js`)
  - Modules (`modules/module.html`, `module.css`, `module.js`)
  - About (`about us/aboutus.html`, `aboutus.css`, `aboutus.js`)
  - Contact (`contactus/contact.html`, `contact.css`, `contact.js`)
  - Exam (`exam page/exam-page.html`, `exam-page.css`)
- Accessibility notes (A11y)
- Performance and UX considerations
- How to extend (components, styles, scripts)

---

## Project overview and routing

PrepX is a static, multi-page web application. Each top-level feature lives in its own folder with a trio of files (HTML, CSS, JS):

- landing/ – marketing homepage and CTA to auth and modules
- login/ – sign-in/sign-up UI and demo flows
- modules/ – course listings grid (demo catalog)
- about us/ – company/mission/team page
- contactus/ – contact form + FAQ
- exam page/ – instructions and student info form (demo)

Links between pages use relative anchors (for example, `../login/login.html`). This keeps navigation simple for static hosting (GitHub Pages, Netlify, Vercel static, local server).

Why separate pages (not SPA)?
- Simpler deploys and no bundling required
- Fast first paint (server-native routing)
- Each page has focused CSS tuned to its layout

---

## Design system and theming

Across pages you’ll see consistent use of:

- CSS custom properties (variables) defined in `:root` for colors, gradients, shadows, and transitions. Example (landing/style.css):
  - `--primary`, `--primary-foreground`, `--gradient-primary`, `--shadow-soft`, `--transition-smooth`
- A glass/gradient aesthetic for foreground panels and callouts (`--gradient-glass`, `--gradient-card`).
- Responsive units and functions:
  - `clamp()` for fluid typography (e.g., hero titles)
  - CSS Grid and Flexbox for layout with `gap` for spacing
- Reusable utility-ish classes:
  - Buttons: `.btn`, `.btn-cta`, `.btn-ghost`, `.btn-hero`, `.btn-primary`
  - Sections: `.container`, `.section-title`, `.section-description`, `.section-badge`

Why variables? They centralize theming for easy global changes and guarantee visual consistency across pages. Gradients and shadows are abstracted so component look-and-feel is shared.

---

## Page-by-page breakdown

### 1) Landing page
Files: `landing/index.html`, `landing/style.css`, `landing/script.js`

Key structure and tags:
- `<!DOCTYPE html>`, `<html lang="en">`, semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` used for SEO and accessibility.
- Skip link `<a class="skip-link" href="#mainContent">` improves keyboard navigation.
- Header contains logo link and primary navigation. The mobile button (`.mobile-menu-btn`) toggles nav visibility; `aria-expanded` updates for screen readers.
- Hero section uses layered decorative divs (`.hero-bg`, `.hero-gradient-*`, `.hero-geometric`) to render gradients and soft shapes without images, keeping it performant and easily themeable.
- Feature grid uses cards (`.feature-card`) with icons and subtle hover transitions.
- Footer contains product/solutions/support columns with standard link lists.

Why specific choices:
- `<main id="mainContent">` is the skip-link target; improves accessibility.
- SVG icons inline enable color/stroke control via CSS and reduce external requests.
- IntersectionObserver in `script.js` adds `.animate-in` on intersection to defer animations to when elements enter viewport, improving initial paint and motion-reduced UX by default.
- Smooth-scrolling anchors implemented via `scrollIntoView({ behavior: "smooth" })` for simple client-side navigation.

Notable CSS:
- `:root` theme; hero uses `--gradient-hero` and `--hero-text` for dark hero on light site.
- `clamp()` for responsive titles and descriptions.
- `.glass` and `.gradient-text` patterns for brand feel.

JS behavior (landing/script.js):
- Mobile menu button toggles `.mobile-open` on `.nav` and updates `aria-expanded`.
- Smooth scroll for same-page `#` anchors.
- IntersectionObserver to add `animate-in` to `.feature-card`, `.pricing-card`, `.cta-card`.


### 2) Login page
Files: `login/login.html`, `login.css`, `login.js`

Key structure and tags:
- Single `<main class="auth-page">` container with background layers (`.bg-gradient-*`, `.bg-grid`) for a premium, dark-glass look.
- Tabs for Sign In/Sign Up use `<button class="auth-tab" data-tab="...">`; `login.js` toggles the visible card by adding/removing `.hidden` and `.active`.
- Forms use proper labels and `autocomplete` attributes; password fields have a “Show” toggle with ARIA updates (`aria-pressed`, `aria-label`).

Why specific choices:
- Separate auth cards keep DOM small and simplify animations without a router.
- Background gradients are pure CSS; avoids image assets.
- Social buttons are stubs to illustrate where OAuth would plug in.

Notable CSS:
- Dark palette variables (`--bg`, `--panel`, `--primary`) ensure contrast; borders and rings reinforce focus states.
- `.divider` draws rule lines with a soft gradient to match the theme.

JS behavior (login.js):
- Tab switching updates classes and headings.
- Password toggles swap input type and update accessible labels/state.
- Demo submit handlers use alerts and redirect to `landing/index.html#signed-in`. In production, replace with real auth calls.


### 3) Modules page
Files: `modules/module.html`, `module.css`, `module.js`

Key structure and tags:
- Responsive course grid using CSS Grid: `repeat(auto-fit, minmax(350px, 1fr))`.
- Course cards have gradient headers (brand-aligned colors) and content sections.
- Navigation includes a mobile menu implemented with a checkbox hack: the label toggles `#mobile-menu-toggle` and CSS reveals the menu (`#mobile-menu-toggle:checked + .nav`).

Why specific choices:
- The checkbox-driven menu avoids JS for the basic open/close behavior and degrades gracefully.
- Cards keep a consistent layout for Free vs Premium via `.premium-badge` and button styles.

Notable CSS:
- Dark background for content area to match product-y feel; brand gradients on headers.
- Smooth, subtle hover transitions with box-shadows.

JS behavior (module.js):
- Currently minimal; closes mobile menu when a nav item is clicked and stubs a Get Started click.


### 4) About page
Files: `about us/aboutus.html`, `aboutus.css`, `aboutus.js`

Key structure and tags:
- Sticky header using `position: sticky` for simpler behavior than fixed.
- Hero with gradient background and badge.
- Sections for Story, Mission, and Team. Team members are in a responsive grid with semantic headings.

Why specific choices:
- Semantic sections improve readability for assistive tech and SEO.
- Images are wrapped in `.member-image` for consistent ratio, circle mask, and drop shadow.

Notable CSS:
- Uses the same design tokens; lighter sections alternate with muted backgrounds for rhythm.
- Media queries scale grids down to single-column on small screens.

JS behavior (aboutus.js):
- Simple mobile nav toggler (inline styles). Could be swapped for class toggles for maintainability.


### 5) Contact page
Files: `contactus/contact.html`, `contact.css`, `contact.js`

Key structure and tags:
- Contact form with accessible labels and required fields; dropdowns for subject and priority.
- Success message element (`#successMessage`) is hidden by default and revealed on submit (simulated).
- FAQ section uses a grid of cards.

Why specific choices:
- `<textarea>` for message with `min-height` and resizable vertical.
- Form fields grouped into `.form-grid` for two-column layout on desktop.

Notable CSS:
- Focus rings and border-color transitions for clear input focus.
- `.faq-item` has a left brand border and hover elevation.

JS behavior (contact.js):
- Mobile nav toggle and icon swap for hamburger/close.
- Simulated async submit with button disable, success toast, and reset.


### 6) Exam page
Files: `exam page/exam-page.html`, `exam-page.css`

Key structure and tags:
- Two-column grid: instructions (left) and student form (right-aside).
- Uses `section` headings and unordered lists for readable instruction blocks.
- Student form includes name, roll number, institutional email with pattern validation, and a single-select group implemented with checkboxes + custom “single selection” logic.

Why specific choices:
- Pattern constraint on email (`@chitkara.edu.in`) demonstrates HTML5 validation plus custom messaging.
- Checkboxes + custom logic explainable for UX (visually consistent with tag-like selection) versus radios; in production, radios could be more semantically correct for single choice.

Notable CSS:
- Dedicated exam palette (`--exam-*`) to visually separate exam context from marketing.
- `.important-notice` callout with an inline SVG icon.

JS behavior (inline in HTML):
- Enforces single selection across group checkboxes.
- Validates form and prevents submission if invalid; logs a structured object for future integration.

---

## Accessibility notes (A11y)

- Skip links on pages (`.skip-link`) improve keyboard navigation.
- Buttons and toggles maintain `aria-label`, `aria-pressed`, and `aria-expanded` where applicable.
- Form controls are associated with `<label for>` and appropriate `autocomplete` hints.
- Color contrast in dark mode CSS uses light text and focused borders; always verify with tooling if you change colors.
- SVG icons include `aria-hidden` when decorative; where used as button content, the button carries descriptive labels.

Recommended improvements (future):
- Reduce inline style toggling (About page) in favor of class toggles and CSS states.
- Add `prefers-reduced-motion` media query variants to minimize animations for motion-sensitive users.

---

## Performance and UX considerations

- No external JS frameworks; pages load fast and work without JS for core reading (except interactive menus/forms).
- Use of CSS gradients and SVGs avoids heavy image assets.
- IntersectionObserver defers animations to when elements are visible.
- Fonts are loaded from Google Fonts via `preconnect` to reduce handshake time.

Tips:
- If you add heavy assets, prefer `loading="lazy"` on below-the-fold images.
- Keep CSS scoped to each page; consider extracting truly shared tokens into a global file only if you introduce a build step.

---

## How to extend

Components:
- New card variants: copy `.feature-card` or `.course-card` structure and adjust icon, title, and description; keep classes to inherit animations and spacing.
- Buttons: reuse `.btn` base + a variant. Prefer variables for colors.

Styles:
- Prefer adding tokens to `:root` on the page where they’re needed.
- Keep responsive behavior with Grid/Flex; align to existing breakpoints (`768px`, `640px`, `480px`).

Scripts:
- For menu toggles, prefer class toggles + ARIA updates instead of inline style mutations.
- For forms, validate with HTML5 features first (`required`, `type`, `pattern`) and then complement with JS.

Navigation:
- When adding a new page, ensure header nav links are updated across pages (these are static per page).

---

## File map

- landing/
  - index.html — marketing homepage and CTA
  - style.css — light theme, hero, features, footer
  - script.js — mobile nav, smooth scroll, intersection animations
- login/
  - login.html — tabs, sign-in, sign-up
  - login.css — dark glass theme
  - login.js — tab switch, password toggles, demo submits
- modules/
  - module.html — course grid and cards
  - module.css — dark product theme
  - module.js — minimal interactions (stubs)
- about us/
  - aboutus.html — story, mission, team
  - aboutus.css — light/dark sections, team grid
  - aboutus.js — mobile nav (inline style)
- contactus/
  - contact.html — contact form, FAQ
  - contact.css — form layout and focus styles
  - contact.js — submit simulation and nav toggle
- exam page/
  - exam-page.html — instructions + student form
  - exam-page.css — dedicated exam palette

---

Questions or changes to propose?
- Open an issue or PR. When editing shared tokens or nav, check all pages render correctly at mobile and desktop widths.
