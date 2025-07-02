const handleGenerate = async () => {
  if (!prompt.trim()) return;

  setLoading(true);
  setError('');
  setGeneratedImage(null);

  try {
    const response = await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (response.ok) {
      setGeneratedImage(data.image);
    } else {
      throw new Error(data.error || 'Failed to generate image');
    }
  } catch (err) {
    console.error(err);
    setError('Error generating image. Please try again.');
  }

  setLoading(false);
};
