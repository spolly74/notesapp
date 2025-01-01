# AI-Enhanced Note-Taking Application

A modern note-taking application that combines Markdown support with AI-powered analysis and action item management.

## Features

- 📝 Markdown-based note editor
- 🤖 AI-powered note analysis and querying
- ✅ Action item management
- 📁 Folder-based organization with tags
- 🔍 Advanced search capabilities
- 💾 Note export functionality

## Tech Stack

- Frontend: React with Tailwind CSS
- Backend: Node.js/Express
- Database: MongoDB
- AI Integration: Claude API
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-note-taking-app
```

2. Install dependencies:
```bash
npm run install:all
```

3. Create .env files:

Frontend (.env in frontend directory):
```
REACT_APP_API_URL=http://localhost:5000
```

Backend (.env in backend directory):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-app
JWT_SECRET=your_jwt_secret
CLAUDE_API_KEY=your_claude_api_key
```

4. Start the development servers:
```bash
npm start
```

This will start both frontend and backend servers concurrently.

## Project Structure

```
📁 note-taking-app/
├── 📁 frontend/          # React frontend application
├── 📁 backend/           # Node.js/Express backend
└── 📄 README.md         # This file
```

## Development

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:5000

## Contributing

[Contribution guidelines to be added]

## License

[License information to be added]
