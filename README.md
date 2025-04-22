# ISPSG Website

This is the official website for the ISPSG (Information Security and Privacy Study Group) built with React and Material-UI.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ispsg/ispsg.github.io.git
cd ispsg.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Deployment

To deploy the website to GitHub Pages:

1. Make sure you have the latest changes:
```bash
git pull
```

2. Build the project:
```bash
npm run build
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

The website will be available at [https://ispsg.github.io](https://ispsg.github.io)

## Project Structure

- `src/pages/` - Contains the main pages (Home, Events, Members)
- `public/data/` - Contains JSON data files (events.json, members.json)
- `public/` - Static assets and 404.html for GitHub Pages routing

## Important Notes

- The website uses GitHub Pages for hosting
- Client-side routing is handled by react-router-dom
- All data is stored in JSON files in the public/data directory
- The 404.html file is crucial for proper routing on GitHub Pages
