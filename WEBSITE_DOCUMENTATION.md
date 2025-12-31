# PrepX Website - Complete Documentation

## Website Overview

**PrepX** is an online examination platform with multiple interconnected pages providing information, authentication, course modules, and company details.

## File Structure

```
Project1/
├── landing/          # Main homepage (index.html, style.css, script.js)
├── login/            # Authentication (login.html, login.css, login.js)
├── modules/          # Course modules (module.html, module.css, module.js)
├── about us/         # Company info (aboutus.html, aboutus.css, aboutus.js)
└── contactus/        # Contact form (contact.html, contact.css, contact.js)
```

## HTML Tags and Their Purposes

### Document Structure

- `<!DOCTYPE html>`: Declares HTML5 document type
- `<html lang="en">`: Root element with language attribute
- `<head>`: Contains metadata, CSS, and JavaScript links
- `<body>`: Contains all visible page content

### Content Organization

- `<header>`: Page header with navigation and branding
- `<nav>`: Navigation menu with links
- `<main>`: Main page content
- `<section>`: Thematic content sections
- `<footer>`: Page footer with links and info

### Text Elements

- `<h1>` to `<h6>`: Heading hierarchy
- `<p>`: Paragraphs of text
- `<span>`: Inline text styling
- `<div>`: Content containers

### Forms

- `<form>`: Form container with submission handling
- `<input>`: Various input types (text, email, password, etc.)
- `<label>`: Form field labels
- `<select>` and `<option>`: Dropdown menus
- `<textarea>`: Multi-line text input
- `<button>`: Clickable buttons

### Lists and Links

- `<ul>` and `<li>`: Unordered lists
- `<a>`: Hyperlinks and navigation

### Accessibility

- `<a class="skip-link">`: Skip to main content for keyboard users
- `<svg>`: Scalable vector graphics for icons

## CSS Properties and Styling

### CSS Variables (Custom Properties)

#### Landing Page CSS Variables

```css
:root {
  /* Colors - HSL format */
  --background: hsl(250, 100%, 98%);
  --foreground: hsl(240, 10%, 9%);
  --primary: hsl(262, 83%, 58%);
  --primary-foreground: hsl(0, 0%, 100%);
  --primary-glow: hsl(262, 100%, 78%);
  --primary-light: hsl(262, 83%, 95%);
  --secondary: hsl(220, 14.3%, 95.9%);
  --muted: hsl(220, 14.3%, 95.9%);
  --muted-foreground: hsl(220, 8.9%, 46.1%);
  --border: hsl(220, 13%, 91%);
  --hero-bg: hsl(240, 10%, 9%);
  --hero-text: hsl(0, 0%, 100%);

  /* Gradients */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(262, 83%, 58%),
    hsl(262, 100%, 78%)
  );
  --gradient-hero: linear-gradient(
    135deg,
    hsl(240, 10%, 9%),
    hsl(240, 15%, 15%)
  );
  --gradient-warm: linear-gradient(
    135deg,
    hsl(262, 83%, 95%),
    hsl(262, 100%, 78%)
  );
  --gradient-glass: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0.05)
  );
  --gradient-card: linear-gradient(
    145deg,
    hsl(0, 0%, 100%),
    hsl(250, 100%, 99%)
  );

  /* Shadows */
  --shadow-elegant: 0 25px 50px -12px hsla(262, 83%, 58%, 0.25);
  --shadow-glass: 0 8px 32px hsla(240, 10%, 9%, 0.12);
  --shadow-soft: 0 4px 24px hsla(240, 10%, 9%, 0.08);
  --shadow-glow: 0 0 60px hsla(262, 83%, 58%, 0.3);

  /* Transitions */
  --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### Login Page CSS Variables

```css
:root {
  --bg: #0b1020;
  --panel: #0f162e;
  --panel-2: #131b38;
  --text: #e6e8f0;
  --muted: #a5acc5;
  --primary: #5b8cff;
  --primary-600: #4a78e6;
  --ring: rgba(91, 140, 255, 0.4);
  --success: #22c55e;
  --danger: #ef4444;
}
```

#### Contact & Modules Page CSS Variables

```css
:root {
  --background: hsl(250, 100%, 98%);
  --foreground: hsl(240, 10%, 9%);
  --primary: hsl(262, 83%, 58%);
  --primary-foreground: hsl(0, 0%, 100%);
  --primary-glow: hsl(262, 100%, 78%);
  --primary-light: hsl(262, 83%, 95%);
  --secondary: hsl(220, 14.3%, 95.9%);
  --muted: hsl(220, 14.3%, 95.9%);
  --muted-foreground: hsl(220, 8.9%, 46.1%);
  --border: hsl(220, 13%, 91%);
  --hero-bg: hsl(240, 10%, 9%);
  --hero-text: hsl(0, 0%, 100%);
  --gradient-primary: linear-gradient(
    135deg,
    hsl(262, 83%, 58%),
    hsl(262, 100%, 78%)
  );
  --gradient-hero: linear-gradient(
    135deg,
    hsl(240, 10%, 9%),
    hsl(240, 15%, 15%)
  );
  --gradient-glass: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0.05)
  );
  --gradient-card: linear-gradient(
    145deg,
    hsl(0, 0%, 100%),
    hsl(250, 100%, 99%)
  );
  --shadow-soft: 0 4px 24px hsla(240, 10%, 9%, 0.08);
  --shadow-glow: 0 0 60px hsla(262, 83%, 58%, 0.3);
  --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

