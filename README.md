# Bharat Parikrama — Clean Professional Travel UI

Redesign the frontend UI of my existing **Bharat Parikrama** travel planning web application.

## IMPORTANT: FIRST BUILD A CLEAN BASIC VERSION

At this stage, **DO NOT use heavy Bento UI, Glassmorphism, AI Bento layouts, complex animations, 3D effects, floating cards, or experimental layouts.**

We will add advanced UI effects later.

The current priority is:

**Clean structure → Correct spacing → No overlaps → Proper alignment → Professional typography → Consistent components → Responsive layout**

The existing UI currently has problems such as:

* components overlapping each other
* sections appearing too close together
* inconsistent spacing
* oversized or undersized elements
* poor visual hierarchy
* content touching screen edges
* inconsistent card sizes
* hero content and map not properly balanced
* navigation alignment issues
* sections visually merging into one another
* inconsistent image dimensions
* footer looking compressed
* excessive information appearing at once

Fix all of these problems.

---

# 1. DESIGN REFERENCE

Use the provided reference screenshots as the **visual direction**, but DO NOT copy them pixel-for-pixel.

The desired visual identity is:

**Modern India + Premium Travel + Clean Editorial Design + Route Intelligence**

The website should feel like a professionally designed Indian travel-tech platform.

Think:

**Indian tourism identity + modern SaaS usability + premium travel editorial design**

The design should look intentionally created by a professional UI/UX designer.

---

# 2. VISUAL STYLE

Use:

* Clean white / warm off-white background
* Deep navy text
* Royal blue as primary action color
* Muted gold/orange accents
* Very subtle warm Indian tones
* Thin borders
* Soft shadows
* Controlled border radius
* Plenty of whitespace

Avoid:

* Neon colors
* Purple AI gradients
* Excessive gradients
* Excessive shadows
* Glass cards
* Huge rounded containers
* Cartoon UI
* Random decorative blobs
* Overloaded cards
* Excessive icons
* Excessive animation

---

# 3. STRICT LAYOUT SYSTEM

Create a proper global container.

Use approximately:

```text
Maximum content width: 1200–1280px
Desktop horizontal padding: 48–64px
Tablet padding: 32px
Mobile padding: 16–20px
```

Every major section must align to the SAME container.

Do not allow some sections to touch the viewport while others are centered.

---

# 4. ABSOLUTELY NO OVERLAPPING COMPONENTS

This is extremely important.

NO component should overlap another component unless it is an intentionally positioned decorative element.

Do not use arbitrary:

```css
position: absolute;
top: ...
left: ...
margin-top: -...
transform: translate(...)
```

for normal page layout.

Use:

* CSS Grid
* Flexbox
* proper container widths
* gap
* padding
* margin
* responsive breakpoints

Sections must remain inside normal document flow.

---

# 5. SECTION SPACING

Give every major section enough breathing room.

Recommended:

```text
Major section spacing:
80–100px desktop
64–80px tablet
48–64px mobile

Card gap:
20–24px

Heading → description:
8–12px

Description → content:
24–32px
```

Do NOT place one section immediately against another.

---

# 6. HEADER / NAVBAR

Create a clean professional navbar similar in spirit to the reference.

LEFT:

Bharat Parikrama logo

Use:

**भारत परिक्रमा**

and smaller:

**BHARAT PARIKRAMA**

CENTER:

Home
Explore
Community
How It Works

RIGHT:

Login

Primary CTA:

**Plan Your Parikrama**

Navbar should have:

* proper vertical alignment
* approximately 72–80px height
* subtle bottom border
* white background
* comfortable spacing

Do not make navigation text tiny.

Do not allow buttons or links to touch each other.

---

# 7. HERO SECTION

This is the most important visual section.

Create a spacious **two-column hero**.

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│ LEFT CONTENT                     INDIA ROUTE VISUAL          │
│                                                             │
│ Bharat Parikrama                 [India Map]                │
│                                                             │
│ Pan-India Travel &               Srinagar ●                 │
│ Itinerary Optimization                 │                    │
│                                      Delhi ●                │
│ Smarter journeys.                     │                    │
│ Seamless experiences.             Mumbai ●                 │
│ Adaptive travel plans.                │                    │
│                                    Chennai ●                │
│                                                             │
│ [Plan Your Parikrama]                                        │
│ [Explore How It Works]                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Use approximately:

