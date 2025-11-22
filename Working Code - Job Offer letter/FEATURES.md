# Enhanced Features

## New Features Added

### 1. **Dimension Display Toggle** 📏
- Click "Show Dimensions" button (top-left)
- See exact pixel measurements for all components
- Displays: Component name, Width×Height, Left/Top positions
- Red dashed borders show component boundaries
- Useful for developers and designers

### 2. **PDF Download** 📄
- Click "Print / Save PDF" button (top-left)
- Opens native browser print dialog
- Select "Save as PDF" as destination
- **Perfect rendering** - exact match to what you see on screen
- Browser automatically embeds Arabic fonts
- No text corruption or character reversal
- Maintains exact layout and colors
- File name can be set in print dialog

**Why Native Print:**
- Uses browser's built-in PDF engine (same as the documented system)
- Applies `@media print` CSS for optimal PDF output
- Fonts embed automatically (no external dependencies)
- WYSIWYG - What You See Is What You Get
- Text remains selectable in PDF
- Smaller file size than image-based PDFs

### 3. **Icon/Emoji Customization** 🎨
- Replace the greeting icon (default: 👋🏻)
- Use any emoji or Unicode character
- Find emojis at: https://emojipedia.org
- Change in the "التصميم والأيقونات" section

### 4. **Accent Color Customization** 🎨
- Change the top green bar color
- Use color picker or enter hex code
- Default: #03BB6E
- Updates in real-time

## Component Reference

All components with their exact dimensions:

| Component | Width (px) | Height (px) | Left | Top |
|-----------|------------|-------------|------|-----|
| Main Frame | 595 | 842 | 0 | 0 |
| Top Accent Bar | 661.48 | 27.65 | -18.28 | -13.11 |
| Black Element | 32 | 36 | 40 | 766 |
| Greeting Section | auto | auto | 374.5 | 83 |
| Intro Text | 499 | auto | 48 | 138 |
| Job Title Box | 510 | 65 | 37 | 204 |
| Level Box | 160 | 143 | 37 | 278 |
| Team/Dept/Mgmt Box | 344 | 69 | 203 | 278 |
| City/Type/Manager Box | 344 | 69 | 203 | 352 |
| Expectations Header | auto | auto | 226 | 455 |
| Responsibilities | 446 | auto | 101 | 509 |

## Editable Fields

All fields can be edited in real-time:

### Basic Information
- اسم المرشح (Candidate Name)
- المسمى الوظيفي (Job Title)
- المستوى (Level) - Dropdown with 5 levels
- الفريق (Team)
- القسم (Department)
- الإدارة (Management)
- مدينة التعاقد (Contract City)
- نوع الدوام (Work Type) - Dropdown
- المدير المباشر (Direct Manager)

### Design Elements
- أيقونة الترحيب (Greeting Icon)
- لون الشريط العلوي (Accent Color)

## Technical Details

### Dependencies
- React 18.2.0
- Vite 5.0.12
- Tailwind CSS 3.4.1

**Note on PDF Generation:** 
Uses native browser print (`window.print()`) with `@media print` CSS - the same approach as the documented Thmanyah system. This ensures:
1. Perfect font embedding by browser PDF engine
2. Exact WYSIWYG rendering (screen matches PDF)
3. No external PDF libraries needed
4. Text remains selectable and searchable in PDF
5. Optimal file size with embedded font subsets

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Supports RTL languages

### Performance
- Lightweight bundle size
- Fast hot-reload in development
- Optimized production build
- Efficient PDF generation

## Tips for Customization

### Adding New Icons
1. Visit https://emojipedia.org or https://unicode-table.com
2. Copy any emoji/icon
3. Paste into the "أيقونة الترحيب" field
4. See it update in real-time

### Custom Colors
- Use hex colors: #03BB6E
- RGB/HSL also supported via color picker
- Test different brand colors
- Maintains design consistency

### Adjusting Text
- All text fields support Arabic and English
- RTL formatting is automatic
- Line breaks supported in responsibilities
- Font family can be customized in code

## Future Enhancement Ideas

- [ ] Export to multiple formats (PNG, SVG)
- [ ] Save/load templates
- [ ] Multiple document templates
- [ ] Drag-and-drop icon upload
- [ ] Custom font selection
- [ ] Print optimization
- [ ] Batch generation from CSV
- [ ] API integration
