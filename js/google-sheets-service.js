// Google Sheets API Service for PDGA Disc Database
class GoogleSheetsService {
    constructor(apiKey, spreadsheetId, pdgaSheetName = 'PDGA_Discs', prodigySheetName = 'Prodigy_Discs') {
        this.apiKey = apiKey;
        this.spreadsheetId = spreadsheetId;
        this.pdgaSheetName = pdgaSheetName;
        this.prodigySheetName = prodigySheetName;
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        this.pdgaCache = null;
        this.pdgaCacheTimestamp = null;
        this.prodigyCache = null;
        this.prodigyCacheTimestamp = null;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
    }
    
    /**
     * Fetch PDGA disc data from Google Sheets
     * Expected columns: Disc Name, Brand, Type, Speed, Glide, Turn, Fade
     */
    async fetchPDGADiscs() {
        // Return cached data if available and not expired
        if (this.pdgaCache && this.pdgaCacheTimestamp && 
            (Date.now() - this.pdgaCacheTimestamp) < this.cacheTimeout) {
            console.log('Returning cached PDGA disc data');
            return this.pdgaCache;
        }
        
        try {
            console.log('Fetching PDGA disc data from Google Sheets...');
            const range = `${this.pdgaSheetName}!A:G`; // A-G columns (Disc Name through Fade)
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const discs = this.transformPDGASheetsDataToDiscs(data.values);
            
            // Cache the results
            this.pdgaCache = discs;
            this.pdgaCacheTimestamp = Date.now();
            
            console.log(`Successfully loaded ${discs.length} PDGA discs from Google Sheets`);
            return discs;
            
        } catch (error) {
            console.error('Error fetching PDGA data from Google Sheets:', error);
            
            // Return fallback data if available
            if (this.pdgaCache) {
                console.log('Returning cached PDGA data due to error');
                return this.pdgaCache;
            }
            
            // Return static fallback data
            console.log('Using static PDGA fallback data');
            return this.getPDGAFallbackData();
        }
    }
    
    /**
     * Transform Google Sheets data to PDGA disc objects
     * Expected format: [Disc Name, Brand, Type, Speed, Glide, Turn, Fade]
     */
    transformPDGASheetsDataToDiscs(rows) {
        if (!rows || rows.length < 2) {
            throw new Error('Invalid or empty sheet data');
        }
        
        // Skip header row (first row)
        const dataRows = rows.slice(1);
        
        return dataRows
            .filter(row => row.length >= 7 && row[0]) // Must have all columns and a name
            .map(row => {
                try {
                    return {
                        name: row[0].trim(),           // Disc Name
                        manufacturer: row[1].trim(),   // Brand
                        type: row[2].trim(),           // Type
                        speed: this.parseNumber(row[3]),
                        glide: this.parseNumber(row[4]),
                        turn: this.parseNumber(row[5]),
                        fade: this.parseNumber(row[6])
                    };
                } catch (error) {
                    console.warn(`Error parsing row for disc "${row[0]}":`, error);
                    return null;
                }
            })
            .filter(disc => disc !== null); // Remove invalid entries
    }
    
