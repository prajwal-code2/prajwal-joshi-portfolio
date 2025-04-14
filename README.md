
# Prajwal Joshi Portfolio

## Project Overview

This is a personal portfolio website showcasing the professional work and skills of Prajwal Joshi, a Full Stack Developer.

## Deployment Options

### GitHub Pages Deployment

1. **Prepare your repository**
   - Create a new GitHub repository named "prajwal-joshi-portfolio"
   - Push your current project to the repository

2. **GitHub Pages Deployment**
   ```bash
   # Install gh-pages package
   npm install gh-pages --save-dev

   # Add deployment scripts to package.json
   # (You'll need to modify package.json manually)
   ```

3. **Modify package.json**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Alternative Free Deployment Options
- Netlify
- Vercel
- Render
- Cloudflare Pages

## Technologies Used
- React with TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Contact
For inquiries, please reach out to Prajwal Joshi.