```css
:root {
  --background: hsl(250, 100%, 98%);
  --primary: hsl(262, 83%, 58%);
  --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Layout Properties

- `display`: flex, grid, block, inline, none
- `position`: static, relative, absolute, fixed, sticky
- `flexbox`: justify-content, align-items, flex-direction, gap
- `grid`: grid-template-columns, grid-template-rows, gap

### Page-Specific CSS Classes and Properties

#### Landing Page CSS Classes

```css
/* Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(16px);
  background: var(--gradient-glass);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gradient-primary);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-soft);
}

/* Hero Section */
.hero {
  background: var(--gradient-hero);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 700;
  color: var(--hero-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Feature Cards */
.feature-card {
  position: relative;
  background: var(--gradient-card);
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-spring);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.btn-cta {
  background: var(--gradient-primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-soft);
}
```

#### Login Page CSS Classes

```css
/* Background Elements */
.auth-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: -1;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  opacity: 0.3;
}

/* Form Container */
.auth-container {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
}

/* Form Elements */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--panel);
  color: var(--text);
  transition: var(--transition-smooth);
}

/* Tab System */
.auth-tabs {
  display: flex;
  background: var(--panel-2);
  border-radius: 0.75rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
}

.auth-tab {
  flex: 1;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--muted);
  transition: var(--transition-smooth);
}

.auth-tab.active {
  background: var(--panel);
  color: var(--text);
  box-shadow: var(--shadow-soft);
}
```

#### Modules Page CSS Classes

```css
/* Course Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

/* Course Cards */
.course-card {
  background: var(--gradient-card);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-smooth);
}

.course-header {
  padding: 2rem;
  color: white;
  position: relative;
}

