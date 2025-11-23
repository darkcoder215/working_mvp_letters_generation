# 🎨 Figma Template Generator

**Transform Figma designs into pixel-perfect, fillable templates with AI**

Powered by Claude Sonnet 4.5

---

## ✨ Features

- 🎯 **Pixel-Perfect Rendering** - Exact 1:1 match with Figma designs
- ✏️ **Auto-Editable Fields** - AI identifies fillable content automatically
- 🌍 **RTL Support** - Built-in Arabic and right-to-left support
- 📥 **PDF Export** - Perfect PDF generation with native fonts
- 🖼️ **Image Upload** - Replace logos and icons
- 🔤 **Custom Fonts** - Upload and use your own fonts
- 📐 **Dimension Tools** - View exact measurements
- 🎨 **Drag & Drop** - Reposition elements visually
- 📦 **Export Project** - Download complete React project

---

## 🚀 Quick Start

### 1. Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd figma-template-generator

# Install dependencies
npm install
\`\`\`

### 2. Configuration

Create a \`.env.local\` file (optional - users can enter API key in UI):

\`\`\`bash
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
\`\`\`

Get your API key from: https://console.anthropic.com

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

### Step 1: Export from Figma

1. Open your design in Figma
2. Select the frame/component you want to convert
3. Right-click → **"Copy as"** → **"Copy as code"**
4. Choose **"React"** as the format
5. Copy the JSX code

### Step 2: Generate Template

1. Paste the Figma JSX code into the editor
2. Enter your Anthropic API key
3. Click **"Generate Fillable Template"**
4. Wait 20-30 seconds for AI processing

### Step 3: Use Your Template

Your template is now live! You can:

- ✏️ **Edit fields** in the form panel
- 📏 **Show dimensions** to see measurements
- 📐 **Toggle alignment guides** for positioning
- 🎨 **Enable edit mode** to drag elements
- 🔤 **Upload custom fonts**
- 🖼️ **Upload images** for logos/icons
- 📥 **Download PDF** using the print button
- 💾 **Download code** or complete project

---

## 🎯 Supported Features

### Auto-Detection

The AI automatically identifies and creates editable fields for:

- ✅ **Text values** (bold text becomes input fields)
- ✅ **Dropdown menus** (multiple similar items → select)
- ✅ **Colors** (hex values → color pickers)
- ✅ **Icons/Emojis** (editable emoji fields)
- ✅ **Lists** (text with line breaks → arrays)

### Advanced Features

- **Dimension Overlay** - Red borders showing exact pixel measurements
- **Alignment Guides** - Colored guide lines for precise positioning
- **Edit Mode** - Drag-and-drop repositioning with bounds checking
- **PDF Export** - Native browser print with perfect rendering
- **Font Upload** - Support for Sans, Serif, and Display fonts
- **Image Upload** - Replace icons and logos on the fly
- **RTL Support** - Full Arabic and right-to-left text support

---

## 🏗️ Project Structure

\`\`\`
figma-template-generator/
├── app/
│   ├── page.tsx                 # Home page with code input
│   ├── preview/[id]/page.tsx    # Live template preview
│   ├── api/generate/route.ts    # Claude API endpoint
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + print CSS
├── components/
│   ├── CodeEditor.tsx           # Monaco code editor
│   └── DynamicComponentRenderer.tsx  # Live component renderer
├── lib/                         # Utilities (future)
├── public/                      # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
\`\`\`

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 4.5
- **Code Editor**: Monaco Editor
- **Runtime**: React 18

---

## 📝 Example Workflow

**Input (Figma JSX):**
\`\`\`jsx
<div style={{width: 595, height: 842, background: '#F2EEE4'}}>
  <div style={{fontWeight: '300'}}>Name:</div>
  <div style={{fontWeight: '700'}}>John Doe</div>
</div>
\`\`\`

**Output (Generated Template):**
- ✅ Editable "Name" field with default value "John Doe"
- ✅ Form panel with text input
- ✅ Real-time updates
- ✅ PDF export capability
- ✅ All advanced features included

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Environment Variables

Set in Vercel dashboard or \`.env.local\`:
- \`ANTHROPIC_API_KEY\` (optional - users can enter in UI)

---

## 💰 API Costs

**Claude Sonnet 4.5 Pricing:**
- Input: $3 / million tokens
- Output: $15 / million tokens

**Estimated cost per generation:**
- ~$0.15-0.25 per template
- Depending on Figma code complexity

---

## 🐛 Troubleshooting

### Template Not Rendering

- Check browser console for errors
- Ensure Figma code is valid React JSX
- Try regenerating with different Figma export

### API Key Issues

- Verify key starts with \`sk-ant-\`
- Check console.anthropic.com for key status
- Ensure you have API credits

### PDF Not Working

- Enable "Background Graphics" in print dialog
- Use Chrome/Edge for best results
- Check that .no-print class is working

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

## 📧 Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Review example Figma codes in \`examples/\`

---

**Made with ❤️ using Claude Sonnet 4.5**