**Left: 42–45%**

**Right: 55–58%**

Do not center everything.

---

# 8. HERO TYPOGRAPHY

Small eyebrow:

**AI-POWERED INDIA TRAVEL PLANNING**

Main heading:

# BHARAT PARIKRAMA

Supporting heading:

## Pan-India Travel & Itinerary Optimization

Description:

**Smarter journeys. Seamless experiences. Adaptive travel plans across India.**

Primary CTA:

**Plan Your Parikrama →**

Secondary CTA:

**Explore How It Works**

Keep line lengths controlled.

Do not stretch text across the entire screen.

---

# 9. INDIA MAP HERO VISUAL

The right side should feature a clean stylized **India map**.

Do not use an extremely dark technical command-center map.

For the basic UI version, use:

* white / very light background
* subtle India outline
* thin route lines
* restrained blue/gold route accents
* simple city markers

Example cities:

Srinagar

Delhi

Jaipur

Ahmedabad

Mumbai

Varanasi

Kolkata

Guwahati

Bengaluru

Chennai

Add small transport illustrations/icons where appropriate:

✈ Flight

Train

Car

Ship/Ferry

Do NOT overcrowd the map.

The map should be understandable within 2–3 seconds.

---

# 10. INDIAN VISUAL IDENTITY

Add subtle Indian identity without making the website look traditional or outdated.

Possible visual details:

* simplified temple silhouette
* Indian railway motif
* coastal/ferry illustration
* small cultural illustration
* subtle Indian route line
* India map
* regional travel imagery

Use these sparingly.

The application is still a modern technology platform.

---

# 11. HERO BOTTOM DECORATIVE ROUTE

Take inspiration from the reference image.

At the bottom of the hero, optionally add a subtle curved travel line.

Along the route, small illustrations can represent:

Temple → Train → Culture → Airport → Coastal Travel

This should remain decorative and should NOT overlap hero content.

---

# 12. DO NOT PUT STATS ABOVE THE HERO

Current design shows cards such as:

28 States Covered

4-in-1 Transit Modes

4.9 Rating

above/inside the hero area.

Do NOT do this.

The hero should remain clean.

Place statistics in a separate section BELOW the hero.

---

# 13. QUICK STATS SECTION

Immediately after the hero:

```text
────────────────────────────────────────────

28+
States Covered

4
Travel Modes

100+
Destinations

AI
Smart Planning

────────────────────────────────────────────
```

Keep this section minimal.

Do not put each statistic inside a huge card.

---

# 14. EVERYTHING YOU NEED

Create a clean feature introduction.

Centered heading:

# Everything You Need for Your Journey

Supporting text:

**From planning your route to managing your stay, Bharat Parikrama keeps your entire journey organized.**

Then use a simple 3-column grid.

---

# 15. CORE FEATURE CARDS

First row:

### Multi-Modal Routing

Plan journeys using flights, trains, roads and maritime routes.

### Business Travel Mode

Organize professional travel around meetings and available free time.

### Smart Budget Planner

Track transportation, accommodation, food and activity expenses.

Second row:

### Smart Itinerary

Create organized day-wise travel plans.

### Explore Nearby

Discover places that fit into your available time.

### AI Travel Assistant

Get contextual help with your journey.

Keep cards simple.

No glassmorphism yet.

---

# 16. FEATURE CARD DESIGN

Feature cards should use:

White background

1px subtle border

16–20px radius

24–28px padding

Small icon

Strong title

2–3 lines description

Optional small link:

**Learn more →**

Do not make icons huge.

Do not use different bright colors for every card.

---

# 17. CURATED JOURNEYS SECTION

Create a visually strong section inspired by the second reference image.

Heading:

# Curated Bharat Circuits

Description:

**Thoughtfully planned journeys connecting India's culture, cities and experiences.**

Create large horizontal travel cards.

---