.blue-gradient {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
.teal-gradient {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}
.purple-gradient {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}
.cyan-gradient {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

/* Course Content */
.course-content {
  padding: 2rem;
  background: white;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.premium-badge {
  background: var(--gradient-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}
```

#### Contact Page CSS Classes

```css
/* Contact Form */
.contact-section {
  padding: 8rem 0 4rem;
  background: var(--background);
}

.contact-container {
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  background: var(--gradient-card);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: var(--shadow-soft);
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

/* Input Styling */
.form-field input,
.form-field select,
.form-field textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: var(--transition-smooth);
  background: white;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Submit Button */
.submit-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  width: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}
```

#### About Us Page CSS Classes

```css
/* Hero Section */
.hero {
  background: var(--gradient-hero);
  padding: 8rem 0 4rem;
  text-align: center;
  color: var(--hero-text);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--gradient-glass);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Team Section */
.team-section {
  padding: 6rem 0;
  background: var(--background);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.team-member {
  background: var(--gradient-card);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-smooth);
}

.team-member:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-elegant);
}

.member-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: var(--gradient-primary);
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
}
```

### Spacing and Sizing

- `margin` and `padding`: Element spacing
- `width` and `height`: Element dimensions
- `max-width` and `min-width`: Size constraints

### Complete CSS Properties Reference

#### Box Model Properties

```css
/* Margins - Space outside elements */
margin: 0; /* All sides */
margin: 1rem 2rem; /* Top/bottom, left/right */
margin: 1rem 2rem 3rem 4rem; /* Top, right, bottom, left */
margin-top: 1rem;
margin-right: 2rem;
margin-bottom: 3rem;
margin-left: 4rem;

/* Padding - Space inside elements */
padding: 0.75rem 1.5rem; /* Top/bottom, left/right */
padding: 1rem 2rem 1.5rem; /* Top, left/right, bottom */
padding-top: 1rem;
padding-right: 1.5rem;
padding-bottom: 2rem;
padding-left: 1.5rem;

/* Dimensions */
width: 100%; /* Full width */
width: 350px; /* Fixed width */
width: minmax(350px, 1fr); /* CSS Grid minmax */
height: 100vh; /* Full viewport height */
height: auto; /* Auto height */
min-height: 100vh; /* Minimum height */
max-width: 1400px; /* Maximum width */
min-width: 320px; /* Minimum width */
```

#### Layout and Positioning

```css
/* Display */
display: flex; /* Flexible box layout */
display: grid; /* CSS Grid layout */
display: block; /* Block element */
display: inline; /* Inline element */
display: none; /* Hidden element */
display: inline-flex; /* Inline flexbox */
display: inline-grid; /* Inline grid */

/* Position */
position: static; /* Default positioning */
position: relative; /* Relative to normal position */
position: absolute; /* Absolute positioning */
position: fixed; /* Fixed to viewport */
position: sticky; /* Sticky positioning */

/* Flexbox Properties */
justify-content: center; /* Main axis alignment */
justify-content: space-between;
justify-content: space-around;
justify-content: flex-start;
justify-content: flex-end;

align-items: center; /* Cross axis alignment */
align-items: flex-start;
align-items: flex-end;
align-items: stretch;
align-items: baseline;

flex-direction: row; /* Main axis direction */
flex-direction: column;
flex-direction: row-reverse;
flex-direction: column-reverse;

gap: 1rem; /* Space between flex items */
gap: 1rem 2rem; /* Row gap, column gap */

/* Grid Properties */
grid-template-columns: 1fr 1fr; /* Two equal columns */
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
grid-template-rows: auto 1fr auto; /* Three rows */
grid-gap: 2rem; /* Grid gap */
gap: 2rem; /* Modern grid gap */
```

#### Colors and Backgrounds

```css
/* Color Values */
color: #ffffff; /* Hex color */
color: rgb(255, 255, 255); /* RGB color */
color: rgba(255, 255, 255, 0.8); /* RGBA with opacity */
color: hsl(262, 83%, 58%); /* HSL color */
color: hsla(262, 83%, 58%, 0.8); /* HSLA with opacity */
color: white; /* Named color */
color: transparent; /* Transparent */
color: currentColor; /* Inherit from parent */

/* Background Properties */
background-color: var(--primary);
background-image: url("image.jpg");
background-size: cover; /* Cover entire element */
background-size: contain; /* Fit within element */
background-position: center; /* Center background */
background-repeat: no-repeat; /* No repetition */
background-attachment: fixed; /* Fixed background */

/* Gradients */
background: linear-gradient(135deg, #7c3aed, #3b82f6);
background: radial-gradient(circle, #7c3aed, transparent);
background: conic-gradient(from 0deg, #7c3aed, #3b82f6, #7c3aed);

/* Multiple Backgrounds */
background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent),
  url("pattern.svg");
```

#### Typography

```css
/* Font Properties */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-size: 1rem; /* Base font size */
font-size: 1.125rem; /* Larger text */
font-size: 0.875rem; /* Smaller text */
font-size: clamp(1rem, 2vw, 1.5rem); /* Responsive font size */
font-weight: 400; /* Normal weight */
font-weight: 500; /* Medium weight */
font-weight: 600; /* Semi-bold */
font-weight: 700; /* Bold */
font-weight: 800; /* Extra bold */
font-weight: 900; /* Black weight */

/* Text Properties */
line-height: 1.6; /* Line spacing */
line-height: 1.2; /* Tighter spacing */
text-align: left; /* Text alignment */
text-align: center;
text-align: right;
text-align: justify;

text-decoration: none; /* Remove underlines */
text-decoration: underline; /* Add underline */
text-transform: uppercase; /* Uppercase text */
text-transform: lowercase; /* Lowercase text */
text-transform: capitalize; /* Capitalize words */

letter-spacing: -0.02em; /* Letter spacing */
word-spacing: 0.1em; /* Word spacing */
white-space: nowrap; /* Prevent line breaks */
overflow: hidden; /* Hide overflow */
text-overflow: ellipsis; /* Add ellipsis for overflow */
```

#### Borders and Shadows

```css
/* Border Properties */
border: 1px solid var(--border); /* Complete border */
border-width: 2px; /* Border width */
border-style: solid; /* Border style */
border-color: var(--primary); /* Border color */
border-radius: 0.75rem; /* Rounded corners */
border-radius: 1rem 0.5rem 0.25rem 0.125rem; /* Individual corners */
border-top-left-radius: 1rem; /* Top-left corner */
border-bottom-right-radius: 0.5rem; /* Bottom-right corner */

/* Individual Borders */
border-top: 1px solid var(--border);
border-right: 2px solid var(--primary);
border-bottom: 1px solid var(--border);
border-left: 2px solid var(--primary);

/* Shadow Properties */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Basic shadow */
box-shadow: 0 25px 50px -12px hsla(262, 83%, 58%, 0.25); /* Colored shadow */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* Multiple shadows */

/* Text Shadow */
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
```

#### Transitions and Animations

```css
/* Transition Properties */
transition: all 0.3s ease; /* All properties */
transition: transform 0.3s ease; /* Specific property */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Custom timing */
transition-property: transform, opacity; /* Multiple properties */
transition-duration: 0.3s; /* Duration */
transition-timing-function: ease; /* Timing function */
transition-delay: 0.1s; /* Delay */

/* Transform Properties */
transform: translateX(10px); /* Move horizontally */
transform: translateY(-5px); /* Move vertically */
transform: translate(10px, -5px); /* Move both directions */
transform: scale(1.1); /* Scale up */
transform: scale(0.9); /* Scale down */
transform: rotate(45deg); /* Rotate */
transform: skew(10deg); /* Skew */
transform: translateY(-2px) scale(1.02); /* Multiple transforms */

/* Animation Properties */
animation: float 6s ease-in-out infinite; /* Animation shorthand */
animation-name: float; /* Animation name */
animation-duration: 6s; /* Duration */
animation-timing-function: ease-in-out; /* Timing function */
animation-iteration-count: infinite; /* Repeat count */
animation-direction: alternate; /* Direction */
animation-fill-mode: both; /* Fill mode */
animation-play-state: running; /* Play state */

/* Keyframes */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.8;
  }
}
```

#### Filters and Effects

```css
/* Backdrop Filter */
backdrop-filter: blur(16px); /* Blur background */
-webkit-backdrop-filter: blur(16px); /* Webkit prefix */
backdrop-filter: brightness(1.2); /* Brightness */
backdrop-filter: contrast(1.1); /* Contrast */
backdrop-filter: saturate(1.5); /* Saturation */

/* CSS Filters */
filter: blur(2rem); /* Blur element */
filter: brightness(1.2); /* Brightness */
filter: contrast(1.1); /* Contrast */
filter: grayscale(0.5); /* Grayscale */
filter: hue-rotate(180deg); /* Hue rotation */
filter: invert(0.1); /* Invert colors */
filter: opacity(0.8); /* Opacity */
filter: saturate(1.5); /* Saturation */
filter: sepia(0.3); /* Sepia effect */

/* Opacity */
opacity: 0.8; /* 80% opacity */
opacity: 0; /* Fully transparent */
opacity: 1; /* Fully opaque */
```

#### Responsive Design

```css
/* Media Queries */
@media (max-width: 1024px) {
  /* Tablet and below */
  .container {
    padding: 0 1rem;
  }
  .hero-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  /* Mobile landscape */
  .features-grid {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  /* Mobile portrait */
  .hero {
    padding-top: 5rem;
  }
  .hero-content {
    padding: 4rem 0;
  }
}

/* Viewport Units */
width: 100vw; /* Full viewport width */
height: 100vh; /* Full viewport height */
width: 50vw; /* Half viewport width */
height: 50vh; /* Half viewport height */

/* Container Queries (Modern) */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}

/* Feature Queries */
@supports (display: grid) {
  .layout {
    display: grid;
  }
}

@supports not (display: grid) {
  .layout {
    display: flex;
  }
}
```

#### Pseudo-classes and Pseudo-elements

```css
/* Pseudo-classes */
:hover {
  transform: translateY(-2px);
} /* Mouse hover */
:focus {
  outline: 2px solid var(--primary);
} /* Keyboard focus */
:active {
  transform: scale(0.98);
} /* Mouse click */
:first-child {
  margin-top: 0;
} /* First child */
:last-child {
  margin-bottom: 0;
} /* Last child */
:nth-child(odd) {
  background: var(--muted);
} /* Odd children */
:nth-child(even) {
  background: white;
} /* Even children */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
} /* Disabled state */
:checked {
  background: var(--primary);
} /* Checked checkbox/radio */

