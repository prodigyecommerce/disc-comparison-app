# Google Sheets Integration Setup Guide

## Step 1: Create Google Sheets API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - Optional: Restrict the key to only Google Sheets API for security

## Step 2: Create the PDGA Disc Database Spreadsheet

1. Create a new Google Sheet
2. Set up the columns in this exact order (Row 1 - Headers):
   ```
   A: Disc Name
   B: Brand  
   C: Type
   D: Speed
   E: Glide
   F: Turn
   G: Fade
   ```

3. Make the spreadsheet public:
   - Click "Share" button
   - Change access to "Anyone with the link can view"
   - Copy the spreadsheet ID from the URL

### Example Data Format:

| Disc Name | Brand | Type | Speed | Glide | Turn | Fade |
|-----------|-------|------|-------|-------|------|------|
| Destroyer | Innova | Distance Driver | 12 | 5 | -1 | 3 |
| Buzzz | Discraft | Midrange | 5 | 4 | -1 | 1 |
| Teebird | Innova | Fairway Driver | 7 | 5 | 0 | 2 |

## Step 3: Get Your Spreadsheet ID

From the Google Sheets URL, extract the spreadsheet ID:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=0
```

The `SPREADSHEET_ID` is the long string between `/d/` and `/edit`

## Step 4: Configure the App

1. Open `config.js` in your app
2. Replace the placeholder values:

```javascript
const AppConfig = {
    googleSheets: {
        // Your Google Sheets API key
        apiKey: 'YOUR_ACTUAL_API_KEY_HERE',
        
        // Your spreadsheet ID
        spreadsheetId: 'YOUR_ACTUAL_SPREADSHEET_ID_HERE',
        
        // Sheet name (default: 'PDGA_Discs')
        sheetName: 'PDGA_Discs'
    },
    
    app: {
        // Enable Google Sheets integration
        useGoogleSheets: true,
        
        // Other settings...
    }
};
```

## Step 5: Populate Your Database

You can populate your PDGA disc database with data from sources like:

### Official PDGA Database
- Visit: https://www.pdga.com/technical-standards/equipment-certification/discs
- Export approved disc data

### Popular Disc Flight Numbers
Here are some popular discs to get you started:

**Distance Drivers:**
- Destroyer (Innova): 12|5|-1|3
- Zeus (Discraft): 12|5|-1|3  
- Wraith (Innova): 11|5|-1|3
- Force (Discraft): 12|5|0|3

**Fairway Drivers:**
- Teebird (Innova): 7|5|0|2
- Thunderbird (Innova): 9|5|0|2
- Undertaker (Discraft): 9|5|-1|2
- Eagle (Innova): 7|4|-1|3

**Midrange:**
- Buzzz (Discraft): 5|4|-1|1
- Roc (Innova): 4|4|0|3
- Mako3 (Innova): 5|5|0|0
- Truth (Dynamic Discs): 5|5|0|2

**Putters:**
- Aviar (Innova): 2|3|0|1
- Luna (Discraft): 3|3|0|2
- Judge (Dynamic Discs): 2|4|0|1
- Pure (Latitude 64): 3|3|-1|1

## Step 6: Test the Integration

1. Save your configuration
2. Refresh the app
3. You should see "Loading PDGA disc database..." 
4. Once loaded, search should work with your Google Sheets data

## Troubleshooting

### Common Issues:

1. **API Key Not Working**
   - Ensure Google Sheets API is enabled
   - Check that API key is correctly copied
   - Verify API key restrictions

2. **Spreadsheet Not Found**
   - Ensure spreadsheet is public (anyone with link can view)
   - Double-check the spreadsheet ID
   - Verify the sheet name matches your config

3. **Data Not Loading**
   - Check browser console for error messages
   - Ensure data format matches exactly (Disc Name, Brand, Type, Speed, Glide, Turn, Fade)
   - Verify numeric values are properly formatted

4. **CORS Errors**
   - This shouldn't happen with Google Sheets API, but if it does, you may need to host the app on a server

### Testing Your Setup:

Open browser console and run:
```javascript
// Check if configuration is loaded
console.log(AppConfig.isGoogleSheetsConfigured());

// Check app state
console.log(getAppState());
```

## Benefits of Google Sheets Integration

1. **Easy Updates**: Non-technical users can update the disc database
2. **Real-time**: Changes in Google Sheets are reflected immediately
3. **Collaborative**: Multiple people can maintain the database
4. **Backup**: Google Sheets provides automatic backup and version history
5. **Scalable**: Can handle thousands of disc entries
6. **Cost-effective**: Google Sheets API is free for reasonable usage

## Next Steps

Once Google Sheets integration is working:

1. **Data Quality**: Ensure all flight numbers are accurate
2. **Expand Database**: Add more manufacturers and disc models
3. **Regular Updates**: Keep the database current with new PDGA approvals
4. **Performance**: Monitor API usage and implement caching if needed
5. **Backup**: Consider exporting data periodically as backup

## Security Notes

- Keep your API key secure and don't commit it to public repositories
- Consider using environment variables for production deployments
- Restrict API key usage to specific domains if hosting publicly
- Regularly rotate API keys for enhanced security
