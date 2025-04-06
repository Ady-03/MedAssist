<<<<<<< HEAD
# MedAssist First Aid Application

## How to Start the Application

### Prerequisites
- Node.js (v14 or newer) - Download from [nodejs.org](https://nodejs.org/)
- npm (usually comes with Node.js)
- An internet connection for first-time setup

### Instructions

#### Windows Users
1. Extract this archive file to a folder
2. Right-click on MedAssist.bat and select "Run as administrator" (first time only)
   - For subsequent runs, you can simply double-click the file
3. Wait for dependencies to install (may take a few minutes on first run)
4. The application will start and open in your default browser
5. If it doesn't open automatically, visit http://localhost:5000

#### Mac or Linux Users
1. Extract this archive file to a folder
2. Open a terminal/command prompt in the extracted folder
3. Make the startup script executable: `chmod +x start-medassist.sh`
4. Run: `./start-medassist.sh`
5. Visit http://localhost:5000 in your browser

### Setting up API Keys
1. Copy .env.template to .env
2. Edit the .env file and add your API keys
3. At least one API key is required for AI features to work
   - OpenAI API Key (get from [platform.openai.com](https://platform.openai.com/))
   - Gemini API Key (get from [ai.google.dev](https://ai.google.dev/))
   - DeepSeek API Key (get from DeepSeek website)

### Troubleshooting
- **Missing Dependencies Error**: Make sure Node.js is installed correctly
- **Port Already in Use**: Change the PORT value in .env file
- **Access Denied Errors**: Run as administrator (Windows) or with sudo (Mac/Linux)
- **AI Features Not Working**: Check that you've set up at least one valid API key
- **Image Upload Issues**: Ensure temp directories are writable

## Features
- First aid guidance with AI assistance
- Patient profile management
- Medical record tracking
- Multi-modal input (images, text, audio)
- Emergency contact information
- Multiple AI provider support with fallback chain

## Support
For support, contact the MedAssist team.
=======
# MedAssist
>>>>>>> ef9cc7d992034b4641cfb12e8b7f1908a4aa4b4c
