# Troubleshooting Guide

## Common Deployment Issues

### ✅ FIXED: Submodule Error
**Error**: `Fatal: No url found for submodule path 'disc-comparison-app-nextjs' in .gitmodules`

**Solution**: 
```bash
# Remove the problematic directory
rm -rf disc-comparison-app-nextjs

# Remove from git cache
git rm --cached disc-comparison-app-nextjs

# Add to .gitignore
echo "disc-comparison-app-nextjs/" >> .gitignore

# Commit and push
git add .
git commit -m "Fix: Remove problematic nextjs directory"
git push origin main
```

### Build Issues

#### CSS Not Building
**Error**: CSS styles not applying
**Solution**: Check that `tailwind.config.js` and `styles-shadcn.css` are in the repository and the build command runs `npm run build`

#### Missing Dependencies
**Error**: Module not found during build
**Solution**: Ensure `package.json` includes all dependencies and run `npm install` locally first

#### Environment Variables
**Error**: Google Sheets not loading
**Solution**: Update `config.js` with correct API keys and spreadsheet IDs

### Netlify-Specific Issues

#### Build Command
Ensure in Netlify settings:
- **Build command**: `npm run build`
- **Publish directory**: `.` (root directory)
- **Node version**: 18 (set in netlify.toml)

#### Domain Issues
- Custom domains need DNS configuration
- HTTPS is automatic with Netlify
- Check domain propagation if not working immediately

### Shopify Embedding Issues

#### iframe Not Loading
- Ensure the Netlify URL uses HTTPS
- Check if Shopify allows iframe embedding
- Try different iframe attributes

#### Mobile Responsiveness
- Test on mobile devices
- Adjust iframe height for better mobile experience
- Consider popup option for small screens

### Performance Optimization

#### Slow Loading
- Minimize CSS (done automatically in build)
- Optimize images if any are added
- Use CDN benefits of Netlify

#### Google Sheets API Limits
- Cache responses when possible
- Monitor API usage in Google Console
- Consider fallback to static data if limits reached

## Support

For additional help:
1. Check Netlify build logs
2. Test locally with `npm run dev`
3. Verify Google Sheets API permissions
4. Test Shopify iframe embedding in preview mode
