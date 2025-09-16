// PDGA Approved Disc Database
// Flight numbers format: [Speed, Glide, Turn, Fade]
const pdgaDiscs = [
    // Popular Distance Drivers
    { name: "Destroyer", manufacturer: "Innova", type: "Distance Driver", speed: 12, glide: 5, turn: -1, fade: 3 },
    { name: "Wraith", manufacturer: "Innova", type: "Distance Driver", speed: 11, glide: 5, turn: -1, fade: 3 },
    { name: "Thunderbird", manufacturer: "Innova", type: "Fairway Driver", speed: 9, glide: 5, turn: 0, fade: 2 },
    { name: "Teebird", manufacturer: "Innova", type: "Fairway Driver", speed: 7, glide: 5, turn: 0, fade: 2 },
    { name: "Leopard", manufacturer: "Innova", type: "Fairway Driver", speed: 6, glide: 5, turn: -2, fade: 1 },
    { name: "Roc", manufacturer: "Innova", type: "Midrange", speed: 4, glide: 4, turn: 0, fade: 3 },
    { name: "Aviar", manufacturer: "Innova", type: "Putter", speed: 2, glide: 3, turn: 0, fade: 1 },
    
    // Discraft
    { name: "Zeus", manufacturer: "Discraft", type: "Distance Driver", speed: 12, glide: 5, turn: -1, fade: 3 },
    { name: "Force", manufacturer: "Discraft", type: "Distance Driver", speed: 12, glide: 5, turn: 0, fade: 3 },
    { name: "Undertaker", manufacturer: "Discraft", type: "Fairway Driver", speed: 9, glide: 5, turn: -1, fade: 2 },
    { name: "Buzzz", manufacturer: "Discraft", type: "Midrange", speed: 5, glide: 4, turn: -1, fade: 1 },
    { name: "Luna", manufacturer: "Discraft", type: "Putter", speed: 3, glide: 3, turn: 0, fade: 2 },
    
    // Dynamic Discs
    { name: "Raider", manufacturer: "Dynamic Discs", type: "Distance Driver", speed: 13, glide: 5, turn: -1, fade: 3 },
    { name: "Escape", manufacturer: "Dynamic Discs", type: "Fairway Driver", speed: 9, glide: 5, turn: -1, fade: 2 },
    { name: "Truth", manufacturer: "Dynamic Discs", type: "Midrange", speed: 5, glide: 5, turn: 0, fade: 2 },
    { name: "Judge", manufacturer: "Dynamic Discs", type: "Putter", speed: 2, glide: 4, turn: 0, fade: 1 },
    
    // Latitude 64
    { name: "Ballista Pro", manufacturer: "Latitude 64", type: "Distance Driver", speed: 14, glide: 4, turn: 0, fade: 3 },
    { name: "River", manufacturer: "Latitude 64", type: "Fairway Driver", speed: 7, glide: 7, turn: -1, fade: 1 },
    { name: "Compass", manufacturer: "Latitude 64", type: "Midrange", speed: 5, glide: 5, turn: -1, fade: 1 },
    { name: "Pure", manufacturer: "Latitude 64", type: "Putter", speed: 3, glide: 3, turn: -1, fade: 1 },
    
    // Trilogy (Westside)
    { name: "King", manufacturer: "Westside", type: "Distance Driver", speed: 14, glide: 5, turn: -1.5, fade: 3 },
    { name: "Northman", manufacturer: "Westside", type: "Distance Driver", speed: 10, glide: 5, turn: -4, fade: 1 },
    { name: "Warship", manufacturer: "Westside", type: "Midrange", speed: 5, glide: 6, turn: -1, fade: 1 },
    
    // MVP/Axiom
    { name: "Photon", manufacturer: "MVP", type: "Distance Driver", speed: 11, glide: 5, turn: -1, fade: 2.5 },
    { name: "Tesla", manufacturer: "MVP", type: "Fairway Driver", speed: 9, glide: 5, turn: -1, fade: 2 },
    { name: "Vector", manufacturer: "MVP", type: "Midrange", speed: 5, glide: 3, turn: 0, fade: 2 },
    { name: "Atom", manufacturer: "MVP", type: "Putter", speed: 3, glide: 3, turn: 0, fade: 1 },
    
    // Gateway
    { name: "Journey", manufacturer: "Gateway", type: "Distance Driver", speed: 11, glide: 6, turn: -2, fade: 2 },
    { name: "Prophecy", manufacturer: "Gateway", type: "Fairway Driver", speed: 8, glide: 5, turn: -2, fade: 2 },
    { name: "Element", manufacturer: "Gateway", type: "Midrange", speed: 5, glide: 5, turn: -1, fade: 1 },
    { name: "Wizard", manufacturer: "Gateway", type: "Putter", speed: 2, glide: 3, turn: 0, fade: 2 },
    
    // Kastaplast
    { name: "Grym", manufacturer: "Kastaplast", type: "Distance Driver", speed: 12, glide: 5, turn: -1, fade: 3 },
    { name: "Lots", manufacturer: "Kastaplast", type: "Fairway Driver", speed: 9, glide: 5, turn: -1, fade: 2 },
    { name: "Gote", manufacturer: "Kastaplast", type: "Midrange", speed: 4, glide: 4, turn: 0, fade: 2 },
    { name: "Reko", manufacturer: "Kastaplast", type: "Putter", speed: 3, glide: 3, turn: 0, fade: 1 },
    
    // Streamline
    { name: "Trace", manufacturer: "Streamline", type: "Distance Driver", speed: 11, glide: 5, turn: -1, fade: 2 },
    { name: "Drift", manufacturer: "Streamline", type: "Fairway Driver", speed: 7, glide: 5, turn: -2, fade: 1 },
    { name: "Runway", manufacturer: "Streamline", type: "Midrange", speed: 5, glide: 4, turn: 0, fade: 2 },
    { name: "Pilot", manufacturer: "Streamline", type: "Putter", speed: 2, glide: 5, turn: -1, fade: 1 },
    
    // Additional popular discs
    { name: "Shryke", manufacturer: "Innova", type: "Distance Driver", speed: 13, glide: 6, turn: -2, fade: 2 },
    { name: "Valkyrie", manufacturer: "Innova", type: "Distance Driver", speed: 9, glide: 4, turn: -2, fade: 2 },
    { name: "Eagle", manufacturer: "Innova", type: "Fairway Driver", speed: 7, glide: 4, turn: -1, fade: 3 },
    { name: "Mako3", manufacturer: "Innova", type: "Midrange", speed: 5, glide: 5, turn: 0, fade: 0 },
    { name: "Champion Roc3", manufacturer: "Innova", type: "Midrange", speed: 5, glide: 4, turn: 0, fade: 3 },
    { name: "Vulcan", manufacturer: "Innova", type: "Distance Driver", speed: 13, glide: 5, turn: -4, fade: 2 },
    { name: "Roadrunner", manufacturer: "Innova", type: "Distance Driver", speed: 9, glide: 5, turn: -4, fade: 1 },
    { name: "Sidewinder", manufacturer: "Innova", type: "Distance Driver", speed: 9, glide: 5, turn: -3, fade: 1 },
    { name: "Beast", manufacturer: "Innova", type: "Distance Driver", speed: 10, glide: 5, turn: -2, fade: 2 },
    { name: "Tern", manufacturer: "Innova", type: "Distance Driver", speed: 12, glide: 6, turn: -3, fade: 2 }
];

// Make available globally
window.pdgaDiscs = pdgaDiscs;
