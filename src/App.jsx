import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await fetch('https://stablediffusionapi.com/api/v3/text-to-image ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: "low quality, blurry, bad anatomy",
          width: "1024",
          height: "1024",
          samples: "1",
          apiKey: "33IzXrJ5EIbwImICsP34bhQ3klcNvNAejHsd1rzgG5tcoDh7gZqBPD2Drck8", // ← Replace this with your real API key
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setGeneratedImage(data.output[0]);
      } else {
        throw new Error(data.message || 'Failed to generate image');
      }
    } catch (err) {
      console.error(err);
      setError('Error generating image. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 text-white">
      {/* ... rest of the UI code */}
    </div>
  );
}
