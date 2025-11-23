# 📖 Complete Usage Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Exporting from Figma](#exporting-from-figma)
3. [Generating Templates](#generating-templates)
4. [Using Generated Templates](#using-generated-templates)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Anthropic API key (get from https://console.anthropic.com)
- Figma account with designs

### Installation

\`\`\`bash
git clone <repo-url>
cd figma-template-generator
npm install
npm run dev
\`\`\`

Visit http://localhost:3000

---

## Exporting from Figma

### Step-by-Step Guide

1. **Open Your Design in Figma**
   - Navigate to your Figma file
   - Select the frame/component you want to convert

2. **Export as Code**
   - Right-click the selected frame
   - Choose "Copy as" → "Copy as code"
   - Select "React" as the format
   - The JSX code is now in your clipboard

3. **Important Tips**
   - Export complete frames (not individual elements)
   - Document dimensions: 595×842px (A4) recommended
   - Use clear naming in Figma for better variable names
   - Group related elements together

### Design Best Practices for Export

✅ **DO:**
- Use consistent font weights (300 for labels, 700 for values)
- Group related elements
- Use semantic layer names in Figma
- Test with simple designs first

❌ **DON'T:**
- Export images as part of the design (upload separately)
- Use complex nested components initially
- Export very large files (>5000 lines of code)

---

## Generating Templates

### 1. Paste Code

- Copy your Figma JSX code
- Paste into the Monaco editor on the home page

### 2. Enter API Key

- Enter your Anthropic API key
- Key is never stored (session-only)
- Get key from: https://console.anthropic.com

### 3. Generate

- Click "Generate Fillable Template"
- Wait 20-30 seconds for processing
- Progress indicator shows status

### 4. What Happens Behind the Scenes

1. Code is sent to Claude Sonnet 4.5
2. AI analyzes the structure
3. Identifies editable fields (bold text → fontWeight: 700)
4. Creates state management
5. Generates form inputs
6. Adds all advanced features
7. Returns complete React component

---

## Using Generated Templates

### Real-Time Editing

The form panel on the right lets you edit:

- **Text Fields**: Type to update values instantly
- **Dropdowns**: Select from auto-detected options
- **Colors**: Use color picker or enter hex codes
- **Icons**: Change emojis or upload images

### PDF Export

1. Fill in all fields
2. Click "📄 Download PDF" or "🖨️ Print PDF"
3. In print dialog:
   - ✅ Enable "Background graphics"
   - ✅ Select "Save as PDF"
   - ✅ Choose destination
4. Perfect PDF with selectable Arabic text

### Downloading Code

**Option 1: Download Component Only**
- Click "📄 Download Code"
- Get \`GeneratedTemplate.jsx\` file
- Use in existing React project

**Option 2: Download Full Project**
- Click "📦 Download Project"
- Get JSON with all project files
- Extract and run:
  \`\`\`bash
  npm install
  npm run dev
  \`\`\`

---

## Advanced Features

### 1. Show Dimensions

**Purpose**: See exact pixel measurements

**Usage:**
1. Click "📏 Show Dimensions" button
2. Red dashed borders appear around all elements
3. Labels show: Component name | Width×Height | X:left Y:top
4. Click again to hide

**Use Cases:**
- Verify pixel-perfect accuracy
- Debug positioning issues
- Document design specifications

### 2. Alignment Guides

**Purpose**: Visual guides for precise positioning

**Usage:**
1. Click "📐 Alignment Guides" button
2. Colored vertical/horizontal lines appear
3. Lines mark key element positions
4. Click again to hide

**Use Cases:**
- Align new elements
- Check symmetry
- Design verification

### 3. Edit Mode (Drag & Drop)

**Purpose**: Reposition elements visually

**Usage:**
1. Click "✏️ Edit Mode" button
2. All elements become draggable
3. Click and drag any element
4. Position constrained to document bounds
5. Manual X/Y inputs appear in form panel

**Features:**
- Visual selection indicator (blue ring)
- Element ID badges
- Pixel-precise positioning
- Bounds checking

### 4. Custom Fonts

**Purpose**: Use your own fonts

**Usage:**
1. Scroll to "التصميم والخطوط" section in form
2. Choose font type:
   - Sans: Body text
   - Serif: Headers
   - Display: Special text
3. Click "Choose File"
4. Upload .woff, .woff2, .ttf, or .otf file
5. Font applies immediately

**Supported Formats:**
- WOFF/WOFF2 (recommended)
- TTF
- OTF

### 5. Image Upload

**Purpose**: Replace logos, icons, or images

**Usage:**
1. Enable Edit Mode
2. Hover over icon/image element
3. Click "📁 Upload Icon" button
4. Select image file
5. Image replaces original

**Supported Formats:**
- PNG (recommended for logos)
- JPG/JPEG
- SVG
- GIF

---

## Field Detection Logic

### How AI Identifies Fields

The AI uses these rules to identify editable content:

| **Pattern** | **Detected As** | **Form Input** |
|-------------|-----------------|----------------|
| \`fontWeight: '700'\` or \`'900'\` | Dynamic value | Text input |
| Multiple items, one bold | Dropdown | Select menu |
| Text with \`<br/>\` | Array of strings | Textarea |
| \`#XXXXXX\` color | Customizable color | Color picker |
| Emoji character | Icon/emoji field | Text input |

### Variable Naming

AI creates semantic names by:
1. Finding nearby label text (fontWeight: 300)
2. Translating Arabic → English
3. Converting to camelCase

**Examples:**
- "المسمّى الوظيفي" → \`jobTitle\`
- "اسم المرشح" → \`candidateName\`
- "الفريق" → \`team\`

---

## Troubleshooting

### Generation Fails

**Problem**: API returns error

**Solutions:**
- Verify API key is correct
- Check API key has credits
- Ensure Figma code is valid JSX
- Try smaller/simpler design first
- Check network connection

### Template Doesn't Render

**Problem**: Blank screen or error in preview

**Solutions:**
- Check browser console (F12) for errors
- Verify code was copied completely
- Try regenerating
- Use Chrome/Edge browser
- Clear browser cache

### Fields Not Detected

**Problem**: Some values aren't editable

**Solutions:**
- Ensure bold text in Figma (fontWeight: 700)
- Check text isn't in images
- Verify values aren't hardcoded colors
- Regenerate with explicit instructions

### PDF Looks Wrong

**Problem**: PDF doesn't match screen

**Solutions:**
- Enable "Background graphics" in print dialog
- Use Chrome/Edge for printing
- Check print preview first
- Ensure all fonts loaded
- Verify page size is A4

### Fonts Not Loading

**Problem**: Custom font doesn't apply

**Solutions:**
- Use WOFF/WOFF2 format
- Check file isn't corrupted
- Verify font file size < 5MB
- Try different font file
- Check browser console for errors

### Drag & Drop Not Working

**Problem**: Can't move elements

**Solutions:**
- Ensure Edit Mode is enabled
- Check element is wrapped in DraggableElement
- Try clicking directly on element
- Regenerate template

---

## Tips & Best Practices

### Design Tips

1. **Use consistent font weights**
   - Labels: 300-400
   - Values: 700-900

2. **Group logically**
   - Keep related fields together
   - Use flexbox/grid in Figma

3. **Name layers semantically**
   - Clear names help AI generate better variable names

4. **Test incrementally**
   - Start with simple designs
   - Add complexity gradually

### Performance Tips

1. **Optimize code size**
   - Remove unused Figma layers
   - Export only necessary frames

2. **Use web fonts**
   - WOFF2 for smaller file sizes
   - Subset fonts if possible

3. **Compress images**
   - PNG-8 for simple logos
   - Optimize before upload

### Workflow Tips

1. **Save templates**
   - Download code/project for reuse
   - Store in version control

2. **Document changes**
   - Note manual edits to generated code
   - Keep Figma file in sync

3. **Test thoroughly**
   - Check all form inputs
   - Verify PDF output
   - Test on different browsers

---

## Example Workflows

### Workflow 1: Simple Certificate

1. Design certificate in Figma (595×842px)
2. Use bold for: Name, Date, Achievement
3. Export as React JSX
4. Generate template
5. Edit fields for each recipient
6. Print PDF

### Workflow 2: Job Offer Letter

1. Design letter template
2. Bold all candidate-specific fields
3. Export and generate
4. Upload company logo
5. Upload custom font
6. Fill details and print

### Workflow 3: Invoice Template

1. Design invoice layout
2. Bold: Client, Amount, Date, Items
3. Generate template
4. Add dropdown for payment status
5. Customize colors per client
6. Export PDF

---

## API Cost Optimization

### Reduce Costs

1. **Test with examples first**
   - Use provided examples
   - Validate before using API

2. **Batch similar designs**
   - Generate templates for similar layouts once
   - Reuse generated code

3. **Cache results**
   - Save generated code
   - Don't regenerate unnecessarily

### Estimated Costs

- **Simple template**: $0.10-0.15
- **Complex template**: $0.20-0.30
- **Very complex**: $0.30-0.50

At $10 API credit:
- ~30-100 templates

---

## Security & Privacy

### Data Handling

- ✅ API keys never stored server-side
- ✅ Code processed in real-time
- ✅ No database storage
- ✅ SessionStorage only (client-side)

### Best Practices

- Don't commit API keys to git
- Use environment variables
- Clear session after use
- Review generated code before deploying

---

## FAQ

**Q: Can I use this commercially?**
A: Yes, generated code is yours to use.

**Q: Do I need to credit Claude?**
A: No requirement, but appreciated.

**Q: Can I modify generated code?**
A: Yes, it's standard React code.

**Q: What if generation fails?**
A: Try again or simplify Figma design.

**Q: How accurate is pixel-perfect?**
A: 99%+ accuracy for standard layouts.

**Q: Can I export to other frameworks?**
A: Generated code is React-specific.

**Q: Is my Figma code stored?**
A: No, only in browser session.

**Q: Can I use offline?**
A: No, requires API connection.

---

**Need more help?** Open a GitHub issue or check examples folder.
