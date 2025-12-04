    import fetch from 'node-fetch';

    export default async function handler(req, res) {
      // GET isteği gelirse (test için)
      if (req.method === 'GET') {
        return res.status(200).json({ status: 'active' });
      }

      const targetUrl = 'https://qrmenu.avcilabs.com/webhook';

      try {
        // Telegram'dan gelen veriyi al
        const payload = req.body;

        // Hedef URL'ye (Sitenize) gönder
        const response = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Hosting firmasının istediği User-Agent
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          body: JSON.stringify(payload)
        });

        // Yanıtı al ve Telegram'a ilet (Sadece OK dönsek yeterli)
        return res.status(200).json({ status: 'success' });
      } catch (error) {
        // Hata olsa bile Telegram'a 200 dönelim ki tekrar denemesin
        return res.status(200).json({ status: 'error', message: error.message });
      }
    }
