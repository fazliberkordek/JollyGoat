# JollyGoat - AI-Powered Translation App

![Screenshot 2025-04-28 at 15 43 49](https://github.com/user-attachments/assets/89a28ffb-7424-47b0-9aa3-1e8e7dc84b30)


## Overview

JollyGoat is a modern, user-friendly web application that leverages OpenAI's GPT-3.5-turbo model to provide high-quality translations between multiple languages. The application features a clean, intuitive interface that makes translation accessible to everyone.

## Features

- **Real-time Translation**: Instantly translate text between multiple languages
- **Language Detection**: Automatically detect the source language
- **Clean UI**: Modern, responsive design for a seamless user experience
- **API Integration**: Seamless integration with OpenAI's powerful language models
- **Error Handling**: Robust error handling for a reliable user experience

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Build Tool**: Vite
- **Environment Management**: dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/JollyGoat.git
   cd JollyGoat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter the text you want to translate in the input field
2. Select the target language from the dropdown menu
3. Click the "Translate" button
4. View the translated text in the output area

## Project Structure

```
JollyGoat/
├── public/           # Static assets
├── server/           # Backend server code
├── index.html        # Main HTML file
├── styles.css        # CSS styles
├── scripts.js        # Frontend JavaScript
├── package.json      # Project dependencies
└── .env              # Environment variables (not in repo)
```

## Future Enhancements

- Add support for more languages
- Implement text-to-speech functionality
- Add history of translations
- Implement user accounts for saving translations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

