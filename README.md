# Personal Bio Profile

A modern, customizable profile page inspired by guns.lol, built with React, Vite, and Tailwind CSS.

## Features

- **Custom Profile**: Avatar, display name, username, and bio
- **Badges System**: 10 different badges to showcase your achievements
- **Discord Integration**: Display your Discord status and username
- **Social Links**: GitHub, Twitter, Instagram, YouTube
- **Music Player**: Support for file uploads, Spotify, and YouTube links
- **Customization Options**:
  - 8 gradient backgrounds + custom image upload
  - 8 font options
  - Custom accent colors
  - 6 animation effects
- **User Stats**: View counter and badge count
- **User ID System**: Unique 4-digit user IDs
- **Edit Mode**: Easy-to-use panel for customizing your profile
- **Responsive Design**: Works on all devices

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Create a new GitHub repository
2. Update the `base` path in `vite.config.js` to match your repository name
3. Push your code to GitHub
4. Run:

```bash
npm run deploy
```

## Customization

Click the edit button (pencil icon) in the top-right corner of the profile card to access the edit panel. From there, you can:

- Update your basic info (name, username, bio)
- Upload or link your avatar
- Set your Discord status and username
- Add social media links
- Toggle badges on/off
- Configure music (file upload, Spotify, or YouTube)
- Customize appearance (background, font, accent color, animation)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ProfileCard.jsx    # Main profile display
│   │   ├── MusicPlayer.jsx    # Music player component
│   │   └── EditPanel.jsx      # Customization panel
│   ├── data/
│   │   └── badges.js          # Badge and customization data
│   ├── store/
│   │   └── profileStore.js    # Zustand state management
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## License

MIT
