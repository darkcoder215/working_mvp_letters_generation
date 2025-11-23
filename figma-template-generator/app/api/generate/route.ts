import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const MAGIC_PROMPT = `You are an expert React developer specializing in pixel-perfect UI implementations.

CRITICAL TASK: Transform this Figma Dev Mode JSX code into a complete, production-ready fillable template with the following exact specifications:

═══════════════════════════════════════════════════════════════
🎯 CORE REQUIREMENTS
═══════════════════════════════════════════════════════════════

1. PIXEL-PERFECT LAYOUT
   - Preserve ALL exact dimensions from Figma (width, height, left, top positions)
   - Convert inline styles to Tailwind CSS classes where appropriate
   - Keep position: 'absolute' with pixel values for precision positioning
   - Maintain the exact document dimensions (detect from width/height in code)

2. INTELLIGENT FIELD DETECTION
   - Identify STATIC content (labels): fontWeight: '300' or '400' → Keep as-is
   - Identify DYNAMIC content (values): fontWeight: '700' or '900' → Extract to state
   - Create meaningful camelCase variable names based on Arabic labels
   - Support these field types automatically:
     * Text inputs (bold text values)
     * Select dropdowns (when multiple similar items exist with one bold)
     * Arrays (text with <br/> tags → split into array)
     * Colors (any #HEX values → make customizable)
     * Icons/Emojis (detect emoji characters → make editable)

3. COMPONENT ARCHITECTURE
   - Create useState hook with ALL fillable fields and their default Arabic values
   - Create positions state with { left, top, width, height } for each element
   - Build DraggableElement component that:
     * Accepts elementId, children, className, style props
     * Implements drag-and-drop in edit mode
     * Shows element ID badge when editing
     * Constrains movement to document bounds

4. FORM PANEL GENERATION
   - Auto-generate form on the RIGHT side with RTL support
   - Create appropriate input for each field type:
     * <input type="text" dir="rtl"> for text
     * <select dir="rtl"> for dropdowns with all options
     * <input type="color"> + hex input for colors
     * <input type="text"> for icons/emojis
     * <textarea dir="rtl"> for multi-line text
   - Add sections: "البيانات الأساسية" and "التصميم والخطوط"
   - Include font upload inputs (Sans, Serif, Display fonts)
   - Include image upload for logo/icon replacement

5. ADVANCED FEATURES
   Must include these exact features:

   a) Show Dimensions Toggle
      - Button in control panel
      - Red dashed borders around all elements
      - Labels showing: "Name | WxH | X:left Y:top"

   b) Alignment Guides Toggle
      - Colored vertical and horizontal guide lines
      - Position guides at key element positions

   c) Edit Mode Toggle
      - Enables drag-and-drop for all elements
      - Shows element IDs
      - Visual selection indicator (ring-4 ring-blue-500)
      - Manual X/Y position inputs in form panel

   d) PDF Download
      - Button using window.print()
      - Hides UI elements before print (.no-print class)
      - Preserves exact colors and layout

6. FONT SYSTEM
   - Support custom font uploads (3 types: sans, serif, display)
   - Use FileReader + FontFace API to load fonts
   - Apply fonts via state: customFonts.sans || 'fallback font'
   - Provide upload buttons in form panel

7. IMAGE UPLOAD
   - Allow uploading images to replace icons/logos
   - Store as data URLs in state
   - Show upload button in edit mode on hoverable elements

8. RTL & ARABIC SUPPORT
   - Set dir="rtl" on document and form
   - All labels in Arabic
   - Text alignment: text-right for Arabic content
   - Proper font fallbacks for Arabic fonts

═══════════════════════════════════════════════════════════════
📋 OUTPUT FORMAT
═══════════════════════════════════════════════════════════════

Return ONLY the complete React component code. Structure:

\`\`\`jsx
import React, { useState, useRef, useEffect } from 'react';

const GeneratedTemplate = () => {
  // 1. Refs
  const documentRef = useRef(null);

  // 2. UI State
  const [showDimensions, setShowDimensions] = useState(false);
  const [showAlignmentGuides, setShowAlignmentGuides] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // 3. Custom Assets
  const [customFonts, setCustomFonts] = useState({ sans: null, serif: null, display: null });
  const [uploadedIcons, setUploadedIcons] = useState({});

  // 4. Form Data (EXTRACTED FIELDS)
  const [formData, setFormData] = useState({
    // All detected fields with Arabic defaults
  });

  // 5. Positions State
  const [positions, setPositions] = useState({
    // All positioned elements with their coordinates
  });

  // 6. Utility Functions
  const downloadPDF = () => { /* window.print() implementation */ };
  const handleFontUpload = (e, fontType) => { /* FontFace API */ };
  const handleIconUpload = (e, iconId) => { /* FileReader */ };

  // 7. Components
  const DraggableElement = ({ elementId, children, className, style }) => {
    /* Full drag-and-drop implementation */
  };

  const DimensionOverlay = ({ comp }) => {
    /* Red border with measurements */
  };

  const AlignmentGuides = () => {
    /* Guide lines */
  };

  return (
    <div className="flex gap-8 p-8 bg-gray-100 min-h-screen" dir="rtl">
      {/* Control Panel (top-left, fixed) */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 no-print">
        {/* All control buttons */}
      </div>

      {/* Document Preview */}
      <div className="flex-shrink-0 relative">
        <div
          ref={documentRef}
          className="w-[XXXpx] h-[XXXpx] relative bg-[...] overflow-hidden shadow-2xl"
          style={{ direction: 'rtl' }}
        >
          {/* Transformed Figma content with state bindings */}
        </div>
      </div>

      {/* Editable Form Panel */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg max-w-md h-fit no-print">
        {/* Auto-generated form inputs */}
      </div>
    </div>
  );
};

export default GeneratedTemplate;
\`\`\`

═══════════════════════════════════════════════════════════════
⚠️ CRITICAL RULES
═══════════════════════════════════════════════════════════════

✅ DO:
- Preserve exact pixel dimensions
- Extract ALL bold text as variables
- Create semantic variable names (candidateName, jobTitle, etc.)
- Support Arabic text and RTL
- Include all 4 features (dimensions, guides, edit, pdf)
- Make colors customizable
- Support font/image uploads

❌ DON'T:
- Add explanations or comments in output
- Use generic variable names (field1, field2)
- Miss any bold text values
- Change document dimensions
- Skip any of the 7 core features
- Use external libraries (except React built-ins)

═══════════════════════════════════════════════════════════════

Here's the Figma JSX code to transform:`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { figmaCode, apiKey } = body;

    if (!figmaCode || typeof figmaCode !== 'string') {
      return NextResponse.json(
        { error: 'Valid Figma code is required' },
        { status: 400 }
      );
    }

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Initialize Anthropic client
    const client = new Anthropic({ apiKey });

    // Call Claude API
    const message = await client.messages.create({
      model: "claude-sonnet-4.5-20250929",
      max_tokens: 16000,
      temperature: 1,
      messages: [{
        role: "user",
        content: `${MAGIC_PROMPT}\n\n${figmaCode}`
      }]
    });

    const rawResponse = message.content[0].text;

    // Extract code from markdown blocks
    let transformedCode = rawResponse;
    const codeBlockMatch = rawResponse.match(/```(?:jsx|javascript|tsx|js)?\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      transformedCode = codeBlockMatch[1];
    }

    // Ensure we have valid React code
    if (!transformedCode.includes('useState') || !transformedCode.includes('return')) {
      return NextResponse.json(
        { error: 'Generated code appears invalid. Please try again.' },
        { status: 500 }
      );
    }

    // Generate unique ID
    const id = nanoid(10);

    return NextResponse.json({
      success: true,
      id,
      transformedCode,
      rawResponse // For debugging if needed
    });

  } catch (error: any) {
    console.error('Generation error:', error);

    // Handle specific Anthropic errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Anthropic API key.' },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'An error occurred during generation' },
      { status: 500 }
    );
  }
}
