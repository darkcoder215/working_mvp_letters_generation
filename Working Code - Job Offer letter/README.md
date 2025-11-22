# Arabic Job Offer Generator

A React application for generating Arabic job offer documents with live editing.

## Prerequisites

Make sure you have Node.js installed on your computer. You can download it from:
- https://nodejs.org/ (Download the LTS version)

## Installation & Running Locally

1. **Extract the project files** to a folder on your computer

2. **Open Terminal/Command Prompt** and navigate to the project folder:
   ```bash
   cd path/to/arabic-job-offer
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

The application should now be running locally on your computer!

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Features

- **Real-time editing** of job offer details
- **Pixel-perfect Arabic document** layout (595×842px)
- **RTL (Right-to-Left)** support
- **Responsive form** interface
- **PDF Download** - Export the document as a PDF file
- **Dimension Overlay** - Show exact dimensions and positions of all components
- **Icon Customization** - Change the greeting icon/emoji
- **Color Customization** - Customize the accent color
- **Component Reference** - Visual indicators for all design elements

## Deployment Options

### Using the Application

Once running, you can:
1. **Edit any field** in the form on the right
2. **Click "Show Dimensions"** to see exact pixel measurements of all components
3. **Click "Download PDF"** to export the document as a PDF
4. **Customize the icon** - Use any emoji or icon
5. **Change colors** - Use the color picker or enter a hex color

### Component Dimensions Reference

When "Show Dimensions" is enabled, you'll see overlays showing:
- Component name
- Width × Height (in pixels)
- Left (L) and Top (T) positions

Main components:
- Main Frame: 595×842px
- Job Title Box: 510×65px at L:37, T:204
- Level Box: 160×143px at L:37, T:278
- And more...

### Deployment Options

### Option 1: Vercel (Free & Easy)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel login`
3. Run: `vercel --prod`

### Option 2: Netlify (Free)
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to https://app.netlify.com/drop

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "vite build && gh-pages -d dist"`
3. Run: `npm run deploy`

## Project Structure

```
arabic-job-offer/
├── src/
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port.

### Dependencies not installing
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build errors
Make sure you're using Node.js version 16 or higher:
```bash
node --version
```

### PDF Print Issues
If the PDF doesn't look correct:
1. In print dialog, enable "Background graphics"
2. Select "Save as PDF" as destination
3. Check print preview before saving
4. Native browser print ensures perfect Arabic text rendering