# 18. CURATED CIRCUIT CARD

Example:

### Ganga Heritage & Deccan Corridor

**New Delhi → Varanasi → Prayagraj → Ayodhya → Mumbai**

Top visual should contain two complementary images/illustrations.

LEFT:

Varanasi Ghats

RIGHT:

Vande Bharat

Below:

**8 Days / 7 Nights**

**Instant Itinerary**

Then:

### Integrated Modes of Transit

Use four clean small boxes:

✈ Flight

🚆 Vande Bharat

🚗 Private Cab

⛴ River Cruise

Then:

**Starting from**

# ₹24,999

/per person

CTA:

**Explore Circuit →**

---

# 19. CURATED CARD STRUCTURE

Do NOT squeeze all information together.

Use this spacing:

```text
IMAGE
↓ 24px

Metadata
↓ 12px

Journey Name
↓ 8px

Route
↓ 28px

Transport Modes
↓ 32px

Divider
↓ 24px

Price                 CTA
```

This is important.

---

# 20. COMMUNITY TRIPS

Create:

# Community Trips

**Browse itineraries shared by fellow travellers.**

Use a clean 3-column grid on desktop.

Do NOT use four extremely wide cards squeezed together.

Each card:

Large 16:9 image

Trip title

Route

Duration

Traveller name

Likes

Example:

**Golden Triangle in 6 Days**

Delhi → Agra → Jaipur → Delhi

6 Days

Priya Sharma

♡ 234

---

# 21. IMAGE CONSISTENCY

All images inside the same card type MUST use the same aspect ratio.

For Community:

16:9

For Destination cards:

4:3 or 3:2

For profile:

1:1

Never allow one image to become taller or shorter than neighboring cards.

Use:

```css
object-fit: cover;
```

---

# 22. DESTINATION SECTION

Create:

# Explore Bharat

Subtitle:

**From mountains and heritage cities to coastlines and spiritual destinations.**

Use destination cards for:

Goa

Jaipur

Udaipur

Shimla

Varanasi

Kerala

Cards should contain:

Image

Destination name

Category

Example:

**Jaipur**

Heritage

---

# 23. TESTIMONIALS

Current testimonial area is visually too dark and compressed.

Replace it with a clean light section.

Heading:

# Travellers Love Bharat Parikrama

Use 3 testimonial cards.

Each card:

★★★★★

Short quote

Profile photo

Name

City

Example:

“Bharat Parikrama made my multi-city journey much easier to organize.”

Avoid giant dark navy background.

---

# 24. CTA SECTION

Create a clean strong CTA near the bottom.

Use royal blue or deep navy background.

Heading:

# Start Planning Your Parikrama

Description:

**One journey. Multiple destinations. One intelligent travel companion.**

Buttons:

**Plan Your Trip →**

**Explore India**

Give this section substantial padding.

Do not compress it into a thin horizontal bar.

---

# 25. FOOTER

Create a spacious footer.

Dark navy background.

Four columns:

### Bharat Parikrama

Short description.

### Platform

Plan a Trip
Explore India
Community Trips
AI Assistant

### Travel

Hotels
Transport
Local Guides
Emergency Help

### Support

Contact
Help
Privacy
Terms

Bottom:

**© 2026 Bharat Parikrama. Made for journeys across India.**

Do NOT squeeze footer content.

Use at least 48–64px vertical padding.

---

# 26. BASIC CARD SYSTEM

Use only 3 card styles initially.

### Standard Card

For features.

### Image Card

For destinations/community.

### Journey Card

For curated travel circuits.

Do not create 10 different card designs.

Consistency first.

---

# 27. BUTTON SYSTEM

Use only three button types.

### Primary

Royal blue background

White text

Example:

**Plan Your Parikrama →**

### Secondary

White background

Dark text

Subtle border

### Text Button

No container.

Example:

**See all →**

Keep button height approximately:

44–48px.

---

# 28. RESPONSIVE DESIGN

The UI must remain clean at every screen size.

Desktop:

2-column hero

3-column features

3-column community

Tablet:

2-column grids

Smaller hero map

Mobile:

Single column

Hero text first

Map second