/* Pseudo-elements */
::before {
  content: "★";
} /* Before element */
::after {
  content: "→";
} /* After element */
::first-letter {
  font-size: 2em;
} /* First letter */
::first-line {
  font-weight: bold;
} /* First line */
::selection {
  background: var(--primary);
  color: white;
} /* Text selection */
```

### Colors and Backgrounds

- Color values: Hex, RGB, HSL, keywords
- Backgrounds: solid colors, images, gradients
- Gradients: linear-gradient(), radial-gradient()

### Typography

- Font properties: font-family, font-size, font-weight, line-height
- Text properties: text-align, text-decoration, letter-spacing

### Borders and Shadows

- Border: border, border-radius, border-color
- Shadows: box-shadow with offset, blur, and color

### Transitions and Animations

- Transitions: smooth property changes
- Animations: @keyframes and animation properties

### Responsive Design

- Media queries: @media (max-width: 768px)
- Viewport units: vw, vh
- Breakpoints: 1024px, 768px, 640px

### Advanced Features

- backdrop-filter: blur effects
- transform: translate, rotate, scale, skew
- clip-path: custom shapes

### CSS Utility Classes and Common Properties

#### Typography Utilities

```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 2rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.section-description {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--muted-foreground);
  max-width: 64rem;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
}
```

#### Layout Utilities

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.glass {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: var(--gradient-glass);
  border: 1px solid hsla(0, 0%, 100%, 0.2);
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 0.5rem;
  z-index: 10000;
}
```

