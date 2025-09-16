// Example of how to integrate with Shopify Metaobjects
// This would replace the static prodigy-discs.js data in production

class ShopifyIntegration {
    constructor(storeDomain, accessToken) {
        this.storeDomain = storeDomain;
        this.accessToken = accessToken;
        this.apiVersion = '2024-01';
    }
    
    // Example GraphQL query to fetch disc data from Shopify metaobjects
    async fetchProdigyDiscs() {
        const query = `
            query getDiscCatalog {
                metaobjects(type: "disc_catalog", first: 50) {
                    edges {
                        node {
                            id
                            handle
                            fields {
                                key
                                value
                            }
                        }
                    }
                }
            }
        `;
        
        try {
            const response = await fetch(`https://${this.storeDomain}/admin/api/${this.apiVersion}/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': this.accessToken
                },
                body: JSON.stringify({ query })
            });
            
            const data = await response.json();
            return this.transformMetaobjectsToDiscs(data.data.metaobjects.edges);
        } catch (error) {
            console.error('Error fetching disc data from Shopify:', error);
            return [];
        }
    }
    
    // Transform Shopify metaobject data to disc format
    transformMetaobjectsToDiscs(metaobjects) {
        return metaobjects.map(({ node }) => {
            const fields = {};
            node.fields.forEach(field => {
                fields[field.key] = field.value;
            });
            
            return {
                name: fields.name,
                type: fields.type,
                speed: parseInt(fields.speed),
                glide: parseInt(fields.glide),
                turn: parseInt(fields.turn),
                fade: parseInt(fields.fade),
                description: fields.description,
                shopifyHandle: node.handle,
                price: parseFloat(fields.price),
                inStock: fields.in_stock === 'true'
            };
        });
    }
    
    // Example method to get product data from Shopify
    async getProductByHandle(handle) {
        const query = `
            query getProduct($handle: String!) {
                productByHandle(handle: $handle) {
                    id
                    title
                    handle
                    description
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                price
                                availableForSale
                            }
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        `;
        
        try {
            const response = await fetch(`https://${this.storeDomain}/api/${this.apiVersion}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': this.storefrontToken
                },
                body: JSON.stringify({ 
                    query, 
                    variables: { handle } 
                })
            });
            
            const data = await response.json();
            return data.data.productByHandle;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return null;
        }
    }
}

// Example usage:
// const shopify = new ShopifyIntegration('your-store.myshopify.com', 'your-access-token');
// const prodigyDiscs = await shopify.fetchProdigyDiscs();

// Example Shopify metaobject structure for disc catalog:
/*
Metaobject Type: disc_catalog
Fields:
- name (single_line_text): "D1"
- type (single_line_text): "Distance Driver"
- speed (number_integer): 13
- glide (number_integer): 4
- turn (number_integer): 0
- fade (number_integer): 3
- description (multi_line_text): "Maximum distance overstable driver..."
- price (number_decimal): 18.99
- in_stock (boolean): true
- product_handle (single_line_text): "prodigy-d1-disc"
*/

// To integrate this in the main app:
// 1. Replace the static import of prodigy-discs.js
// 2. Initialize ShopifyIntegration on app startup
// 3. Load disc data from Shopify instead of static files
// 4. Update the comparison.js to handle async data loading