    /**
     * Parse number values, handling decimals and negative numbers
     */
    parseNumber(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            const parsed = parseFloat(value.trim());
            if (isNaN(parsed)) {
                throw new Error(`Invalid number: ${value}`);
            }
            return parsed;
        }
        throw new Error(`Cannot parse number from: ${value}`);
    }
    
    /**
     * Fetch Prodigy disc data from Google Sheets
     * Expected columns: Disc Name, Type, Speed, Glide, Turn, Fade, Description, Shopify Collection Link
     */
    async fetchProdigyDiscs() {
        // Return cached data if available and not expired
        if (this.prodigyCache && this.prodigyCacheTimestamp && 
            (Date.now() - this.prodigyCacheTimestamp) < this.cacheTimeout) {
            console.log('Returning cached Prodigy disc data');
            return this.prodigyCache;
        }
        
        try {
            console.log('Fetching Prodigy disc data from Google Sheets...');
            const range = `${this.prodigySheetName}!A:H`; // A-H columns (Disc Name through Shopify Collection Link)
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const discs = this.transformProdigySheetsDataToDiscs(data.values);
            
            // Cache the results
            this.prodigyCache = discs;
            this.prodigyCacheTimestamp = Date.now();
            
            console.log(`Successfully loaded ${discs.length} Prodigy discs from Google Sheets`);
            return discs;
            
        } catch (error) {
            console.error('Error fetching Prodigy data from Google Sheets:', error);
            
            // Return fallback data if available
            if (this.prodigyCache) {
                console.log('Returning cached Prodigy data due to error');
                return this.prodigyCache;
            }
            
            // Return static fallback data
            console.log('Using static Prodigy fallback data');
            return this.getProdigyFallbackData();
        }
    }

    /**
     * Transform Google Sheets data to Prodigy disc objects
     * Expected format: [Disc Name, Type, Speed, Glide, Turn, Fade, Description, Shopify Collection Link]
     */
    transformProdigySheetsDataToDiscs(rows) {
        if (!rows || rows.length < 2) {
            throw new Error('Invalid or empty sheet data');
        }
        
        // Skip header row (first row)
        const dataRows = rows.slice(1);
        
        return dataRows
            .filter(row => row.length >= 6 && row[0]) // Must have at least 6 columns and a name
            .map(row => {
                try {
                    return {
                        name: row[0].trim(),                    // Disc Name
                        type: row[1].trim(),                    // Type
                        speed: this.parseNumber(row[2]),        // Speed
                        glide: this.parseNumber(row[3]),        // Glide
                        turn: this.parseNumber(row[4]),         // Turn
                        fade: this.parseNumber(row[5]),         // Fade
                        description: row[6] ? row[6].trim() : '',  // Description (optional)
                        shopifyCollectionLink: row[7] ? row[7].trim() : '',  // Shopify Collection Link (optional)
                        shopifyHandle: this.generateShopifyHandle(row[0].trim()),  // Generate handle from name
                        price: 0,  // Default price (can be managed in Shopify)
                        inStock: true  // Default in stock (can be managed in Shopify)
                    };
                } catch (error) {
                    console.warn(`Error parsing row for Prodigy disc "${row[0]}":`, error);
                    return null;
                }
            })
            .filter(disc => disc !== null); // Remove invalid entries
    }

    /**
     * Generate a Shopify handle from disc name
     */
    generateShopifyHandle(discName) {
        return `prodigy-${discName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-disc`;
    }

    /**
     * Get PDGA fallback data in case Google Sheets is unavailable
     */
    getPDGAFallbackData() {
        // Return a subset of essential discs as fallback
        return [
            { name: "Destroyer", manufacturer: "Innova", type: "Distance Driver", speed: 12, glide: 5, turn: -1, fade: 3 },
            { name: "Buzzz", manufacturer: "Discraft", type: "Midrange", speed: 5, glide: 4, turn: -1, fade: 1 },
            { name: "Teebird", manufacturer: "Innova", type: "Fairway Driver", speed: 7, glide: 5, turn: 0, fade: 2 },
            { name: "Aviar", manufacturer: "Innova", type: "Putter", speed: 2, glide: 3, turn: 0, fade: 1 },
            { name: "Wraith", manufacturer: "Innova", type: "Distance Driver", speed: 11, glide: 5, turn: -1, fade: 3 },
            { name: "Roc", manufacturer: "Innova", type: "Midrange", speed: 4, glide: 4, turn: 0, fade: 3 },
            { name: "Zeus", manufacturer: "Discraft", type: "Distance Driver", speed: 12, glide: 5, turn: -1, fade: 3 },
            { name: "Undertaker", manufacturer: "Discraft", type: "Fairway Driver", speed: 9, glide: 5, turn: -1, fade: 2 }
        ];
    }

    /**
     * Get Prodigy fallback data in case Google Sheets is unavailable
     */
    getProdigyFallbackData() {
        // Return static Prodigy disc data as fallback
        return window.prodigyDiscs || [];
    }
    
    /**
     * Clear cache to force fresh data fetch
     */
    clearCache() {
        this.pdgaCache = null;
        this.pdgaCacheTimestamp = null;
        this.prodigyCache = null;
        this.prodigyCacheTimestamp = null;
    }
    
    /**
     * Check if the service is properly configured
     */
    isConfigured() {
        return !!(this.apiKey && this.spreadsheetId);
    }
    
    /**
     * Validate Google Sheets access
     */
    async validateAccess() {
        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}?key=${this.apiKey}&fields=properties.title`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Access validation failed: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully connected to spreadsheet: "${data.properties.title}"`);
            return true;
            
        } catch (error) {
            console.error('Google Sheets access validation failed:', error);
            return false;
        }
    }
}

// Export for use in other modules
window.GoogleSheetsService = GoogleSheetsService;