Cards stacked

Navigation collapsed

No horizontal overflow.

---

# 29. MOBILE HERO

Mobile layout:

```text
BHARAT PARIKRAMA

Pan-India Travel &
Itinerary Optimization

Description

[Plan Your Parikrama]

[Explore How It Works]


      INDIA MAP


Quick Stats
```

Do NOT attempt to keep desktop two-column layout on mobile.

---

# 30. OVERFLOW PROTECTION

Ensure:

```css
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
```

But do NOT use `overflow: hidden` to hide broken layouts.

Fix the actual component width.

All images should use:

```css
max-width: 100%;
height: auto;
```

Grid children should be allowed to shrink correctly.

---

# 31. TYPOGRAPHY

Use one clean modern sans-serif family.

Possible choices:

Inter

Manrope

DM Sans

Plus Jakarta Sans

Use approximately:

Hero heading:
56–64px desktop

Page heading:
36–44px

Section heading:
28–36px

Card title:
18–22px

Body:
15–17px

Metadata:
13–14px

On mobile scale typography properly.

---

# 32. VISUAL HIERARCHY

Every section should clearly follow:

```text
SECTION LABEL
      ↓
HEADING
      ↓
DESCRIPTION
      ↓
CONTENT
      ↓
ACTION
```

Do not place heading, buttons, cards and descriptions randomly.

---

# 33. USE WHITESPACE

Whitespace is intentional.

Do not try to fill every empty area.

The reference design works because the content has room to breathe.

The final website should feel calm and premium.

---

# 34. REMOVE CURRENT VISUAL CLUTTER

Specifically fix the current UI issues.

Remove:

* giant dark technical map panel
* compressed top statistics
* overlapping hero elements
* overly dense transport labels
* cards touching each other
* text touching container edges
* compressed testimonials
* thin CTA bar
* cramped footer
* inconsistent image heights
* unnecessary floating UI
* random badge placement

Keep the information, but present it more cleanly.

---

# 35. NO ADVANCED EFFECTS YET

For this first version:

DO NOT add:

Bento UI

AI Bento

Glassmorphism

3D cards

Parallax

Complex scroll animation

Animated background

Particle effects

Heavy gradients

Floating dashboard widgets

Advanced map animations

We will add these AFTER the basic design is visually correct.

---

# 36. ALLOWED MICRO-INTERACTIONS

Only simple interactions:

Button hover

Card hover

Image zoom of approximately 1.02

Navigation active state

Smooth dropdown

Smooth mobile menu

Simple 150–250ms transitions

Nothing more.

---

# 37. DEVELOPMENT RULE

Do NOT rebuild functionality.

Preserve:

Existing React logic

Existing routes

Existing APIs

Authentication

Forms

Database connections

Existing data

Existing functionality

Only reorganize and redesign the presentation layer where required.

---

# 38. IMPLEMENT IN PHASES

Do NOT redesign everything simultaneously.

### Phase 1

Global layout

Container

Typography

Colors

Navbar

Buttons

Spacing

### Phase 2

Hero + India Map

### Phase 3

Stats + Features

### Phase 4

Curated Journeys

### Phase 5

Explore + Community

### Phase 6

Testimonials + CTA + Footer

### Phase 7

Responsive fixes

After every phase, verify:

No overlap

No overflow

Correct spacing

Correct alignment

Responsive behavior

---

# FINAL EXPECTATION

The final basic UI should visually resemble the **quality and structure of the supplied Bharat Parikrama references**, especially:

* spacious hero
* prominent India map
* strong typography
* Indian travel identity
* blue + warm accent palette
* route visualization
* clean travel circuit cards
* clear transport-mode presentation
* large professional CTAs
* controlled information density

However, do NOT copy the references exactly.

Create an original Bharat Parikrama visual system based on the same level of professionalism.

The first version should prioritize:

**Structure > Effects**

**Spacing > Decoration**

**Readability > Animation**

**Consistency > Complexity**

**Professionalism > Flashiness**

Once this basic UI is perfect and completely responsive, we will separately add:

**Bento UI + AI Bento + Glassmorphism + advanced micro-interactions.**
