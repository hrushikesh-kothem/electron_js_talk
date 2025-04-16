# 🔮 Neon Tic Tac Toe - Electron Edition

A modern, neon-styled Tic Tac Toe game built with HTML, CSS, JavaScript, and packaged by Electron.js. Runs natively on macOS, and cross-platform via Electron.
___

## 📦 Features

- Sleek neon cyberpunk UI ✨
- Native desktop experience with Electron
- Celebration animation when you win 🎉
- Game result logging using Electron IPC & file system
- macOS packaging with custom app icon

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tic-tac-toe-electron.git
cd tic-tac-toe-electron
```
### 2. Install dependencies
```bash
npm install
```
Make sure you have Node.js installed (v16+ recommended)
### 3. Run in development mode
```bash
npm start
```
This will launch the app in a development window using Electron.
## 🛠 Build for macOS
```bash
npm run build
```

---

## 📁 Project Structure
```bash
.
├── electron/                # Electron main process code
│   └── main.js
├── frontend/                # Frontend app code
│   ├── index.html           # Game UI
│   ├── script.js            # Game logic
│   ├── style.css            # Game styling
│   └── assets/              # Game assets
│       ├── win.wav          # Win sound
│       ├── click.wav        # Click sound
│       └── bg.jpg           # Background image
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```
___

## 🧩 Tech Stack
- HTML, CSS, JavaScript
- Electron.js
- Node.js File System (fs)
- Electron IPC (Inter Process Communication)

