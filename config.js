// Configuration for Google Sheets Integration
const AppConfig = {
    // Google Sheets Configuration
    googleSheets: {
        // No API key needed for public sheets
        apiKey: '',
        
        // Replace with your spreadsheet ID (from the URL)
        spreadsheetId: '1Yy9KB1YjXXNLOD1w_ySlFp452UXID29J8zN9aeszp9E',
        
        // Sheet names for different data sources
        pdgaSheetName: 'Sheet1',           // PDGA approved discs
        prodigySheetName: 'Sheet2'  // Prodigy disc catalog
    },
    
    // App settings
    app: {
        // Use Google Sheets (true) or static data (false)
        useGoogleSheets: true, // Set to true when configured
        
        // Cache timeout in milliseconds (5 minutes)
        cacheTimeout: 5 * 60 * 1000,
        
        // Maximum search results to display
        maxSearchResults: 8,
        
        // Enable debug logging
        debug: true
    },
    
    // Shopify settings (for future use)
    shopify: {
        storeDomain: 'prodigy-disc-store.myshopify.com',
        baseProductUrl: 'https://prodigy-disc-store/products/'
    }
};

// Helper function to check if Google Sheets is configured
AppConfig.isGoogleSheetsConfigured = function() {
    return this.googleSheets.apiKey && this.googleSheets.apiKey !== 'YOUR_GOOGLE_SHEETS_API_KEY' && 
           this.googleSheets.spreadsheetId && this.googleSheets.spreadsheetId !== 'YOUR_SPREADSHEET_ID' &&
           this.googleSheets.apiKey.length > 10 && this.googleSheets.spreadsheetId.length > 10;
};

// Helper function to log debug messages
AppConfig.debug = function(message, data = null) {
    if (this.app.debug) {
        if (data) {
            console.log(`[DEBUG] ${message}`, data);
        } else {
            console.log(`[DEBUG] ${message}`);
        }
    }
};

// Make config available globally
window.AppConfig = AppConfig;
