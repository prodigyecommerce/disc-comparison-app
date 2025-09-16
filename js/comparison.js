class DiscComparison {
    constructor() {
        this.comparisonResults = document.getElementById('comparisonResults');
        this.selectedDiscElement = document.getElementById('selectedDisc');
        this.bestMatchElement = document.getElementById('bestMatch');
        this.alternative1Element = document.getElementById('alternative1');
        this.alternative2Element = document.getElementById('alternative2');
    }
    
    findMatches(selectedDisc) {
        const matches = this.calculateMatches(selectedDisc);
        this.displayResults(selectedDisc, matches);
    }
    
    calculateMatches(targetDisc) {
        const prodigyDiscs = window.dataService.getProdigyDiscs();
        
        AppConfig.debug(`🎯 Finding matches for ${targetDisc.name} (${targetDisc.type})`);
        
        const similarities = prodigyDiscs.map(prodigyDisc => {
            const similarity = this.calculateSimilarity(targetDisc, prodigyDisc);
            const typeSim = this.calculateTypeSimilarity(targetDisc.type, prodigyDisc.type);
            
            return {
                disc: prodigyDisc,
                similarity: similarity,
                percentage: Math.round(similarity * 100),
                typeSimilarity: typeSim
            };
        });
        
        // Sort by similarity (highest first)
        similarities.sort((a, b) => b.similarity - a.similarity);
        
        // Debug output for top 3 matches
        AppConfig.debug('📊 Top 3 matches:');
        similarities.slice(0, 3).forEach((match, i) => {
            AppConfig.debug(`   ${i + 1}. ${match.disc.name} (${match.disc.type}) - ${match.percentage}% match (type: ${Math.round(match.typeSimilarity * 100)}%)`);
        });
        
        return {
            best: similarities[0],
            alternatives: similarities.slice(1, 3)
        };
    }
    
    calculateSimilarity(disc1, disc2) {
        // Weight factors for different characteristics
        // Type matching is most important - you don't want putter recommendations for drivers!
        const weights = {
            type: 0.40,     // Highest priority - disc type must be similar
            turn: 0.20,     // Turn is very important for flight behavior
            speed: 0.15,    // Speed determines throw requirements
            fade: 0.15,     // Fade affects landing behavior
            glide: 0.10     // Glide is least critical for matching
        };
        
        // Calculate type similarity (exact match gets full points, related types get partial)
        const typeSimilarity = this.calculateTypeSimilarity(disc1.type, disc2.type);
        
        // Calculate normalized differences (0-1 scale where 0 = identical, 1 = max difference)
        const speedDiff = Math.abs(disc1.speed - disc2.speed) / 14; // Max speed is ~14
        const glideDiff = Math.abs(disc1.glide - disc2.glide) / 7;   // Max glide is ~7
        const turnDiff = Math.abs(disc1.turn - disc2.turn) / 5;      // Turn range is roughly -5 to +1
        const fadeDiff = Math.abs(disc1.fade - disc2.fade) / 4;      // Max fade is ~4
        
        // Calculate weighted similarity score
        const totalDiff = ((1 - typeSimilarity) * weights.type) +
                         (speedDiff * weights.speed) + 
                         (glideDiff * weights.glide) + 
                         (turnDiff * weights.turn) + 
                         (fadeDiff * weights.fade);
        
        // Convert to similarity (1 = identical, 0 = completely different)
        return Math.max(0, 1 - totalDiff);
    }
    
    calculateTypeSimilarity(type1, type2) {
        // Normalize type names for comparison
        const normalizeType = (type) => type.toLowerCase().replace(/\s+/g, '');
        const norm1 = normalizeType(type1);
        const norm2 = normalizeType(type2);
        
        // Exact match
        if (norm1 === norm2) return 1.0;
        
        // Define type compatibility groups
        const typeGroups = {
            drivers: ['distancedriver', 'fairwaydriver', 'driver'],
            midrange: ['midrange', 'mid', 'approach'],
            putters: ['putter', 'putting', 'approach']
        };
        
        // Check if both types are in the same group
        for (const [groupName, types] of Object.entries(typeGroups)) {
            const type1InGroup = types.some(t => norm1.includes(t) || t.includes(norm1));
            const type2InGroup = types.some(t => norm2.includes(t) || t.includes(norm2));
            
            if (type1InGroup && type2InGroup) {
                // Same group but different subtypes
                if (groupName === 'drivers') {
                    // Distance drivers vs fairway drivers are similar but not identical
                    return 0.7;
                } else if (groupName === 'midrange') {
                    // Midrange and approach are very similar
                    return 0.8;
                } else {
                    // Putters group
                    return 0.8;
                }
            }
        }
        
        // Special cases for related types
        if ((norm1.includes('approach') && norm2.includes('midrange')) || 
            (norm1.includes('midrange') && norm2.includes('approach'))) {
            return 0.6;
        }
        
        // Completely different types
        return 0.0;
    }
    
    displayResults(selectedDisc, matches) {
        // Display selected disc
        this.selectedDiscElement.innerHTML = this.createCompactDiscCard(selectedDisc, false);
        
        // Display best match
        this.bestMatchElement.innerHTML = this.createRecommendationCard(matches.best.disc, true, matches.best.percentage);
        
        // Update best match percentage
        const bestMatchPercentage = document.getElementById('bestMatchPercentage');
        if (bestMatchPercentage) {
            bestMatchPercentage.textContent = `${matches.best.percentage}%`;
        }
        
        // Display alternatives
        this.alternative1Element.innerHTML = this.createAlternativeItem(matches.alternatives[0].disc, matches.alternatives[0].percentage);
        this.alternative2Element.innerHTML = this.createAlternativeItem(matches.alternatives[1].disc, matches.alternatives[1].percentage);
        
        // Show results
        this.comparisonResults.classList.remove('hidden');
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Smooth scroll to results
        this.comparisonResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    createDiscCard(disc, isProdigy = false, similarityPercentage = null) {
        const shopifyLink = isProdigy ? `
            <a href="${disc.shopifyCollectionLink || `https://${AppConfig.shopify.storeDomain}/products/${disc.shopifyHandle}`}" 
               class="shopify-link" target="_blank">
                <span>View Product</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </a>
        ` : '';
        
        const similarityBadge = similarityPercentage ? `
            <div class="similarity-score">
                <span>${similarityPercentage}% Match</span>
            </div>
        ` : '';
        
        const description = disc.description ? `
            <div class="disc-description">${disc.description}</div>
        ` : '';
        
        return `
            <div class="disc-card-header">
                <h4 class="disc-card-title">${disc.name}</h4>
                <div class="disc-card-manufacturer">${isProdigy ? 'Prodigy Disc' : disc.manufacturer}</div>
            </div>
            <div class="flight-display">
                <div class="flight-stat">
                    <div class="label">Speed</div>
                    <div class="value">${disc.speed}</div>
                </div>
                <div class="flight-stat">
                    <div class="label">Glide</div>
                    <div class="value">${disc.glide}</div>
                </div>
                <div class="flight-stat">
                    <div class="label">Turn</div>
                    <div class="value">${disc.turn}</div>
                </div>
                <div class="flight-stat">
                    <div class="label">Fade</div>
                    <div class="value">${disc.fade}</div>
                </div>
            </div>
            ${description}
            ${similarityBadge}
            ${shopifyLink}
        `;
    }

    createCompactDiscCard(disc, isProdigy = false) {
        return `
            <div class="flex-1 min-w-0">
                <div class="font-semibold text-base text-foreground">${disc.name}</div>
                <div class="text-sm text-muted-foreground mb-2">${isProdigy ? 'Prodigy Disc' : disc.manufacturer}</div>
                <div class="flex items-center gap-1">
                    <span class="flight-number-badge" title="Speed">${disc.speed}</span>
                    <span class="flight-number-badge" title="Glide">${disc.glide}</span>
                    <span class="flight-number-badge" title="Turn">${disc.turn}</span>
                    <span class="flight-number-badge" title="Fade">${disc.fade}</span>
                </div>
            </div>
        `;
    }

    createRecommendationCard(disc, isProdigy = false, similarityPercentage = null) {
        const shopifyLink = isProdigy ? `
            <a href="${disc.shopifyCollectionLink || `https://${AppConfig.shopify.storeDomain}/products/${disc.shopifyHandle}`}" 
               class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full mt-4" 
               target="_blank">
                <span>View Product</span>
                <i data-lucide="external-link" class="w-4 h-4 ml-2"></i>
            </a>
        ` : '';
        
        const description = disc.description ? `
            <p class="text-sm text-muted-foreground mt-3">${disc.description}</p>
        ` : '';
        
        return `
            <div class="text-center mb-4">
                <h4 class="font-semibold text-lg text-foreground">${disc.name}</h4>
                <div class="text-sm text-muted-foreground">${isProdigy ? 'Prodigy Disc' : disc.manufacturer}</div>
            </div>
            <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="text-center">
                    <div class="text-xs text-muted-foreground mb-1">Speed</div>
                    <div class="text-lg font-bold text-foreground">${disc.speed}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-muted-foreground mb-1">Glide</div>
                    <div class="text-lg font-bold text-foreground">${disc.glide}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-muted-foreground mb-1">Turn</div>
                    <div class="text-lg font-bold text-foreground">${disc.turn}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-muted-foreground mb-1">Fade</div>
                    <div class="text-lg font-bold text-foreground">${disc.fade}</div>
                </div>
            </div>
            ${description}
            ${shopifyLink}
        `;
    }

    createAlternativeItem(disc, similarityPercentage) {
        const shopifyLink = disc.shopifyCollectionLink || `https://${AppConfig.shopify.storeDomain}/products/${disc.shopifyHandle}`;
        
        return `
            <a href="${shopifyLink}" target="_blank" class="flex items-center justify-between p-4 bg-muted/50 rounded-lg border hover:bg-muted/70 transition-colors no-underline text-current">
                <div class="flex items-center flex-1">
                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-sm text-foreground">${disc.name}</div>
                        <div class="text-xs text-muted-foreground">${disc.speed} | ${disc.glide} | ${disc.turn} | ${disc.fade}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">${similarityPercentage}% Match</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-muted-foreground"></i>
                </div>
            </a>
        `;
    }
    
    // Method to get flight number comparison explanation
    getComparisonExplanation(disc1, disc2) {
        const explanations = [];
        
        // Type comparison (most important)
        const typeSimilarity = this.calculateTypeSimilarity(disc1.type, disc2.type);
        if (typeSimilarity === 1.0) {
            explanations.push("Exact disc type match");
        } else if (typeSimilarity >= 0.7) {
            explanations.push("Similar disc type category");
        } else if (typeSimilarity >= 0.5) {
            explanations.push("Related disc type");
        }
        
        // Flight number comparisons
        if (Math.abs(disc1.speed - disc2.speed) <= 1) {
            explanations.push("Similar speed for comparable distance potential");
        }
        
        if (Math.abs(disc1.turn - disc2.turn) <= 0.5) {
            explanations.push("Similar turn behavior during flight");
        }
        
        if (Math.abs(disc1.fade - disc2.fade) <= 0.5) {
            explanations.push("Comparable fade at the end of flight");
        }
        
        if (Math.abs(disc1.glide - disc2.glide) <= 1) {
            explanations.push("Comparable glide characteristics");
        }
        
        return explanations.length > 0 ? explanations.join(". ") : "Different characteristics but still a viable alternative";
    }
}

// Initialize comparison when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.discComparison = new DiscComparison();
});