#### Animation and Transition Utilities

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating-element {
  position: absolute;
  border-radius: 1rem;
  animation: float 6s ease-in-out infinite;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
}

@keyframes ripple-animation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

#### Responsive Design Utilities

```css
/* Mobile Menu Styles */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 1.5rem;
  height: 2px;
  background: var(--hero-text);
  transition: var(--transition-smooth);
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .nav,
  .student-access {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .hero-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 5rem;
  }
  .hero-content {
    padding: 4rem 0;
  }
}
```

#### Form and Input Utilities

```css
.form-field label {
  font-weight: 500;
  color: var(--foreground);
  font-size: 0.875rem;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--muted-foreground);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: var(--transition-smooth);
}
```

#### Button Variants

```css
.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-hero {
  background: rgba(255, 255, 255, 0.1);
  color: var(--hero-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
}

.btn-ghost {
  background: transparent;
  color: var(--hero-text);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--border);
  color: var(--foreground);
}

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: white;
  color: var(--foreground);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-decoration: none;
}
```

#### Card and Component Utilities

```css
.feature-icon-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  background: var(--gradient-primary);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-spring);
}

.feature-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 6rem;
  height: 6rem;
  background: var(--gradient-primary);
  opacity: 0.05;
  border-radius: 50%;
  filter: blur(2rem);
}

.feature-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: var(--transition-spring);
  border-radius: 0 0 1.5rem 1.5rem;
}
```

