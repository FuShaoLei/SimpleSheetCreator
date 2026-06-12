---
name: Voltage & Ink
colors:
  surface: '#171309'
  surface-dim: '#171309'
  surface-bright: '#3e392d'
  surface-container-lowest: '#110e05'
  surface-container-low: '#1f1b11'
  surface-container: '#231f14'
  surface-container-high: '#2e2a1e'
  surface-container-highest: '#393428'
  on-surface: '#ebe2d0'
  on-surface-variant: '#d1c6ab'
  inverse-surface: '#ebe2d0'
  inverse-on-surface: '#353024'
  outline: '#9a9078'
  outline-variant: '#4d4632'
  surface-tint: '#eec200'
  primary: '#ffecb9'
  on-primary: '#3c2f00'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#735c00'
  secondary: '#4de082'
  on-secondary: '#003919'
  secondary-container: '#00b55d'
  on-secondary-container: '#003e1c'
  tertiary: '#c7f5ff'
  on-tertiary: '#00363e'
  tertiary-container: '#33e4ff'
  on-tertiary-container: '#006270'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#6dfe9c'
  secondary-fixed-dim: '#4de082'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005227'
  tertiary-fixed: '#a0efff'
  tertiary-fixed-dim: '#15daf4'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e59'
  background: '#171309'
  on-background: '#ebe2d0'
  surface-variant: '#393428'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  editor-main:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  editor-chord:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.4'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  editor-padding: 40px
---

## Brand & Style
The design system is engineered for the high-intensity, low-light environment of the rehearsal studio and the stage. The brand personality is **edgy, technical, and uncompromising**. It draws from a "Dark Tech-Brutalist" aesthetic—combining the precision of developer tools with the raw energy of rock-and-roll.

The target audience consists of musicians, session players, and composers who need absolute clarity while maintaining a specific subcultural vibe. The UI should evoke a sense of professional equipment—sturdy, high-performance, and "always-on." 

**Design Style: Modern Brutalist x Glassmorphism**
- **Raw Surfaces:** Deep charcoal backgrounds provide a non-distracting canvas.
- **Electric Accents:** High-chroma neon highlights cut through the darkness to indicate interactivity.
- **Technical Utility:** A focus on monospaced precision ensures that chord charts and lyrics align perfectly, mimicking physical sheet music typed on a vintage machine or a modern terminal.

## Colors
This design system utilizes a high-contrast dark palette designed for legibility in dim environments.

- **Primary (Electric Yellow):** Reserved for critical actions, active states, and primary navigation. It represents the "energy" of the performance.
- **Secondary (Neon Green):** Used for success states, chord additions, and secondary rhythmic indicators.
- **Backgrounds:** A tiered system of `#0F172A` (deepest base) and `#111827` (elevated surfaces) to create subtle depth without losing the "near-black" aesthetic.
- **Accents:** Borders and inactive states use muted greys to keep the focus on the content.

## Typography
Typography is split between **interface navigation** and **content creation**.

1.  **The Interface (Hanken Grotesk & Inter):** Sharp, modern sans-serifs provide a professional, sleek feel for menus, settings, and headers.
2.  **The Editor (JetBrains Mono):** A monospaced font is mandatory for the sheet creator. This ensures that chords placed above lyrics maintain their horizontal position regardless of the characters used, essential for rhythmic accuracy.
3.  **Scale:** On mobile devices, `display-lg` should scale down to `32px` to prevent text wrapping on song titles.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy, reflecting the structured nature of music notation.

- **The Editor Canvas:** Centered with a fixed max-width (approx. 800px) to mimic a physical sheet of paper, using generous internal padding (`40px`) to ensure content doesn't feel cramped.
- **Sidebar Panels:** Used for the chord library and setlist management. These panels use a 4px-base spacing system to keep controls compact.
- **Breakpoints:** 
    - **Mobile (<768px):** Single column. Editor takes full width.
    - **Desktop (>768px):** Two-column layout with a fixed-width utility sidebar (left) and a fluid editor (center).

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional soft shadows.

- **Layer 0 (Base):** `#0F172A` (The floor).
- **Layer 1 (Cards/Panels):** `#111827` with a 1px border of `rgba(255,255,255,0.05)`.
- **Layer 2 (Modals/Overlays):** A semi-transparent background blur (Backdrop Filter: blur(12px)) with a slightly brighter border. This creates a "glass" effect that feels high-tech and premium.
- **Interactivity:** Elements do not "lift" (no shadow increase). Instead, they "glow." Hovering over a card increases the border opacity and adds a subtle Electric Yellow outer stroke.

## Shapes
The shape language is **industrial and disciplined**. 

- **Soft (0.25rem):** Used for standard buttons and input fields to provide a hint of modern refinement.
- **Sharp (0px):** Used for the main editor canvas and structural layout containers to emphasize a rugged, "unrefined" brutalist edge.
- **Pill (1rem+):** Reserved exclusively for "Status" indicators (e.g., "Live," "Draft") and "Tags" (e.g., "Chorus," "Bridge") to distinguish them from actionable buttons.

## Components
- **Primary Buttons:** High-contrast Electric Yellow (#FACC15) background with black text. On hover, the button should gain a slight outer glow of the same color.
- **Secondary Buttons:** Ghost style—transparent background with a 1px Electric Yellow border.
- **Chord Chips:** Small, monospaced blocks within the library. Active chords (selected for the current sheet) feature a Neon Green (#4ADE80) left-accent border.
- **Input Fields:** Darker than the surface (`#0A0F1D`), using a monospaced font for consistency. The focus state uses a 1px Neon Green border.
- **The "Active" Editor Line:** The line currently being edited in the sheet creator should have a subtle background highlight (`rgba(250, 204, 21, 0.05)`) and a vertical yellow "rhythm" bar on the far left.
- **Checkboxes:** Squared off (sharp corners) with a high-contrast Neon Green tick when active.