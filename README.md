# Prodigy Disc Comparison Tool

A lightweight web application that helps users find the best Prodigy Disc matches for any PDGA approved disc based on flight characteristics (speed, glide, turn, fade).

## Features

- **Search PDGA Discs**: Search through a database of popular PDGA approved discs
- **Flight Number Matching**: Uses speed, glide, turn, and fade to find the most similar Prodigy discs
- **Smart Recommendations**: Shows the best match plus 2 alternative options
- **Shopify Integration Ready**: Built to be embedded in Shopify stores with product links
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

1. **Search**: Type in any PDGA approved disc name (e.g., "Destroyer", "Buzzz", "Teebird")
2. **Select**: Choose the disc from the search results
3. **Compare**: The app calculates similarity based on flight numbers using a weighted algorithm
4. **Discover**: View the best Prodigy match and alternative options with product links

## Flight Number Comparison Algorithm

The comparison algorithm uses weighted scoring:
- **Speed**: 25% weight - Determines throw speed required
- **Glide**: 20% weight - How long the disc stays in the air
- **Turn**: 30% weight - Initial flight path tendency (most important for flight behavior)
- **Fade**: 25% weight - End-of-flight hook tendency

## Local Testing

1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
disc-comparison-app/
├── index.html              # Main HTML file
├── styles.css              # CSS styling
├── data/
│   ├── pdga-discs.js       # PDGA approved disc database
│   └── prodigy-discs.js    # Prodigy disc catalog
└── js/
    ├── search.js           # Search functionality
    ├── comparison.js       # Comparison algorithm
    └── app.js             # Main application controller
```

## Data Sources

### PDGA Discs Database
Contains popular PDGA approved discs with flight numbers from major manufacturers:
- Innova
- Discraft
- Dynamic Discs
- Latitude 64
- MVP/Axiom
- Gateway
- Kastaplast
- And more...

### Prodigy Disc Catalog
Complete Prodigy disc lineup including:
- Distance Drivers (D1, D2, D3, D4 series)
- Fairway Drivers (F1, F2, F3, F5, F7)
- Midrange (M1, M2, M3, M4, MX-3)
- Approach (A1, A2, A3, A4)
- Putters (PA-1, PA-2, PA-3, PA-4, PA-5)

## Shopify Integration

The app is designed to be embedded in Shopify stores:

1. **Product Links**: Each Prodigy disc includes a Shopify product handle
2. **Pricing**: Product prices are included in the data
3. **Metaobjects**: Ready for integration with Shopify metaobjects for dynamic product data
4. **Responsive**: Works within Shopify's page layouts

### Next Steps for Shopify Integration

1. **Upload to Shopify**: Upload files to theme assets or use as a custom app
2. **Metaobjects**: Replace static data with Shopify metaobjects API calls
3. **Product Links**: Update Shopify handles to match your actual product URLs
4. **Styling**: Adjust CSS to match your theme's design system

## Google Sheets Integration

The app now supports loading PDGA disc data from Google Sheets! This provides:

- **Easy Updates**: Non-technical users can maintain the disc database
- **Real-time Data**: Changes reflect immediately in the app
- **Scalability**: Handle thousands of disc entries
- **Collaboration**: Multiple people can update the database

### Quick Setup:

1. **Create Google Sheets API Key** (see `google-sheets-setup.md` for detailed instructions)
2. **Create a public Google Sheet** with columns: Disc Name, Brand, Type, Speed, Glide, Turn, Fade
3. **Import sample data** from `sample-data.csv`
4. **Configure the app** in `config.js`:
   ```javascript
   googleSheets: {
       apiKey: 'your-api-key',
       spreadsheetId: 'your-spreadsheet-id',
       sheetName: 'PDGA_Discs'
   },
   app: {
       useGoogleSheets: true
   }
   ```

### Fallback Options

If Google Sheets is not configured, the app automatically falls back to static data.

### Alternative Backend Options

For advanced use cases, consider:

1. **Airtable**: More powerful database features
2. **Shopify Metaobjects**: Native Shopify integration
3. **External API**: Custom database solution

## Customization

### Adding More PDGA Discs
Edit `data/pdga-discs.js` and add disc objects with flight numbers:

```javascript
{
    name: "Disc Name",
    manufacturer: "Manufacturer",
    type: "Distance Driver", // or "Fairway Driver", "Midrange", "Putter"
    speed: 12,
    glide: 5,
    turn: -1,
    fade: 3
}
```

### Updating Prodigy Catalog
Edit `data/prodigy-discs.js` to add new discs or update information:

```javascript
{
    name: "Disc Name",
    type: "Distance Driver",
    speed: 12,
    glide: 5,
    turn: -1,
    fade: 3,
    description: "Disc description",
    shopifyHandle: "product-handle",
    price: 18.99,
    inStock: true
}
```

### Styling
Modify `styles.css` to match your brand colors and design preferences. The CSS uses CSS custom properties (variables) for easy theming.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ JavaScript features used

## License

This project is designed for Prodigy Disc and their authorized retailers.
