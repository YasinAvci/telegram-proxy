// api/webhook.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok' });
  }

  const targetUrl = 'https://qrmenu.avcilabs.com/webhook';

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    return res.status(200).json({ status: 'error', message: error.message });
  }
}