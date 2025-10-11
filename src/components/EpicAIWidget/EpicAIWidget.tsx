'use client';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce'; 


export default function EpicAISidePanel() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'What is the price of an eCommerce site?',
    'Do you offer hosting?',
    'How can I contact support?',
    'What technologies do you use?',
    'Can you build mobile apps?',
    'What is your development process?',
    'How long does development take?',
  ];

  // Debounced API call
  const debouncedAsk = useCallback(
    debounce(async (question: string) => {
      if (!question.trim()) {
        setResponse('Please enter a valid question.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: question }),
        });

        const data = await res.json();
        setResponse(data.reply || 'No response from AI.');
      } catch (err) {
        console.error('AI Error:', err);
        setResponse('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 1000),
    [] // Ensures debounce is created once
  );

  const handleAsk = () => {
    setLoading(true);
    debouncedAsk(prompt);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-40 right-15 z-40 bg-green-700 text-white px-5 py-3 rounded-full shadow-md"
      >
        Ask Epic AI
      </button>

      {/* Slide-In Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl transform transition-transform z-50 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl text-green-500 font-semibold">Ask Epic AI</h2>
          <button onClick={() => setOpen(false)} className="text-gray-900 text-xl">
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border p-2 rounded w-full text-black h-full"
          />
          <button
            onClick={handleAsk}
            className="bg-green-700 text-white py-2 rounded disabled:opacity-60"
            disabled={loading || !prompt.trim()}
          >
            {loading ? 'Thinking...' : 'Generate'}
          </button>

          {response && (
            <div className="bg-gray-100 text-sm text-gray-800 p-3 rounded">
              <strong>Epic AI:</strong> {response}
            </div>
          )}

          {/* Suggested Questions */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-600">Popular Questions:</h4>
            <div className="text-gray-600 flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPrompt(q);
                    setResponse('');
                  }}
                  className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
