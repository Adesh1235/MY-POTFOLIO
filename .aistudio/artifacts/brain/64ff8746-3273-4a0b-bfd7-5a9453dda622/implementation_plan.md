# Editorial Portfolio Homepage Redesign — Reference Image Alignment

Recreate the homepage into an editorial magazine-grade writer's studio inspired by the uploaded reference composition—featuring the **"I WRITE THE THINGS PEOPLE REMEMBER."** headline with caramel italic accent, a cinematic writer's desk visual with floating handwritten notes and warm desk lamp glow, the minimal 4-statistic info row, and a seamless transition into the Selected Work portfolio showcase.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions incorporate your confirmed preferences alongside the reference image architecture:

- **Confirmed Decision 1 — Hero Headline**: **"I WRITE THE THINGS PEOPLE REMEMBER."** — Displayed in high-contrast editorial serif typography with tight line spacing, where `"REMEMBER."` is rendered in warm caramel-bronze italic serif (`#9C744A`), accompanied by the kicker `01 / ABOUT THE WRITER` and lead introduction: *"I'm Tanishq Sharma, a copywriter and content strategist who turns ideas into words with clarity, personality and purpose."*
- **Confirmed Decision 2 — Right Hero Visual**: **Cinematic Writer's Desk Scene with Floating Handwritten Notes & Warm Lamp Glow** — Recreates the exact scene from your reference: Tanishq in his pink-striped linen shirt and pearl choker necklace at his writer's desk holding a pen, surrounded by a warm architectural desk lamp, the black ceramic mug (*"Write. Think. Create. Repeat."*), stacked books (*The Creative Mind*, *Brand Stories*, *A Better Writer*, and *Happy With My Heartbreak*), pinned black-and-white portraits, and floating handwritten notes (*"Good words Create better Stories."* and *"Ideas Brands People Stories"*) with smooth mouse-follow parallax.
- **Confirmed Decision 3 — Bottom Hero Statistics Row**: **Minimal 4-Statistic Info Row** — Elegantly separated by thin hairline dividers:
  - `2` / Books
  - `50+` / Campaigns
  - `5+` / Industries
  - `∞` / Ideas
- **Confirmed Decision 4 — Selected Work Transition**: **Editorial Work Grid** — Smooth transition from the hero into `"Selected Work"` with supporting text *"A collection of identities, campaigns, digital experiences and visual experiments,"* displaying Tanishq's real Canva campaigns (*Tata CLiQ Fashion*, *GAS Milano India*, *The Drip Dept.*, *Miyo Dessert Bar*, *Ed-a-Mamma*) with 3D tilt, hover slide swaps, and full case study modals.

---

## 1. Overview & Core Concept

