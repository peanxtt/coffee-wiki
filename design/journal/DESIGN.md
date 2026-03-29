# Design System: Editorial Excellence for the Specialty Coffee Archive

## 1. Overview & Creative North Star: "The Scholarly Roaster"
The Creative North Star for this design system is **The Scholarly Roaster**. This is not a typical wiki; it is a digital rare-books room dedicated to the craft of coffee. We are blending the high-end editorial density of *Monocle* magazine with the tactile, immersive warmth of a master roaster’s personal journal.

To break the "template" look, this system rejects the standard "centered-stack" layout. Instead, we utilize **intentional asymmetry**. Hero sections should feature off-center typography, overlapping high-resolution imagery of coffee textures, and "hanging" data points that bleed off the 8px grid. We prioritize "white space" (which in this system is "dark space") to create a sense of luxury and breathing room, ensuring the user feels they are consuming premium knowledge, not just raw data.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the "Maillard Reaction"—the browning of coffee beans. It is warm, deep, and carbon-tinted.

### Surface Hierarchy & Nesting
Instead of a flat grid, treat the UI as a series of physical layers. We use the Material surface-container tiers to define importance:
- **Primary BG (`#0F0B08`):** The "Floor." Used for the main page background.
- **Surface Container Low (`#1F1B17`):** Large sectioning blocks or subtle sidebars.
- **Surface Container (`#241F1B`):** Standard card surfaces for articles or wiki entries.
- **Surface Container High (`#2E2925`):** Interactive elements or "pinned" content that needs to sit closest to the user.

### The Rules of Boundary
- **The "No-Line" Rule:** We prohibit 1px solid borders for general sectioning. You must define boundaries through background color shifts. A `surface-container-low` section sitting on a `surface` background is enough to signify a transition.
- **The "Glass & Gradient" Rule:** For floating navigation or modals, use semi-transparent surface colors (`rgba(23, 19, 15, 0.8)`) with a `20px` backdrop-blur. This creates a "frosted espresso" effect that feels integrated into the page.
- **Signature Textures:** Apply a global 3% noise/grain overlay across the entire UI. For primary CTAs, use a subtle radial gradient from `primary` (`#FFB781`) to `primary-container` (`#CA7F42`) to mimic the oily sheen of a fresh roast.

---

## 3. Typography: The Editorial Voice
Typography is our primary tool for conveying authority. We avoid "standard" digital sans-serifs in favor of high-character faces.

- **Display (Cormorant Garamond, 300/600):** Our "Magazine" voice. Use for page titles and high-impact quotes. The 300 weight provides elegance; 600 provides a "tomes and archives" feel.
- **Section Headers (Fraunces, Variable):** Our "Journalist" voice. Use Fraunces for h2-h4 headers. Leverage its variable optical size; larger sizes should feel more "Display-like" (soft and curvy), while smaller sizes should be sharper for legibility.
- **Body (Instrument Sans):** Our "Curator" voice. This is a sophisticated, slightly condensed sans-serif that avoids the clinical feel of Inter. Use for all long-form wiki content.
- **Data/Stats (Geist Mono):** Our "Scientific" voice. Use for roast levels, altitudes, and extraction times. It provides a technical counterpoint to the organic serif fonts.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking" the surface tiers. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural "sunken" or "lifted" feel without artificial shadows.
- **Ambient Shadows:** When a floating effect is required (e.g., a dropdown), use a warm-tinted shadow: `0 4px 24px rgba(194, 120, 60, 0.08)`. This mimics ambient light reflecting off a wooden table.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (`#534439`) at **20% opacity**. This creates a "suggestion" of a line rather than a hard boundary.

---

## 5. Components & Primitive Styles

### Buttons
- **Primary:** Sharp corners (0px-2px). Background: `primary` gradient. Text: `on-primary` (`#4E2500`).
- **Secondary:** Sharp corners. Ghost style with a `Ghost Border` and `Text Primary`.
- **Interaction:** On hover, primary buttons should shift from a gradient to a solid `primary_fixed_dim`. **Never use pill shapes.**

### Cards & Lists
- **Cards:** Forbid divider lines. Separate content using `spacing-6` (2rem) or a subtle shift from `surface-container` to `surface-container-high`.
- **Radius:** Strictly `4px` (Small Scale). It feels architectural and intentional.

### Input Fields
- **Styling:** Underline-only or subtle `surface-container-highest` background. No full-box borders.
- **Labels:** Use `label-md` (Geist Mono) in `accent` (`#C2783C`) for a technical, labeled-archive look.

### Specialized Component: The "Roast Scale"
- A horizontal tracking component using `Geist Mono` for data points. Use a gradient bar transitioning from `tertiary_container` to `primary` to represent the roast spectrum.

---

## 6. Do’s and Don’ts

### Do:
- **Do** lean into extreme typographic scale. A `3.5rem` display header next to a `0.75rem` mono label creates professional tension.
- **Do** use `Instrument Sans` for all functional text to ensure the "scholarly" look doesn't sacrifice readability.
- **Do** use "hanging" elements—images or text boxes that break the vertical alignment of the main column.

### Don't:
- **Don't** use standard 1px borders to separate content. It breaks the immersive "journal" feel.
- **Don't** use pure black (`#000`) or pure white (`#FFF`). Only use the defined warm neutrals to maintain the "amber-lit" atmosphere.
- **Don't** use pill-shaped buttons or large border-radii. This system is "Sharp & Editorial," not "Soft & App-like."
- **Don't** use standard icons (like Material Icons) in their default state. Customize icon weights to be thin (`100-200`) to match the elegance of Cormorant Garamond.