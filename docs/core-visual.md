# Core Visual Identity

## Colors

### Brand
1. **Primary Light**: `#0F8A36`  
   - Use for hover and emphasis states (buttons, links, hover, focused icons, etc.)

2. **Primary**: `#0D6D2B`  
   - Core brand accent, used to signal action and identity  
   - Primary CTAs, active states, links, logo accent, cursor mark, key icons  
   - Never use as a large background fill

3. **Primary Dark**: `#075520`  
   - Dark support green for depth and contrast  
   - Used for pressed states, dark UI surfaces, secondary emphasis

4. **Primary Soft**: `#E6F2EB`  
   - Soft brand tint for subtle backgrounds  
   - Used for highlight panels, badges, background accents behind content  
   - Never pair with high-saturated colors

5. **Primary Muted**: `#9BBFA9`  
   - Muted brand tone for disabled or low emphasis states  
   - Used for disabled buttons, inactive icons, secondary indicators

### Neutral (Light Mode)
6. **Background**: `#FAFBF9`  
   - Primary background for light mode layouts  
   - Use for page backgrounds

7. **Surface**: `#FFFFFF`  
   - Elevated surface colour for cards and containers  
   - Use for cards, modals, panels, etc.

8. **Border**: `#E4EAE6`  
   - Subtle divider color for structure without noise  
   - Use for borders, dividers, table lines, input outlines

9. **Text Primary**: `#1A1F1C`  
   - Primary text color for high readability in light mode  
   - Use for headings, body text, labels

10. **Text Secondary**: `#5E6B63`  
    - Reduced emphasis text color  
    - Use for supporting copy, captions, helper text

### Neutral (Dark Mode)
11. **Background**: `#0E1110`  
    - Primary dark mode background  
    - Use for dark mode page backgrounds

12. **Surface**: `#141A17`  
    - Elevated surface colors in dark mode  
    - Use for cards, containers, modals

13. **Text Primary**: `#E7ECE9`  
    - High contrast text color for dark mode  
    - Use for headings and body text

14. **Text Muted**: `#9AA5A0`  
    - Reduced emphasis text in dark interfaces  
    - Use for secondary text, captions

15. **Accent**: `#2FA86A`  
    - Lifted green for accessibility in dark mode  
    - Used in place of brand color in dark mode

### Secondary
16. **Accent**: `#EDE7DB`  
    - Warm neutral accent to add softness and depth  
    - Use for section backgrounds, editorial layouts, highlight blocks  
    - Never combine with strong saturated colors

### Gradients
17. **Brand Primary**  
    - From `#0D6D2B` to `#075520`  
    - Angle: 135°  
    - Used for hero accents, CTA backgrounds, featured surfaces

18. **Accent Background**  
    - Neutral Light Background to Secondary Accent: 135°

19. **Dark Background**  
    - Neutral Dark Background to Neutral Dark Surface: 135°  
    - Use for backgrounds

20. **Light Background**  
    - Neutral Light Background to Neutral Light Surface: 135°  
    - Use for backgrounds

## Fonts

### Headings (Saira)
1. **H1**  
   - Weight: Medium  
   - Size: 48px  
   - Line Height: Automatic  
   - Letter Spacing: -2  
   - Case: Original

2. **H2**  
   - Weight: ExtraBold  
   - Size: 40px  
   - Line Height: Automatic  
   - Letter Spacing: -2  
   - Case: Original

3. **H3**  
   - Weight: Regular  
   - Size: 32px  
   - Line Height: Automatic  
   - Letter Spacing: -2  
   - Case: Original

4. **H4**  
   - Weight: Medium  
   - Size: 28px  
   - Line Height: Automatic  
   - Letter Spacing: -1  
   - Case: Original

5. **H5**  
   - Weight: Regular  
   - Size: 20px  
   - Line Height: Automatic  
   - Letter Spacing: -1  
   - Case: Original

6. **H6**  
   - Weight: Medium  
   - Size: 16px  
   - Line Height: Automatic  
   - Letter Spacing: -1  
   - Case: Original

### Body (IBM Plex Sans)
7. **Large**  
   - Weight: Light  
   - Size: 18px  
   - Line Height: 27px  
   - Letter Spacing: 2  
   - Case: Original

8. **Regular**  
   - Weight: Light  
   - Size: 16px  
   - Line Height: 24px  
   - Letter Spacing: 2  
   - Case: Original

9. **Small**  
   - Weight: Medium  
   - Size: 14px  
   - Line Height: 21px  
   - Letter Spacing: 5  
   - Case: Original

10. **Tiny**  
    - Weight: Regular  
    - Size: 12px  
    - Line Height: 18px  
    - Letter Spacing: 5  
    - Case: Original

## Spacing

### 8px Grid System
All spacing is derived from 8px increments:
- `/4` (micro adjustments only)
- `/8`
- `/16`
- `/24`
- `/32`
- `/40`
- `/48`
- `/64`
- `/80`
- `/120`

**Use for**: Padding, gaps, margins.  
Never eyeball spacing. Avoid arbitrary values like 12px, 18px, 22px unless required for optical correction.

### Section Spacing (Vertical Rhythm)
- Small sections: 48px–64px
- Medium sections: 80px–96px
- Major sections: 120px+

Each section should clearly “breathe” before the next begins.

### Padding Rules (Containers)
- Small: 16px–24px
- Medium: 32px
- Large / cards: 40px–48px

### Typography Spacing
#### Line Height
- Headlines: 1.2–1.3
- Subheadings: 1.35
- Body text: 1.6–1.75

#### Text Spacing
- Headline → paragraph: 16px–24px
- Paragraph → paragraph: 16px
- Label → input / value: 8px

### Component Spacing (Buttons)
- Horizontal padding: 24px–32px
- Vertical padding: 12px–16px
- Button groups: 12px–16px gap

Buttons should never feel small or rushed.

## Layout & Grid System

### Grid Styles
- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns

### Rules
- Consistent gutters
- Max content width defined
- Centered layouts
- Apply grids to all frames by default

## Pattern System
A structured SVG pattern is used to introduce subtle depth.  
Files live in:  
`/public/assets/pattern-light.svg`  
`/public/assets/pattern-dark.svg`

### Rules
- Only used on gradient backgrounds
- Never on solid surfaces, cards, inputs, or small components
- Opacity: always 50%
- Must never reduce text readability

### Implementation Layer Order
Gradient Background
→ Pattern SVG (50% opacity)
→ Content

### Pattern Behavior by Theme
#### Light Mode
- Use `pattern-light.svg`
- Pattern color: matches Light Surface (`#FFFFFF`)
- Opacity: 0.5

#### Dark Mode
- Use `pattern-dark.svg`
- Pattern color: matches Dark Surface (`#141A17`)
- Opacity: 0.5

The pattern acts as a surface overlay, not a visual distraction.

---

*Last updated: 28 Feb 2026*