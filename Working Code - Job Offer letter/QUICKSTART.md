# Quick Start Guide

## Installation (2 minutes)

1. **Extract the ZIP file** you downloaded
2. **Open Terminal/Command Prompt**
3. **Navigate to the folder**:
   ```bash
   cd path/to/arabic-job-offer-enhanced
   ```
4. **Install**:
   ```bash
   npm install
   ```
5. **Run**:
   ```bash
   npm run dev
   ```
6. **Open browser** to: http://localhost:5173

## First Steps

### Edit Your First Document
1. Type a name in "اسم المرشح" (Candidate Name)
2. Watch it update in real-time on the document
3. Change the job title, level, and other details

### View Component Dimensions
1. Click **"Show Dimensions"** button (top-left corner)
2. See red dashed borders around all components
3. Hover to see exact pixel measurements
4. Click again to hide dimensions

### Download as PDF
1. Fill in all the details you want
2. Click **"🖨️ Print / Save PDF"** button (top-left)
3. Browser print dialog opens
4. Select **"Save as PDF"** as the destination
5. Choose location and filename
6. Click Save

**Benefits of Native Print:**
- Perfect Arabic text (same as screen)
- Text is selectable/searchable in PDF
- Fonts auto-embed
- Exact color matching
- Smallest file size

### Customize Design
1. Scroll down in the form to "التصميم والأيقونات" section
2. **Change Icon**: Click in the icon field and paste any emoji
3. **Change Color**: 
   - Use the color picker, or
   - Type a hex code like #FF5733

## Common Questions

**Q: The download button doesn't work?**
A: Make sure you've run `npm install` to install all dependencies including html2canvas and jspdf.

**Q: Can I change the fonts?**
A: Yes! Edit the `fontFamily` styles in `src/App.jsx`. The current fonts are:
- 'Thmanyah sans 1.2' for body text
- 'Thmanyah serif display 1.2' for headers

**Q: How do I change the document size?**
A: The document is A4 size (595×842px). To change it, update both:
- The component dimensions array
- The main div dimensions in the JSX

**Q: Can I add more fields?**
A: Yes! Add new fields to the `formData` state and create corresponding form inputs and document displays.

**Q: The Arabic text looks wrong?**
A: Make sure your browser supports RTL and Arabic fonts. All modern browsers do.

## Tips & Tricks

### Finding Great Icons
- 🌟 https://emojipedia.org - All emojis
- 📦 https://unicode-table.com - Unicode characters
- 🎨 https://getemoji.com - Copy-paste emojis

### Color Palette Ideas
- Professional Green: #03BB6E (default)
- Corporate Blue: #0066CC
- Creative Purple: #9B59B6
- Modern Orange: #E67E22
- Classic Navy: #2C3E50

### Keyboard Shortcuts (in browser)
- `Cmd/Ctrl + S`: Browser will prompt to save
- `Cmd/Ctrl + P`: Print document (alternative to PDF)
- `F12`: Open developer tools to inspect

### Best Practices
1. **Fill all fields** before downloading PDF
2. **Test different icons** to find the perfect one
3. **Use brand colors** for the accent color
4. **Keep responsibilities concise** (7-10 items)
5. **Proofread** before downloading

## Troubleshooting

### Port 5173 is in use
Vite will automatically use the next available port (5174, 5175, etc.)

### PDF issues
1. Make sure to select "Save as PDF" in print dialog
2. Check print preview before saving
3. Ensure background graphics are enabled in print settings
4. Arabic text renders perfectly with native browser print

**Why Native Print:**
Uses the same approach as the Thmanyah system - browser's built-in PDF engine with `@media print` CSS. No external libraries needed.

### Text is cut off
The document has fixed dimensions. If text overflows:
1. Shorten the content
2. Reduce font sizes in the code
3. Adjust positioning

### Install fails
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Next Steps

Once you're comfortable:
1. Deploy to Vercel, Netlify, or GitHub Pages (see README.md)
2. Customize colors and fonts in the code
3. Add your company logo
4. Create multiple templates
5. Integrate with your HR system

## Support

Need help?
- Check FEATURES.md for detailed feature documentation
- Check README.md for deployment options
- Review the code comments in src/App.jsx

Enjoy creating beautiful Arabic job offers! 🎉
