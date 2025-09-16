// Prodigy Disc Catalog
// Flight numbers format: [Speed, Glide, Turn, Fade]
const prodigyDiscs = [
    // Distance Drivers
    {
        name: "D1",
        type: "Distance Driver",
        speed: 13,
        glide: 4,
        turn: 0,
        fade: 3,
        description: "Maximum distance overstable driver. Reliable in all conditions with strong fade.",
        shopifyHandle: "prodigy-d1-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D1 Max",
        type: "Distance Driver", 
        speed: 13,
        glide: 5,
        turn: -1,
        fade: 3,
        description: "Slightly less stable than the D1, offering more glide for maximum distance.",
        shopifyHandle: "prodigy-d1-max-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D2",
        type: "Distance Driver",
        speed: 12,
        glide: 6,
        turn: -1,
        fade: 2,
        description: "Versatile distance driver that provides excellent glide and controllable fade.",
        shopifyHandle: "prodigy-d2-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D2 Max",
        type: "Distance Driver",
        speed: 12,
        glide: 6,
        turn: -2,
        fade: 2,
        description: "More understable version of the D2, perfect for newer players or tailwind shots.",
        shopifyHandle: "prodigy-d2-max-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D3",
        type: "Distance Driver",
        speed: 12,
        glide: 6,
        turn: -2,
        fade: 2,
        description: "Understable distance driver excellent for long turnover shots and newer players.",
        shopifyHandle: "prodigy-d3-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D3 Max",
        type: "Distance Driver",
        speed: 12,
        glide: 6,
        turn: -3,
        fade: 1,
        description: "Maximum turn driver for incredible distance with minimal fade.",
        shopifyHandle: "prodigy-d3-max-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D4",
        type: "Distance Driver",
        speed: 13,
        glide: 6,
        turn: -3,
        fade: 2,
        description: "High speed understable driver for maximum distance throws.",
        shopifyHandle: "prodigy-d4-disc",
        price: 18.99,
        inStock: true
    },
    {
        name: "D4 Max",
        type: "Distance Driver",
        speed: 13,
        glide: 6,
        turn: -4,
        fade: 1,
        description: "Ultra understable high-speed driver for massive distance potential.",
        shopifyHandle: "prodigy-d4-max-disc",
        price: 18.99,
        inStock: true
    },

    // Fairway Drivers
    {
        name: "F1",
        type: "Fairway Driver",
        speed: 7,
        glide: 3,
        turn: 0,
        fade: 4,
        description: "Overstable fairway driver with reliable fade, perfect for windy conditions.",
        shopifyHandle: "prodigy-f1-disc",
        price: 16.99,
        inStock: true
    },
    {
        name: "F2",
        type: "Fairway Driver",
        speed: 9,
        glide: 5,
        turn: -1,
        fade: 2,
        description: "Versatile fairway driver offering excellent control and distance.",
        shopifyHandle: "prodigy-f2-disc",
        price: 16.99,
        inStock: true
    },
    {
        name: "F3",
        type: "Fairway Driver",
        speed: 9,
        glide: 5,
        turn: -2,
        fade: 2,
        description: "Understable fairway driver perfect for hyzer-flip shots and newer players.",
        shopifyHandle: "prodigy-f3-disc",
        price: 16.99,
        inStock: true
    },
    {
        name: "F5",
        type: "Fairway Driver",
        speed: 7,
        glide: 5,
        turn: -2,
        fade: 1,
        description: "Understable fairway driver excellent for turnover shots and control.",
        shopifyHandle: "prodigy-f5-disc",
        price: 16.99,
        inStock: true
    },
    {
        name: "F7",
        type: "Fairway Driver",
        speed: 7,
        glide: 5,
        turn: -3,
        fade: 1,
        description: "Very understable fairway driver for easy distance and right-turning flights.",
        shopifyHandle: "prodigy-f7-disc",
        price: 16.99,
        inStock: true
    },

    // Midrange
    {
        name: "M1",
        type: "Midrange",
        speed: 5,
        glide: 4,
        turn: 0,
        fade: 3,
        description: "Overstable midrange with dependable fade, excellent for headwinds.",
        shopifyHandle: "prodigy-m1-disc",
        price: 15.99,
        inStock: true
    },
    {
        name: "M2",
        type: "Midrange",
        speed: 5,
        glide: 5,
        turn: 0,
        fade: 2,
        description: "Stable midrange workhorse, perfect for straight shots with reliable fade.",
        shopifyHandle: "prodigy-m2-disc",
        price: 15.99,
        inStock: true
    },
    {
        name: "M3",
        type: "Midrange",
        speed: 5,
        glide: 5,
        turn: -1,
        fade: 2,
        description: "Slightly understable midrange for versatile shot shaping.",
        shopifyHandle: "prodigy-m3-disc",
        price: 15.99,
        inStock: true
    },
    {
        name: "M4",
        type: "Midrange",
        speed: 5,
        glide: 5,
        turn: -2,
        fade: 1,
        description: "Understable midrange perfect for hyzer-flip shots and newer players.",
        shopifyHandle: "prodigy-m4-disc",
        price: 15.99,
        inStock: true
    },
    {
        name: "MX-3",
        type: "Midrange",
        speed: 5,
        glide: 4,
        turn: 0,
        fade: 2.5,
        description: "Stable midrange with moderate fade, excellent for approach shots.",
        shopifyHandle: "prodigy-mx3-disc",
        price: 15.99,
        inStock: true
    },

    // Approach/Fairway
    {
        name: "A1",
        type: "Approach",
        speed: 4,
        glide: 3,
        turn: 0,
        fade: 3,
        description: "Overstable approach disc that fights any wind condition.",
        shopifyHandle: "prodigy-a1-disc",
        price: 14.99,
        inStock: true
    },
    {
        name: "A2",
        type: "Approach",
        speed: 4,
        glide: 4,
        turn: 0,
        fade: 3,
        description: "Stable approach disc with extra glide for longer approach shots.",
        shopifyHandle: "prodigy-a2-disc",
        price: 14.99,
        inStock: true
    },
    {
        name: "A3",
        type: "Approach",
        speed: 4,
        glide: 4,
        turn: -1,
        fade: 2,
        description: "Slightly understable approach disc for versatile shot options.",
        shopifyHandle: "prodigy-a3-disc",
        price: 14.99,
        inStock: true
    },
    {
        name: "A4",
        type: "Approach",
        speed: 4,
        glide: 4,
        turn: -2,
        fade: 1,
        description: "Understable approach disc perfect for anhyzer approaches.",
        shopifyHandle: "prodigy-a4-disc",
        price: 14.99,
        inStock: true
    },

    // Putters
    {
        name: "PA-1",
        type: "Putter",
        speed: 3,
        glide: 3,
        turn: -1,
        fade: 1,
        description: "Slightly understable putter perfect for straight putts and approach shots.",
        shopifyHandle: "prodigy-pa1-disc",
        price: 13.99,
        inStock: true
    },
    {
        name: "PA-2",
        type: "Putter",
        speed: 3,
        glide: 3,
        turn: 0,
        fade: 2,
        description: "Stable putter with reliable fade, excellent for putting and approaches.",
        shopifyHandle: "prodigy-pa2-disc",
        price: 13.99,
        inStock: true
    },
    {
        name: "PA-3",
        type: "Putter",
        speed: 3,
        glide: 4,
        turn: -1,
        fade: 0.5,
        description: "Understable putter with excellent glide for longer putts.",
        shopifyHandle: "prodigy-pa3-disc",
        price: 13.99,
        inStock: true
    },
    {
        name: "PA-4",
        type: "Putter",
        speed: 3,
        glide: 5,
        turn: -2,
        fade: 0.5,
        description: "Very understable putter perfect for turnover putts and approaches.",
        shopifyHandle: "prodigy-pa4-disc",
        price: 13.99,
        inStock: true
    },
    {
        name: "PA-5",
        type: "Putter",
        speed: 3,
        glide: 5,
        turn: -3,
        fade: 1,
        description: "Ultra understable putter for maximum turnover potential.",
        shopifyHandle: "prodigy-pa5-disc",
        price: 13.99,
        inStock: true
    }
];

// Make available globally
window.prodigyDiscs = prodigyDiscs;