#### Footer and Navigation Utilities

```css
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-column h3 {
  color: var(--hero-text);
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--hero-text);
  text-decoration: none;
  transition: var(--transition-smooth);
  font-size: 0.875rem;
}
```

## JavaScript Functions and Functionality

### Event Handling

- `addEventListener`: Attach event handlers
- Events: click, submit, DOMContentLoaded, scroll, resize

### DOM Manipulation

- Element selection: getElementById, querySelector, querySelectorAll
- Class manipulation: classList.add/remove/toggle/contains
- Content manipulation: textContent, innerHTML, value

### Form Handling

- Form submission with preventDefault()
- Input validation and processing
- Form data collection and submission

### Tab Switching System

- Switch between different content sections
- Update tab states and content visibility

### Mobile Menu Toggle

- Show/hide navigation on mobile devices
- Toggle menu visibility and icon state
- Update ARIA attributes for accessibility

### Password Visibility Toggle

- Switch input type between "password" and "text"
- Update button text and accessibility

### Smooth Scrolling

- Animate navigation between page sections
- Intercept anchor links for smooth scrolling

### Intersection Observer

- Trigger animations when elements come into view
- Watch for element visibility and add animation classes

### Local Storage

- Store user preferences and data locally
- Remember email, user settings, form data

### Social Login Simulation

- Simulate social media login for demonstration
- Show alerts and redirect to main page

## Page-by-Page Breakdown

### 1. Landing Page (landing/index.html)

**Structure**: Header, Hero Section, Features, Footer
**Features**: Responsive navigation, hero content, feature cards, CTA buttons
**JavaScript**: Mobile menu, smooth scrolling, scroll animations, modal management

### 2. Login Page (login/login.html)

**Structure**: Brand header, tab system, social login, form fields
**Features**: Tab switching, password toggle, form validation, social integration
**JavaScript**: Tab management, form handling, password visibility, social login

### 3. Modules Page (modules/module.html)

**Structure**: Header, course grid, course cards, footer
**Features**: Course display, pricing information, chapter counts, access buttons
**JavaScript**: Mobile navigation, course interaction, dynamic content

### 4. About Us Page (about us/aboutus.html)

**Structure**: Header, hero, about, mission, team, CTA, footer
**Features**: Company information, team profiles, mission statement
**JavaScript**: Mobile menu, scroll effects, interactive elements

### 5. Contact Page (contactus/contact.html)

**Structure**: Header, contact form, FAQ section, footer
**Features**: Contact form, query categories, priority levels, FAQ
**JavaScript**: Form handling, mobile navigation, validation, success messages

## Responsive Design

### Mobile-First Approach

- Breakpoints: 320px-640px (mobile), 641px-1024px (tablet), 1025px+ (desktop)
- Techniques: Flexbox, CSS Grid, Media Queries, Viewport Units
- Optimizations: Touch-friendly targets, readable text, simplified navigation

### Adaptive Layouts

- Container system with fixed max-width and responsive padding
- Grid adaptations from single column (mobile) to multi-column (desktop)

## Accessibility Features

### Semantic HTML

- Proper heading hierarchy and landmark structure
- ARIA attributes for screen reader support
- Associated form labels and proper input types

### Keyboard Navigation

- Visible focus indicators and logical tab order
- Skip links and keyboard shortcuts
- Screen reader support with alt text and status messages

## Best Practices

### Code Organization

- Separation of concerns (HTML, CSS, JavaScript)
- Consistent naming conventions
- Modular CSS architecture
- Reusable components

### Performance Optimization

- Font preloading and CSS optimization
- Efficient JavaScript with event delegation
- Progressive enhancement approach

### Security Considerations

- Input validation and form security
- Secure authentication practices
- Data sanitization and CSRF protection

## Conclusion

The PrepX website demonstrates modern web development practices with focus on user experience, accessibility, performance, and maintainability. It serves as an excellent learning resource for HTML structure, CSS styling, JavaScript functionality, and responsive design principles.
