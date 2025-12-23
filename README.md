# KnowYourHair - Learn.Care.Glow

A complete, responsive frontend website for personalized hair care guidance.

## Project Structure

```
WEB/
├── index.html              # Homepage
├── pages/                  # All page files
│   ├── take-test.html
│   ├── get-routine.html
│   ├── scalp-analysis.html
│   ├── oils.html
│   ├── ingredients.html
│   ├── mistakes.html
│   ├── concerns.html
│   └── about.html
├── styles/
│   └── main.css            # Main stylesheet with custom CSS
├── scripts/
│   ├── main.js             # Main JavaScript utilities
│   ├── take-test.js        # Porosity test logic
│   ├── get-routine.js      # Routine generation logic
│   ├── scalp-analysis.js   # Scalp analysis logic
│   └── concerns.js         # Hair concerns logic
├── assets/
│   ├── icons/              # SVG decorative icons
│   │   ├── hair-strand.svg
│   │   ├── shampoo.svg
│   │   ├── oil-droplet.svg
│   │   ├── brush.svg
│   │   ├── float-test.svg
│   │   └── spray-test.svg
│   └── hero-image.jpg      # Hero image (replace with actual image)
└── README.md
```

## Features

### 1. Homepage
- Hero section with title, subtitle, and tagline
- Three main action buttons (Take test, Get Your Routine, Scalp analysis)
- Disclaimer section
- Quick links to other sections
- Responsive navigation with mobile menu

### 2. Take Test Page
- Two porosity tests: Float Test and Spray Test
- Interactive test selection
- Results display with porosity type, explanation, and care tips
- Cute icons and visual feedback

### 3. Get Your Routine Page
- Form to collect user information:
  - Name
  - Scalp Type (Normal/Dry/Oily)
  - Hair Porosity (Low/Medium/High)
  - Optional: Hair length and concerns
- Mock AI routine generation (ready for backend integration)
- Formatted routine display matching the specified style

### 4. Scalp Analysis Page
- Visual cues, touch test, and sebum test instructions
- Information for Normal, Dry, and Oily scalp types
- Interactive result selector
- Detailed care tips for each scalp type

### 5. Oils Guide Page
- Porosity-based oil recommendations:
  - Low Porosity: Lightweight oils (jojoba, grapeseed, argan)
  - Medium Porosity: Balanced oils (coconut, almond, sunflower)
  - High Porosity: Heavy sealing oils (castor, olive, shea-based)
- Usage tips and application guidelines

### 6. Shampoo Ingredients Page
- Ingredient guidance by:
  - Hair Porosity (Low/Medium/High)
  - Scalp Type (Oily/Dry)
- What to look for and what to avoid
- General tips for reading ingredient labels

### 7. Common Hair Care Mistakes Page
- 8 common mistakes with explanations:
  - Using too much oil
  - Overwashing
  - Applying conditioner on scalp
  - Using heavy oils on low porosity hair
  - Too much protein
  - Hot water
  - Brushing wet hair aggressively
  - Not rinsing conditioner properly
- Fix suggestions for each mistake

### 8. Hair Concerns Page
- 7 clickable concern cards:
  - Hair fall / shedding
  - Frizz
  - Dryness
  - Breakage / Split Ends
  - Dandruff / Flakiness
  - Oily scalp
  - Product buildup
- Expandable details with solutions and tips
- Medical disclaimers where appropriate

### 9. About Page
- Mission statement
- Features overview
- Important disclaimer
- Contact information (demo)

## Design Features

- **Color Scheme**: Baby pink (#FFDDE6) and sky blue (#CFEFFF)
- **Typography**: Poppins/Nunito for headings, Inter for body text
- **Animations**: Floating animations for decorative elements
- **Responsive**: Mobile-first design, works on all screen sizes
- **Accessibility**: ARIA labels, keyboard navigation, WCAG AA compliant
- **Icons**: Custom SVG decorative icons throughout

## How to Run

### Using VS Code Live Server

1. Open the project folder in VS Code
2. Install the "Live Server" extension if not already installed
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. The site will open in your default browser

### Using Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then navigate to `http://localhost:8000` in your browser.

### Using Node.js http-server

```bash
npx http-server
```

## Technical Details

- **Frontend Only**: No backend required for current functionality
- **Frameworks**: Tailwind CSS (via CDN) for styling
- **JavaScript**: Vanilla JavaScript, no frameworks
- **Images**: SVG icons with fallback placeholders
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Backend Integration (Future)

When ready to add backend functionality:

1. **API Endpoints**:
   - `POST /api/generate-routine` - Generate personalized routine
   - `POST /api/analyze-scalp` (optional) - Advanced scalp analysis

2. **Update `scripts/get-routine.js`**:
   - Replace mock routine generation with API call
   - Add error handling
   - Add loading states

3. **Environment Variables**:
   - API base URL
   - API keys if needed

## Image Assets

**Important**: Replace `assets/hero-image.jpg` with the actual hero image from the PPT demo slides.

The SVG icons are already created and will display automatically. If any images fail to load, the site includes fallback SVG placeholders.

## Customization

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --baby-pink: #FFDDE6;
    --sky-blue: #CFEFFF;
    --pink-600: #DB2777;
    --blue-500: #3B82F6;
}
```

### Fonts
Fonts are loaded from Google Fonts. To change, update the `<link>` tags in HTML files.

## License

This is a demo project. All rights reserved.

## Support

For questions or issues, please refer to the About page or contact information (when available).

---

**Note**: This is a frontend-only implementation. Backend integration is planned for future development.


