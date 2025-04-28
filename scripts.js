document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    const targetLanguageSelect = document.getElementById('targetLanguage');
    const sourceTextArea = document.getElementById('sourceText');
    const translatedTextArea = document.getElementById('translatedText');
    const translateBtn = document.getElementById('translateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Set default values
    targetLanguageSelect.value = 'Spanish'; // Default target language

    // Function to handle translation
    async function translateText() {
        const sourceText = sourceTextArea.value.trim();
        const targetLanguage = targetLanguageSelect.value;
        const sourceLanguage = sourceLanguageSelect.value === 'auto' ? null : sourceLanguageSelect.value;

        // Validate input
        if (!sourceText) {
            alert('Please enter text to translate');
            return;
        }

        // Show loading indicator
        translateBtn.disabled = true;
        loadingIndicator.classList.remove('hidden');
        translatedTextArea.value = 'Translating...';

        try {
            // Call the translation API
            const response = await fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: sourceText,
                    sourceLanguage,
                    targetLanguage,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                translatedTextArea.value = data.translatedText;
            } else {
                translatedTextArea.value = `Error: ${data.error || 'Translation failed'}`;
                console.error('Translation error:', data);
            }
        } catch (error) {
            console.error('Request error:', error);
            translatedTextArea.value = 'Error: Could not connect to translation service';
        } finally {
            // Hide loading indicator
            translateBtn.disabled = false;
            loadingIndicator.classList.add('hidden');
        }
    }

    // Function to copy translated text
    function copyTranslatedText() {
        translatedTextArea.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }

    // Event listeners
    translateBtn.addEventListener('click', translateText);
    copyBtn.addEventListener('click', copyTranslatedText);

    // Enable translation with Enter key (with Ctrl or Cmd)
    sourceTextArea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            translateText();
        }
    });
}); 