- **What It Delivers**: Transforms the personal portfolio homepage for **Tanishq Sharma** into a luxury editorial magazine experience that directly mirrors the composition, warmth, typography, and interactive depth of the uploaded reference photograph.
- **Target Audience**: Fashion & lifestyle brand directors, creative agency leaders, CMOs, and publishing collaborators seeking high-converting campaign copy, verbal identity systems, and narrative direction.
- **Key Value**: Provides an authentic, art-directed personal studio atmosphere rather than a generic tech portfolio template, showcasing real published books, real Canva campaigns, and interactive writer's artifacts with zero visual clutter.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Floating Glass Capsule Navigation**:
     - Positioned fixed top center with soft backdrop blur (`backdrop-blur-xl`), hairline border, and subtle drop shadow.
     - Left: `TANISHQ SHARMA.` with warm caramel accent dot.
     - Center: `Home`, `About`, `Work`, `Books`, `Contact` with active white pill indicator.
     - Right: Dark charcoal rounded pill button `Let's Talk ↗` with magnetic cursor effect.
  2. **Hero Section (Two-Column Editorial Composition)**:
     - **Left Column (45% Width)**:
       - Eyebrow tag: `01 / ABOUT THE WRITER` with circular icon.
       - Huge editorial serif headline:
         ```
         I WRITE
         THE THINGS
         PEOPLE
         REMEMBER.
         ```
         (`REMEMBER.` styled in warm caramel-bronze italic serif).
       - Positioning paragraph: *"I'm Tanishq Sharma, a copywriter and content strategist who turns ideas into words with clarity, personality and purpose."*
       - Primary CTA button: `Let's Get to Know Me ↗` (dark charcoal pill with white text and arrow).
       - Secondary subtle link: `Explore My Work →`
     - **Right Column (55% Width)**:
       - Large cinematic visual area capturing the writer's desk composition:
         - Soft warm architectural lamp glow with radiating light cone.
         - Tanishq Sharma portrait holding a fountain pen, wearing the pink-striped linen shirt and pearl choker necklace.
         - Floating handwritten sticky notes: `"Good words Create better Stories."` and `"Ideas Brands People Stories"`.
         - Writer's black ceramic mug with handwriting: `"Write. Think. Create. Repeat."`.
         - Stacked hardcover books including *Happy With My Heartbreak* and *Everythingship!*.
         - Pinned black-and-white photographs on the studio wall.
         - Foreground botanical leaves along the right border.
         - Smooth mouse-follow 3D parallax where foreground notes, character, and background wall move at calibrated z-depths.
     - **Bottom Statistics Row**:
       - Full-width minimal stat bar with 4 columns: `2 Books` · `50+ Campaigns` · `5+ Industries` · `∞ Ideas` separated by thin vertical dividers.
  3. **Scroll Transition & Selected Work**:
     - Smooth parallax transition as hero visual gently scales while the Selected Work section rises into view.
     - Section heading: `Selected Work` with italic subtitle *"A collection of identities, campaigns, digital experiences and visual experiments."*
     - Editorial layout pairing flagship case studies (*Tata CLiQ Fashion*, *GAS Milano India*, *The Drip Dept.*, *Ed-a-Mamma SS'26*) with discipline tags, hover slide swaps, and case study detail views.
  4. **Published Books & Writer's Journal**:
     - Direct showcase of *Happy With My Heartbreak* (July 2024) and *Everythingship!* (January 2020) with interactive excerpt reader modal and Amazon India links.
  5. **Contact & Project Commissioning**:
     - Clean editorial contact form with pre-filled scope options and direct WhatsApp/Email links.

- **Visual Identity & Color Palette**:
  - Background: Soft cream / warm paper ivory (`#F5F1E8` / `#F8F5EE`).
  - Text: Dark charcoal black (`#171614`).
  - Muted Text: Warm grey-brown (`#55524D` / `#777168`).
  - Accents: Warm caramel-bronze (`#9C744A` / `#8C5E3C`) and deep mahogany (`#653F3B`).
  - Glass: Translucent warm ivory with specular border (`rgba(255, 255, 255, 0.75)`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Faithful Recreation of Reference Visual Composition**:
  - *Chosen Approach*: Build a dedicated, cinematic `CinematicWriterDeskHero` component that combines high-resolution vector and photographic elements, floating sticky notes, the black ceramic mug, book stack, and warm lamp glow into a seamless responsive stage.
  - *Why*: Directly fulfills the user's explicit request to use the attached reference image as the primary visual and layout reference, while preserving their authentic identity, published books, and real portfolio work.
- **Decision 2 — Headline Hierarchy ("I WRITE THE THINGS PEOPLE REMEMBER.")**:
  - *Chosen Approach*: Render the exact headline hierarchy from the reference with tight line spacing (`leading-[0.92]`) and `"REMEMBER."` in caramel italic serif, with a subtle interactive click affordance to optionally cycle companion phrases (`CONVERT.`, `MOVE.`, `ENDURE.`).
  - *Why*: Delivers maximum typographic punch and instant alignment with the reference image while keeping the exact phrase selected by the user.
- **Decision 3 — Bottom Hero Statistics Row Placement**:
  - *Chosen Approach*: Place the minimal 4-item stats row (`2 Books` | `50+ Campaigns` | `5+ Industries` | `∞ Ideas`) directly below the hero split as a subtle, elegant row with thin dividers.
  - *Why*: Matches the reference image layout precisely and establishes authority before visitors scroll to Selected Work.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   App Shell & Floating Capsule Navigation                │
│    (TANISHQ SHARMA. · Home · About · Work · Books · Contact · Let's Talk)│
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                    Hero Section (Reference Composition)                  │
│  ┌─────────────────────────────────┐   ┌──────────────────────────────┐  │
│  │ Left Editorial Column           │   │ Right Cinematic Visual Stage │  │
│  │ • 01 / ABOUT THE WRITER         │   │ • Warm Lamp Glow & Cones     │  │
│  │ • I WRITE THE THINGS            │   │ • Portrait with Fountain Pen │  │
│  │   PEOPLE REMEMBER.              │   │ • Floating Sticky Notes      │  │
│  │ • Bio paragraph                 │   │ • Ceramic "Write" Mug        │  │
│  │ • "Let's Get to Know Me ↗" CTA  │   │ • Book Stack (*Heartbreak*)  │  │
│  │ • "Explore My Work →" Link      │   │ • Foreground Botanical Frame │  │
│  └─────────────────────────────────┘   └──────────────────────────────┘  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │ Minimal 4-Statistic Info Row: 2 Books · 50+ Campaigns · 5+ · ∞     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ (Smooth Cinematic Scroll)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│              Selected Work Section ("Ideas, Written Into Reality")       │
│  (Flagship Editorial Cards · Discipline Filters · Hover Slide Swap)      │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│        Published Books · Interactive Excerpt Reader · Contact Form       │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Interactive State Mapping**:
  - `mouseOffset`: Tracks normalized mouse position within the hero to drive smooth parallax translations across background wall prints ($z=-20\text{px}$), main portrait ($z=0$), floating sticky notes ($z=+35\text{px}$), and foreground coffee mug / books ($z=+50\text{px}$).
  - `activeNavSection`: Updates floating navbar pill state smoothly as user scrolls past sections (`home`, `about`, `work`, `books`, `contact`).
  - `scrollProgress`: Modulates slight scale-down of the hero visual as user scrolls into `Selected Work`.
