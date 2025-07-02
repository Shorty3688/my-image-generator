export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch('https://stablediffusionapi.com/api/v3/text-to-image ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        negative_prompt: "low quality, blurry, bad anatomy",
        width: "1024",
        height: "1024",
        samples: "1",
        apiKey: process.env.STABLE_DIFFUSION_API_KEY, // Use environment variable
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      res.status(200).json({ image: data.output[0] });
    } else {
      res.status(500).json({ error: data.message || 'Failed to generate image' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating image. Please try again.' });
  }
}
