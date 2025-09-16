# Deployment Guide: Prodigy Disc Comparison Tool

## 🚀 Free Hosting on Netlify

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your local code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/disc-comparison-app.git
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings (Netlify will auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `.` (root directory)
5. Click "Deploy site"

### Step 3: Configure Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain
3. Netlify will provide SSL certificate automatically

## 📦 Embedding in Shopify

### Option 1: Full Page Embed (Recommended)
Create a new page in Shopify with an iframe:

```html
<iframe 
  src="https://your-app-name.netlify.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; overflow: hidden;">
</iframe>
```

### Option 2: Section Embed
Add to a product page or custom section:

```html
<div class="disc-comparison-tool">
  <iframe 
    src="https://your-app-name.netlify.app" 
    width="100%" 
    height="600px" 
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

### Option 3: Popup/Modal
For a popup experience, use JavaScript to open the tool:

```html
<button onclick="openDiscTool()">Find Your Perfect Disc</button>

<script>
function openDiscTool() {
  window.open('https://your-app-name.netlify.app', '_blank', 'width=1200,height=800');
}
</script>
```

## 🔧 Configuration

### Google Sheets Setup
1. Update `config.js` with your API key and spreadsheet ID
2. Ensure your Google Sheets are publicly accessible
3. Test the connection after deployment

### Shopify Integration
1. Update `config.js` with your Shopify domain
2. Ensure Prodigy disc collection URLs are correct in your spreadsheet

## 📊 Analytics (Optional)
Add Google Analytics to track usage:

```html
<!-- Add to head section of index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Alternative Free Hosting Options

1. **Vercel** - Similar to Netlify, also free tier
2. **GitHub Pages** - Free static hosting (requires public repo)
3. **Firebase Hosting** - Google's free hosting solution
4. **Surge.sh** - Simple static hosting

## 📝 Notes
- Netlify free tier includes:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Deploy previews
  - Form handling
  - SSL certificates
- No server-side code needed (purely client-side)
- All data comes from Google Sheets (no database required)
