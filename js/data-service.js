// Data Service for managing both PDGA and Prodigy disc data
class DataService {
    constructor() {
        this.pdgaDiscs = [];
        this.prodigyDiscs = [];
        this.sheetsService = null;
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }

        AppConfig.debug('=== DATA SERVICE INITIALIZATION ===');
        
        try {
            // Check if Google Sheets is configured and enabled
            if (window.AppConfig && window.AppConfig.app.useGoogleSheets && AppConfig.googleSheets.spreadsheetId) {
                AppConfig.debug('✅ Initializing Public Sheets service (secure)...');
                
                this.sheetsService = new PublicSheetsService(
                    AppConfig.googleSheets.spreadsheetId,
                    '0', // First sheet (PDGA)
                    '1'  // Second sheet (Prodigy)
                );
                
                // Validate access first
                AppConfig.debug('🔍 Validating Google Sheets access...');
                const accessValid = await this.sheetsService.validateAccess();
                if (!accessValid) {
                    throw new Error('Google Sheets access validation failed');
                }
                AppConfig.debug('✅ Google Sheets access validated');
                
                // Fetch both datasets in parallel
                AppConfig.debug('📥 Fetching disc data from Google Sheets...');
                const [pdgaData, prodigyData] = await Promise.all([
                    this.sheetsService.fetchPDGADiscs(),
                    this.sheetsService.fetchProdigyDiscs()
                ]);
                
                this.pdgaDiscs = pdgaData;
                this.prodigyDiscs = prodigyData;
                
                AppConfig.debug('✅ Successfully loaded data from Google Sheets:');
                AppConfig.debug(`   - ${this.pdgaDiscs.length} PDGA discs`);
                AppConfig.debug(`   - ${this.prodigyDiscs.length} Prodigy discs`);
                
            } else {
                // Use static data as fallback
                AppConfig.debug('⚠️ Using static disc data as fallback');
                AppConfig.debug('Reason - useGoogleSheets:', window.AppConfig?.app?.useGoogleSheets);
                AppConfig.debug('Reason - isConfigured:', window.AppConfig?.isGoogleSheetsConfigured());
                
                this.pdgaDiscs = window.pdgaDiscs || [];
                this.prodigyDiscs = window.prodigyDiscs || [];
            }
            
            this.isInitialized = true;
            AppConfig.debug('✅ Data service initialization complete');
            
            if (this.pdgaDiscs.length === 0) {
                console.warn('No PDGA disc data available');
            }
            if (this.prodigyDiscs.length === 0) {
                console.warn('No Prodigy disc data available');
            }
            
        } catch (error) {
            console.error('Error initializing data service:', error);
            
            // Fallback to static data
            this.pdgaDiscs = window.pdgaDiscs || [];
            this.prodigyDiscs = window.prodigyDiscs || [];
            this.isInitialized = true;
            
            AppConfig.debug('⚠️ Fell back to static data due to error');
        }
    }

    getPDGADiscs() {
        return this.pdgaDiscs;
    }

    getProdigyDiscs() {
        return this.prodigyDiscs;
    }

    async refreshData() {
        if (this.sheetsService) {
            AppConfig.debug('🔄 Refreshing data from Google Sheets...');
            
            try {
                // Clear cache and fetch fresh data
                this.sheetsService.clearCache();
                
                const [pdgaData, prodigyData] = await Promise.all([
                    this.sheetsService.fetchPDGADiscs(),
                    this.sheetsService.fetchProdigyDiscs()
                ]);
                
                this.pdgaDiscs = pdgaData;
                this.prodigyDiscs = prodigyData;
                
                AppConfig.debug('✅ Data refreshed successfully');
                return true;
                
            } catch (error) {
                console.error('Error refreshing data:', error);
                return false;
            }
        }
        return false;
    }

    getStatus() {
        return {
            isInitialized: this.isInitialized,
            usingGoogleSheets: !!this.sheetsService,
            pdgaDiscCount: this.pdgaDiscs.length,
            prodigyDiscCount: this.prodigyDiscs.length
        };
    }
}

// Create global instance
window.dataService = new DataService();
