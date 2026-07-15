# Egytronic Chat - Pixel Art Discord-style Chat App

<div align="center">
  <img src="https://img.shields.io/badge/Company-Egytronic-blue?style=for-the-badge" alt="Egytronic">
  <img src="https://img.shields.io/badge/Framework-React-61dafb?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Firebase-Realtime%20Database-ffca28?style=for-the-badge&logo=firebase" alt="Firebase">
  <img src="https://img.shields.io/badge/Style-Pixel%20Art-purple?style=for-the-badge" alt="Pixel Art">
  <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292e?style=for-the-badge&logo=github" alt="GitHub Pages">
</div>

## 🎮 Egytronic Chat

A beautiful, modern chat application with Discord-like UI/UX and unique Pixel Art style. Built with React, TypeScript, Firebase Realtime Database, and styled with a custom pixel art theme.

### ✨ Features

- 🎨 **Pixel Art Theme** - Unique retro-gaming aesthetic
- 💬 **Real-time Messaging** - Powered by Firebase Realtime Database
- 📷 **Media Sharing** - Support for images and videos
- 😀 **Pixel Art Emoji Pack** - 25 custom pixel art emojis in JSON format
- 📱 **Fully Responsive** - Works on desktop and mobile devices
- 🌐 **RTL Support** - Full Arabic language support
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🔄 **Edit & Delete** - Edit or delete your own messages
- ❤️ **Reactions** - React to messages with emoji
- 💬 **Reply** - Reply to specific messages
- ⌨️ **Typing Indicator** - See when others are typing

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📦 Deploy to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

### 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Anonymous Auth
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6.4
- **Fonts**: Tajawal (Arabic)

### 📁 Project Structure

```
egytronic-chat/
├── src/
│   ├── components/     # React components
│   ├── data/          # Static data (emojis)
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript types
│   ├── App.tsx        # Main app component
│   ├── App.css        # App styles
│   ├── firebase.ts    # Firebase configuration
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── dist/              # Production build
└── package.json
```

### 🎨 Pixel Art Emoji Pack

The app includes a custom 25-emoji pixel art pack in JSON format. Each emoji contains:
- Unique ID
- Name and category
- SVG representation (rendered as pixel art)
- Shortcodes for easy insertion

**Sample Emoji Structure:**
```json
{
  "id": "pixel_smile",
  "name": "Pixel Smile",
  "unified": "1F600",
  "shortcodes": [":)", ":-)", ":smile:"],
  "category": "faces",
  "svg": "<svg viewBox='0 0 16 16'...>"
}
```

### 🔥 Firebase Configuration

The app uses Firebase Realtime Database with the same configuration as the reference app. No additional setup is required - just deploy and use!

### 📱 Responsive Design

- **Desktop**: Full Discord-style layout with sidebar
- **Tablet**: Collapsible sidebar with hamburger menu
- **Mobile**: Optimized touch controls with floating menu button

### 🌐 Links

- **Live App**: https://3000445.pages.dev
- **Company Website**: https://egytronic.pages.dev

### 📝 License

MIT License - © 2025 Egytronic

---

Made with ❤️ by **Egytronic**
