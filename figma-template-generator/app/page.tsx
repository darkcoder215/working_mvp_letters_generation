'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/components/CodeEditor';

export default function Home() {
  const [figmaCode, setFigmaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleGenerate = async () => {
    if (!figmaCode.trim()) {
      setError('Please paste your Figma JSX code');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your Anthropic API key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ figmaCode, apiKey })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Generation failed');
      }

      const { id, transformedCode } = await response.json();

      // Store in sessionStorage
      sessionStorage.setItem(`template-${id}`, transformedCode);
      sessionStorage.setItem(`template-${id}-original`, figmaCode);

      // Navigate to preview
      router.push(`/preview/${id}`);

    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              🎨 Figma Template Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transform Figma designs into pixel-perfect, fillable templates with AI
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by Claude Sonnet 4.5
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <span className="text-red-600 text-xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* API Key Input */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔑 Anthropic API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-2 text-left" dir="ltr">
              Your API key is never stored. Get one at{' '}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                console.anthropic.com
              </a>
            </p>
          </div>

          {/* Code Editor */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-6">
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white font-mono text-sm font-semibold">
                  📄 Figma Dev Mode JSX
                </span>
              </div>
              <span className="text-gray-400 text-xs">
                Paste your exported code
              </span>
            </div>

            <CodeEditor
              value={figmaCode}
              onChange={(value) => setFigmaCode(value || '')}
              height="500px"
            />

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-left" dir="ltr">
                💡 <strong>Tip:</strong> In Figma, select your design → Right-click → "Copy as" → "Copy as code" → Choose "React"
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleGenerate}
              disabled={loading || !figmaCode.trim() || !apiKey.trim()}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-3">⚙️</span>
                  Generating Template... (20-30s)
                </>
              ) : (
                <>
                  ✨ Generate Fillable Template
                </>
              )}
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold mb-2 text-gray-800">Pixel Perfect</h3>
              <p className="text-gray-600 text-sm">
                Exact 1:1 match with your Figma design
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="font-bold mb-2 text-gray-800">Auto-Editable</h3>
              <p className="text-gray-600 text-sm">
                AI identifies fillable fields automatically
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold mb-2 text-gray-800">RTL Support</h3>
              <p className="text-gray-600 text-sm">
                Built-in Arabic & right-to-left support
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">📥</div>
              <h3 className="font-bold mb-2 text-gray-800">PDF Export</h3>
              <p className="text-gray-600 text-sm">
                Perfect PDF generation with native fonts
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  1️⃣
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">Export from Figma</h3>
                <p className="text-sm text-gray-600">
                  Copy your design as React JSX from Figma Dev Mode
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  2️⃣
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">AI Transformation</h3>
                <p className="text-sm text-gray-600">
                  Claude analyzes and converts it to an editable template
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  3️⃣
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">Edit & Export</h3>
                <p className="text-sm text-gray-600">
                  Customize content, upload fonts/images, download PDF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
