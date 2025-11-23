'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DynamicComponentRenderer from '@/components/DynamicComponentRenderer';

export default function PreviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [componentCode, setComponentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the transformed code from sessionStorage
    const code = sessionStorage.getItem(`template-${id}`);

    if (!code) {
      setError('Template not found. Please generate a new template.');
      setLoading(false);
      return;
    }

    setComponentCode(code);
    setLoading(false);
  }, [id]);

  const handleDownloadCode = () => {
    if (!componentCode) return;

    const blob = new Blob([componentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedTemplate.jsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadProject = () => {
    if (!componentCode) return;

    // Create a complete React project structure
    const projectFiles = {
      'src/App.jsx': componentCode,
      'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
      'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media print {
  .no-print { display: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  @page { size: A4; margin: 0; }
  * { box-shadow: none !important; }
  body { background: white; }
}`,
      'package.json': JSON.stringify({
        "name": "generated-template",
        "version": "1.0.0",
        "private": true,
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "^18.2.0",
          "react-dom": "^18.2.0"
        },
        "devDependencies": {
          "@vitejs/plugin-react": "^4.2.1",
          "autoprefixer": "^10.4.17",
          "postcss": "^8.4.33",
          "tailwindcss": "^3.4.1",
          "vite": "^5.0.12"
        }
      }, null, 2),
      'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      'tailwind.config.js': `export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}`,
      'postcss.config.js': `export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}`,
      'index.html': `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Template</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      'README.md': `# Generated Fillable Template

Created with Figma Template Generator

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Real-time editing
- PDF export
- Custom fonts
- Image uploads
- Drag-and-drop positioning
`
    };

    // Create download of project files as JSON
    const dataStr = JSON.stringify(projectFiles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-project-files.json';
    a.click();
    URL.revokeObjectURL(url);

    alert('📦 Project files downloaded! Extract and run: npm install && npm run dev');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600 text-lg">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Generate New Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-[100] shadow-sm no-print">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            <span>←</span>
            <span>Generate New</span>
          </button>

          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>🎨</span>
            <span>Live Template Preview</span>
          </h1>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadCode}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center gap-2"
            >
              <span>📄</span>
              <span>Download Code</span>
            </button>
            <button
              onClick={handleDownloadProject}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm flex items-center gap-2"
            >
              <span>📦</span>
              <span>Download Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Component Renderer */}
      <div className="w-full">
        {componentCode && <DynamicComponentRenderer code={componentCode} />}
      </div>
    </div>
  );
}
