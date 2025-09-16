// Public Google Sheets Service (No API Key Required)
class PublicSheetsService {
    constructor(spreadsheetId, pdgaSheetGid = '0', prodigySheetGid = '1') {
        this.spreadsheetId = spreadsheetId;
        this.pdgaSheetGid = pdgaSheetGid; // Sheet GID (usually 0 for first sheet)
        this.prodigySheetGid = prodigySheetGid; // Sheet GID for second sheet
        this.pdgaCache = null;
        this.pdgaCacheTimestamp = null;
        this.prodigyCache = null;
        this.prodigyCacheTimestamp = null;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
    }
    
    /**
     * Fetch PDGA disc data from public Google Sheets CSV export
     */
    async fetchPDGADiscs() {
        // Return cached data if available and not expired
        if (this.pdgaCache && this.pdgaCacheTimestamp && 
            (Date.now() - this.pdgaCacheTimestamp) < this.cacheTimeout) {
            console.log('Returning cached PDGA disc data');
            return this.pdgaCache;
        }
        
        try {
            console.log('Fetching PDGA disc data from public Google Sheets...');
            const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=${this.pdgaSheetGid}`;
            
            const response = await fetch(csvUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            
            const csvText = await response.text();
            const discs = this.parseCSVToPDGADiscs(csvText);
            
            // Cache the results
            this.pdgaCache = discs;
            this.pdgaCacheTimestamp = Date.now();
            
            console.log(`Successfully fetched ${discs.length} PDGA discs from public sheet`);
            return discs;
            
        } catch (error) {
            console.error('Error fetching PDGA disc data:', error);
            throw error;
        }
    }
    
    /**
     * Fetch Prodigy disc data from public Google Sheets CSV export
     */
    async fetchProdigyDiscs() {
        // Return cached data if available and not expired
        if (this.prodigyCache && this.prodigyCacheTimestamp && 
            (Date.now() - this.prodigyCacheTimestamp) < this.cacheTimeout) {
            console.log('Returning cached Prodigy disc data');
            return this.prodigyCache;
        }
        
        try {
            console.log('Fetching Prodigy disc data from public Google Sheets...');
            const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=${this.prodigySheetGid}`;
            
            const response = await fetch(csvUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            
            const csvText = await response.text();
            const discs = this.parseCSVToProdigyDiscs(csvText);
            
            // Cache the results
            this.prodigyCache = discs;
            this.prodigyCacheTimestamp = Date.now();
            
            console.log(`Successfully fetched ${discs.length} Prodigy discs from public sheet`);
            return discs;
            
        } catch (error) {
            console.error('Error fetching Prodigy disc data:', error);
            throw error;
        }
    }
    
    /**
     * Parse CSV text to PDGA disc objects
     */
    parseCSVToPDGADiscs(csvText) {
        const lines = csvText.trim().split('\n');
        const discs = [];
        
        // Skip header row (line 0)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Parse CSV (handle quotes and commas)
            const columns = this.parseCSVLine(line);
            
            if (columns.length >= 7) {
                const disc = {
                    name: columns[0]?.trim() || '',
                    manufacturer: columns[1]?.trim() || '',
                    type: columns[2]?.trim() || '',
                    speed: parseInt(columns[3]) || 0,
                    glide: parseInt(columns[4]) || 0,
                    turn: parseInt(columns[5]) || 0,
                    fade: parseInt(columns[6]) || 0
                };
                
                // Only add if name exists
                if (disc.name) {
                    discs.push(disc);
                }
            }
        }
        
        return discs;
    }
    
    /**
     * Parse CSV text to Prodigy disc objects
     */
    parseCSVToProdigyDiscs(csvText) {
        const lines = csvText.trim().split('\n');
        const discs = [];
        
        // Skip header row (line 0)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Parse CSV (handle quotes and commas)
            const columns = this.parseCSVLine(line);
            
            if (columns.length >= 8) {
                const disc = {
                    name: columns[0]?.trim() || '',
                    type: columns[1]?.trim() || '',
                    speed: parseInt(columns[2]) || 0,
                    glide: parseInt(columns[3]) || 0,
                    turn: parseInt(columns[4]) || 0,
                    fade: parseInt(columns[5]) || 0,
                    description: columns[6]?.trim() || '',
                    shopifyCollectionLink: columns[7]?.trim() || '',
                    // Default values for compatibility
                    price: 0,
                    inStock: true
                };
                
                // Only add if name exists
                if (disc.name) {
                    discs.push(disc);
                }
            }
        }
        
        return discs;
    }
    
    /**
     * Parse a single CSV line (handles quotes and commas)
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    // Escaped quote
                    current += '"';
                    i++; // Skip next quote
                } else {
                    // Toggle quote state
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                // Field separator
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        // Add the last field
        result.push(current);
        
        return result;
    }
    
    /**
     * Validate access to public sheets
     */
    async validateAccess() {
        try {
            console.log('🔍 Validating public Google Sheets access...');
            
            const testUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=${this.pdgaSheetGid}`;
            
            const response = await fetch(testUrl);
            if (!response.ok) {
                console.log('❌ Public Google Sheets access validation failed:', response.status, response.statusText);
                return false;
            }
            
            console.log('✅ Public Google Sheets access validated');
            return true;
            
        } catch (error) {
            console.log('❌ Public Google Sheets validation error:', error);
            return false;
        }
    }
    
    /**
     * Clear cached data
     */
    clearCache() {
        this.pdgaCache = null;
        this.pdgaCacheTimestamp = null;
        this.prodigyCache = null;
        this.prodigyCacheTimestamp = null;
        console.log('Cache cleared');
    }
}

// Make service available globally
window.PublicSheetsService = PublicSheetsService;
