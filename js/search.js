class DiscSearch {
    constructor() {
        this.searchInput = document.getElementById('discSearch');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.searchContainer = document.getElementById('searchContainer');
        this.filteredDiscs = [];
        this.selectedDisc = null;
        this.pdgaDiscs = [];
        this.isLoading = false;
        
        this.initializeData();
    }
    
    async initializeData() {
        this.showLoading();
        
        try {
            AppConfig.debug('=== DISC SEARCH INITIALIZATION ===');
            
            // Initialize data service
            await window.dataService.initialize();
            
            // Get PDGA disc data
            this.pdgaDiscs = window.dataService.getPDGADiscs();
            
            AppConfig.debug('📊 Data service status:', window.dataService.getStatus());
            
            this.hideLoading();
            this.initializeEventListeners();
            
            if (this.pdgaDiscs.length === 0) {
                this.showError('No PDGA disc data available. Please check your configuration.');
            }
            
        } catch (error) {
            console.error('Error initializing disc data:', error);
            
            // Fallback to static data
            this.pdgaDiscs = window.pdgaDiscs || [];
            this.hideLoading();
            this.initializeEventListeners();
            
            if (this.pdgaDiscs.length === 0) {
                this.showError('Failed to load disc data. Using limited fallback data.');
            }
        }
    }
    
    showLoading() {
        this.isLoading = true;
        this.loadingIndicator.classList.remove('hidden');
        this.searchContainer.classList.add('search-disabled');
    }
    
    hideLoading() {
        this.isLoading = false;
        this.loadingIndicator.classList.add('hidden');
        this.searchContainer.classList.remove('search-disabled');
    }
    
    showError(message) {
        // You could add a dedicated error display element
        console.error(message);
        this.searchInput.placeholder = `Error: ${message}`;
    }
    
    initializeEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        this.searchBtn.addEventListener('click', () => {
            this.handleSearch(this.searchInput.value);
        });
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(this.searchInput.value);
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }
    
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }
        
        this.filteredDiscs = this.filterDiscs(query);
        this.displaySearchResults(this.filteredDiscs);
    }
    
    filterDiscs(query) {
        const searchTerm = query.toLowerCase().trim();
        const maxResults = AppConfig?.app?.maxSearchResults || 8;
        
        return this.pdgaDiscs.filter(disc => {
            const nameMatch = disc.name.toLowerCase().includes(searchTerm);
            const manufacturerMatch = disc.manufacturer.toLowerCase().includes(searchTerm);
            const typeMatch = disc.type.toLowerCase().includes(searchTerm);
            
            return nameMatch || manufacturerMatch || typeMatch;
        }).slice(0, maxResults); // Limit results for performance
    }
    
    displaySearchResults(discs) {
        if (discs.length === 0) {
            this.searchResults.innerHTML = '<div class="p-3 text-sm text-gray-600 text-center">No discs found matching your search.</div>';
            this.showSearchResults();
            return;
        }
        
        const resultsHTML = discs.map(disc => `
            <div class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0" 
                 data-disc='${JSON.stringify(disc)}' role="option">
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm truncate text-gray-900">${disc.name}</div>
                    <div class="text-xs text-gray-600">
                        ${disc.manufacturer} • ${disc.type}
                    </div>
                </div>
                <div class="flex items-center gap-1 ml-3">
                    <span class="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-700" title="Speed">${disc.speed}</span>
                    <span class="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-700" title="Glide">${disc.glide}</span>
                    <span class="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-700" title="Turn">${disc.turn}</span>
                    <span class="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-semibold rounded-md bg-gray-100 text-gray-700" title="Fade">${disc.fade}</span>
                </div>
            </div>
        `).join('');
        
        this.searchResults.innerHTML = resultsHTML;
        this.showSearchResults();
        
        // Add click listeners to search results
        this.searchResults.querySelectorAll('[role="option"]').forEach(item => {
            item.addEventListener('click', () => {
                const discData = JSON.parse(item.dataset.disc);
                this.selectDisc(discData);
            });
        });
    }
    
    selectDisc(disc) {
        this.selectedDisc = disc;
        this.hideSearchResults();
        this.searchInput.value = `${disc.name} (${disc.manufacturer})`;
        
        // Trigger comparison
        if (window.discComparison) {
            window.discComparison.findMatches(disc);
        }
    }
    
    showSearchResults() {
        this.searchResults.classList.remove('hidden');
    }
    
    hideSearchResults() {
        this.searchResults.classList.add('hidden');
    }
    
    getSelectedDisc() {
        return this.selectedDisc;
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.discSearch = new DiscSearch();
});
