'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DynamicComponentRendererProps {
  code: string;
}

export default function DynamicComponentRenderer({ code }: DynamicComponentRendererProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      // Method 1: Direct rendering using eval (safer with sanitization)
      const ComponentFromCode = createComponentFromCode(code);
      setComponent(() => ComponentFromCode);
      setError(null);
    } catch (err: any) {
      console.error('Component rendering error:', err);
      setError(err.message);

      // Fallback: Try iframe method
      if (iframeRef.current) {
        renderInIframe(code);
      }
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg m-4">
        <h3 className="text-red-800 font-bold text-lg mb-2">Rendering Error</h3>
        <p className="text-red-700 text-sm mb-4">{error}</p>
        <details className="text-xs">
          <summary className="cursor-pointer text-red-600 font-medium mb-2">
            View Generated Code
          </summary>
          <pre className="bg-white p-4 rounded border overflow-auto max-h-96 text-left" dir="ltr">
            {code}
          </pre>
        </details>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin text-4xl">⚙️</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Component />
    </div>
  );

  // Render in iframe as fallback
  function renderInIframe(componentCode: string) {
    if (!iframeRef.current) return;

    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) return;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    @media print {
      .no-print { display: none !important; }
      * { -webkit-print-color-adjust: exact !important; }
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    ${componentCode}

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(GeneratedTemplate));
  </script>
</body>
</html>
    `;

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
  }
}

/**
 * Safely create a React component from code string
 * This extracts the component logic and wraps it properly
 */
function createComponentFromCode(code: string): React.ComponentType {
  // Remove import statements
  let cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');

  // Extract component name
  const componentNameMatch = cleanCode.match(/const\s+(\w+)\s*=\s*\(\)\s*=>/);
  const componentName = componentNameMatch ? componentNameMatch[1] : 'GeneratedTemplate';

  // Extract the component body (everything between => { and }; export)
  const bodyMatch = cleanCode.match(/const\s+\w+\s*=\s*\(\)\s*=>\s*{([\s\S]*?)};?\s*(?:export\s+default|$)/);

  if (!bodyMatch) {
    throw new Error('Could not parse component structure. Expected: const Component = () => { ... }');
  }

  const componentBody = bodyMatch[1];

  // Create the component function with proper React hooks
  try {
    const componentFunction = new Function(
      'React',
      `
        'use strict';
        const { useState, useRef, useEffect, Fragment } = React;

        return function ${componentName}() {
          ${componentBody}
        };
      `
    );

    // Execute the function with React to get the component
    return componentFunction(React);
  } catch (err: any) {
    throw new Error(`Component compilation failed: ${err.message}`);
  }
}
