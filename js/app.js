// Main application controller
class DiscComparisonApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }
    
    setupApp() {
        // Verify data is loaded
        if (!window.pdgaDiscs || !window.prodigyDiscs) {
            console.error('Disc data not loaded properly');
            return;
        }
        
        console.log(`Loaded ${window.pdgaDiscs.length} PDGA discs and ${window.prodigyDiscs.length} Prodigy discs`);
        
        // Initialize components (they initialize themselves, this is just for monitoring)
        this.monitorComponents();
        
        // Add any global event listeners or setup here
        this.setupGlobalHandlers();
    }
    
    monitorComponents() {
        // Check if components are properly initialized
        setTimeout(() => {
            if (window.discSearch) {
                console.log('Search component initialized');
            } else {
                console.error('Search component failed to initialize');
            }
            
            if (window.discComparison) {
                console.log('Comparison component initialized');
            } else {
                console.error('Comparison component failed to initialize');
            }
        }, 100);
    }
    
    setupGlobalHandlers() {
        // Handle any global keyboard shortcuts or events
        document.addEventListener('keydown', (e) => {
            // ESC key to close search results
            if (e.key === 'Escape' && window.discSearch) {
                window.discSearch.hideSearchResults();
            }
        });
        
        // Add analytics or tracking if needed
        this.setupAnalytics();
    }
    
    setupAnalytics() {
        // Placeholder for analytics setup
        // This could integrate with Google Analytics, Shopify Analytics, etc.
        console.log('Analytics setup placeholder');
    }
    
    // Method to get app state for debugging
    getAppState() {
        return {
            pdgaDiscsLoaded: !!window.pdgaDiscs,
            prodigyDiscsLoaded: !!window.prodigyDiscs,
            searchInitialized: !!window.discSearch,
            comparisonInitialized: !!window.discComparison,
            selectedDisc: window.discSearch ? window.discSearch.getSelectedDisc() : null
        };
    }
    
    // Method to reset the app
    reset() {
        if (window.discSearch) {
            window.discSearch.searchInput.value = '';
            window.discSearch.hideSearchResults();
            window.discSearch.selectedDisc = null;
        }
        
        const comparisonResults = document.getElementById('comparisonResults');
        if (comparisonResults) {
            comparisonResults.classList.add('hidden');
        }
    }
}

// Initialize the app
window.discApp = new DiscComparisonApp();

// Make app methods available globally for debugging
window.getAppState = () => window.discApp.getAppState();
window.resetApp = () => window.discApp.reset();
