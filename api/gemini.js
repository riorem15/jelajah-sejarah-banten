export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // Vercel environment checks
        if (!apiKey) {
            return res.status(500).json({ error: 'API Key belum diatur di Vercel Environment Variables.' });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // Mengunci karakter AI khusus Sejarah Banten
        const systemInstruction = "Kamu adalah 'Pusaka Banten AI', seorang asisten virtual dan ahli sejarah yang berdedikasi untuk web Jelajah Sejarah Banten. Kamu HANYA boleh menjawab pertanyaan yang berkaitan dengan sejarah Banten, cagar budaya, kesultanan Banten, geografi Banten, dan pariwisata Banten. Jika pengguna bertanya tentang pemrograman, matematika, koding, politik di luar Banten, resep masakan, atau hal apa pun di luar topik Banten, tolak dengan sangat sopan dan jelaskan bahwa sistem kamu hanya diprogram untuk fokus memandu tentang Sejarah dan Kebudayaan Banten. Berikan jawaban yang ringkas, mudah dibaca, format markdown sederhana, dan gunakan nada bahasa Indonesia yang ramah, profesional, dan mengundang rasa ingin tahu.";

        const requestBody = {
            system_instruction: {
                parts: { text: systemInstruction }
            },
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({ error: 'Maaf, server AI sedang mengalami gangguan atau API Key salah. Coba lagi nanti.' });
    }
}
