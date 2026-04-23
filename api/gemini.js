module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ error: 'API Key belum diatur di Vercel Environment Variables.' });
        }

        // Gunakan gemini-pro yang paling stabil dan didukung semua versi API
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const systemInstruction = "ATURAN WAJIB: Kamu adalah 'Pusaka Banten AI', asisten sejarah Banten. Jawablah HANYA mengenai sejarah Banten, kesultanan, dan cagar budaya Banten. Tolak pertanyaan lain dengan sopan.\n\nPertanyaan Pengguna: ";
        
        const finalPrompt = systemInstruction + prompt;

        const requestBody = {
            contents: [{
                parts: [{ text: finalPrompt }]
            }]
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        let data = await response.json();

        // Fallback jika gemini-1.5-flash tidak ditemukan (Error 404)
        if (response.status === 404 || (data.error && data.error.message.includes("not found"))) {
            const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
            response = await fetch(fallbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            data = await response.json();
        }

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            throw new Error("Format respons AI tidak dikenali.");
        }
        
    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({ error: error.message || 'Gagal terhubung ke AI. Coba periksa kembali API Key Anda.' });
    }
}
