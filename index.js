require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function translateText(text, targetLanguage) {
    const prompt = `Translate the following text into ${targetLanguage}:\n\n"${text}"`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a translation assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3
        })
    });

    const data = await response.json();
    const translatedText = data.choices[0].message.content.trim();
    return translatedText;
}

document.getElementById('translateBtn').addEventListener('click', async function() {
    const sourceText = document.getElementById('sourceText').value;
    const languageRadio = document.querySelector('input[name="language"]:checked');
    
    if (!sourceText.trim()) {
        alert("Please enter text to translate.");
        return;
    }
    
    if (!languageRadio) {
        alert("Please select a language.");
        return;
    }

    const targetLanguage = languageRadio.labels[0].innerText; // Get visible label (like "French")

    document.getElementById('originalText').value = sourceText;
    document.getElementById('translatedText').value = "Translating...";

    try {
        const translated = await translateText(sourceText, targetLanguage);
        document.getElementById('translatedText').value = translated;
    } catch (error) {
        console.error('Translation error:', error);
        document.getElementById('translatedText').value = "Error in translation.";
    }
});

document.getElementById('startOverBtn').addEventListener('click', function() {
    document.getElementById('sourceText').value = '';
    document.getElementById('originalText').value = '';
    document.getElementById('translatedText').value = '';
    document.getElementById('french').checked = true;
});

// Adding world map graphics into headers
const headers = document.querySelectorAll('.header');
headers.forEach(header => {
    const worldMap = header.querySelector('.world-map');
    worldMap.innerHTML = `
        <svg viewBox="0 0 1000 500" preserveAspectRatio="none">
            <path d="M150,50 Q200,150 300,100 Q400,50 500,100 Q600,150 700,100 Q800,50 850,100" 
                  stroke="#ffffff" stroke-width="2" fill="none" />
            <circle cx="200" cy="100" r="5" fill="#ffffff" />
            <circle cx="400" cy="80" r="4" fill="#ffffff" />
            <circle cx="600" cy="120" r="6" fill="#ffffff" />
            <circle cx="800" cy="90" r="4" fill="#ffffff" />
        </svg>
    `;
});