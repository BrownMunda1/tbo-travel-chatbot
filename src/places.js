const itineraryPlaces = [
    {
        city: 'chandigarh',
        code: 114107,
        places: [
            { place: 'Rock Garden', price: 500 },
            { place: 'Sukhna Lake', price: 300 },
            { place: 'Rose Garden', price: 400 },
            { place: 'Capitol Complex', price: 350 },
            { place: 'Le Corbusier Centre', price: 250 },
            { place: 'Government Museum', price: 280 },
            { place: 'Open Hand Monument', price: 320 }
        ]
    },
    {
        city: 'gangtok',
        code: 119221,
        places: [
            { place: 'Nathula Pass', price: 800 },
            { place: 'Tsomgo Lake', price: 600 },
            { place: 'Rumtek Monastery', price: 700 },
            { place: 'Ganesh Tok', price: 400 },
            { place: 'Banjhakri Falls', price: 350 },
            { place: 'Hanuman Tok', price: 500 },
            { place: 'Enchey Monastery', price: 450 }
        ]
    },
    {
        city: 'goa',
        code: 119805,
        places: [
            { place: 'Baga Beach', price: 300 },
            { place: 'Calangute Beach', price: 250 },
            { place: 'Dudhsagar Falls', price: 600 },
            { place: 'Fort Aguada', price: 400 },
            { place: 'Anjuna Flea Market', price: 350 },
            { place: 'Basilica of Bom Jesus', price: 450 },
            { place: 'Chapora Fort', price: 280 }
        ]
    },
    {
        city: 'kasauli',
        code: 122950,
        places: [
            { place: 'Mall Road', price: 200 },
            { place: 'Sunset Point', price: 150 },
            { place: 'Monkey Point', price: 250 },
            { place: 'Christ Church', price: 180 },
            { place: 'Gurkha Fort', price: 220 },
            { place: 'Kasauli Brewery', price: 300 },
            { place: 'Garden of Char Minar', price: 320 }
        ]
    },
    {
        city: 'ladakh',
        code: 150363,
        places: [
            { place: 'Pangong Lake', price: 700 },
            { place: 'Nubra Valley', price: 800 },
            { place: 'Shanti Stupa', price: 300 },
            { place: 'Hemis Monastery', price: 500 },
            { place: 'Leh Palace', price: 400 },
            { place: 'Zanskar Valley', price: 600 },
            { place: 'Tso Moriri Lake', price: 750 }
        ]
    },
    {
        city: 'manali',
        code: 126388,
        places: [
            { place: 'Rohtang Pass', price: 600 },
            { place: 'Solang Valley', price: 400 },
            { place: 'Hadimba Temple', price: 300 },
            { place: 'Old Manali', price: 250 },
            { place: 'Beas River', price: 350 },
            { place: 'Great Himalayan National Park', price: 450 },
            { place: 'Manu Temple', price: 280 }
        ]
    },
    {
        city: 'munnar',
        code: 128573,
        places: [
            { place: 'Tea Gardens', price: 300 },
            { place: 'Eravikulam National Park', price: 250 },
            { place: 'Attukal Waterfalls', price: 400 },
            { place: 'Mattupetty Dam', price: 350 },
            { place: 'Top Station', price: 500 },
            { place: 'Kundala Lake', price: 320 },
            { place: 'Anamudi Peak', price: 450 }
        ]
    },
    {
        city: 'nainital',
        code: 129726,
        places: [
            { place: 'Naini Lake', price: 350 },
            { place: 'Naina Devi Temple', price: 250 },
            { place: 'Snow View Point', price: 300 },
            { place: 'Tiffin Top', price: 400 },
            { place: 'Mall Road', price: 200 },
            { place: 'High Altitude Zoo', price: 280 },
            { place: 'Gurney House', price: 320 }
        ]
    },
    {
        city: 'shimla',
        code: 138673,
        places: [
            { place: 'The Ridge', price: 300 },
            { place: 'Jakhoo Temple', price: 250 },
            { place: 'Mall Road', price: 400 },
            { place: 'Christ Church', price: 350 },
            { place: 'Kufri', price: 500 },
            { place: 'Tara Devi Temple', price: 280 },
            { place: 'Annandale', price: 320 }
        ]
    },
    {
        city: 'udaipur',
        code: 140522,
        places: [
            { place: 'City Palace', price: 400 },
            { place: 'Lake Pichola', price: 350 },
            { place: 'Jag Mandir', price: 300 },
            { place: 'Saheliyon Ki Bari', price: 250 },
            { place: 'Vintage Car Museum', price: 200 },
            { place: 'Sajjangarh Palace', price: 280 },
            { place: 'Fateh Sagar Lake', price: 320 }
        ]
    },
    {
        city: 'new delhi',
        code: 130443,
        places: [
            { place: 'Red Fort', price: 300 },
            { place: 'India Gate', price: 250 },
            { place: 'Qutub Minar', price: 400 },
            { place: 'Lotus Temple', price: 350 },
            { place: 'Humayun’s Tomb', price: 500 },
            { place: 'Akshardham Temple', price: 280 },
            { place: 'Jama Masjid', price: 320 }
        ]
    },
    {
        city: 'srinagar',
        code: 139456,
        places: [
            { place: 'Dal Lake', price: 350 },
            { place: 'Shalimar Bagh', price: 250 },
            { place: 'Nishat Bagh', price: 300 },
            { place: 'Shankaracharya Temple', price: 400 },
            { place: 'Pari Mahal', price: 200 },
            { place: 'Chashme Shahi Gardens', price: 280 },
            { place: 'Hazratbal Shrine', price: 320 }
        ]
    },
    {
        city: 'mumbai',
        code: 144306,
        places: [
            { place: 'Gateway of India', price: 400 },
            { place: 'Marine Drive', price: 350 },
            { place: 'Siddhivinayak Temple', price: 300 },
            { place: 'Haji Ali Dargah', price: 250 },
            { place: 'Elephanta Caves', price: 200 },
            { place: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', price: 280 },
            { place: 'Juhu Beach', price: 320 }
        ]
    },
    {
        city: 'dubai',
        code: 115936,
        places: [
            { place: 'Burj Khalifa', price: 500 },
            { place: 'Dubai Mall', price: 400 },
            { place: 'Palm Jumeirah', price: 300 },
            { place: 'Desert Safari', price: 350 },
            { place: 'Jumeirah Beach', price: 250 },
            { place: 'Miracle Garden', price: 280 },
            { place: 'Dubai Fountain', price: 320 }
        ]
    },
    {
        city: 'bali',
        code: 110670,
        places: [
            { place: 'Ubud Monkey Forest', price: 300 },
            { place: 'Tanah Lot Temple', price: 250 },
            { place: 'Mount Batur', price: 400 },
            { place: 'Tegallalang Rice Terraces', price: 350 },
            { place: 'Uluwatu Temple', price: 200 },
            { place: 'Bali Safari and Marine Park', price: 280 },
            { place: 'Sangeh Monkey Forest', price: 320 }
        ]
    },
    {
        city: 'singapore',
        code: 138703,
        places: [
            { place: 'Marina Bay Sands', price: 400 },
            { place: 'Gardens by the Bay', price: 350 },
            { place: 'Sentosa Island', price: 300 },
            { place: 'Singapore Zoo', price: 250 },
            { place: 'Universal Studios', price: 500 },
            { place: 'Singapore Flyer', price: 280 },
            { place: 'Merlion Park', price: 320 }
        ]
    },
    {
        city: 'thailand',
        code: 107167,
        places: [
            { place: 'Grand Palace', price: 350 },
            { place: 'Wat Arun', price: 250 },
            { place: 'Floating Market', price: 300 },
            { place: 'Railay Beach', price: 400 },
            { place: 'Phi Phi Islands', price: 500 },
            { place: 'Chatuchak Weekend Market', price: 280 },
            { place: 'Wat Pho', price: 320 }
        ]
    },
    {
        city: 'tokyo',
        code: 148251,
        places: [
            { place: 'Tokyo Tower', price: 400 },
            { place: 'Sensoji Temple', price: 350 },
            { place: 'Shibuya Crossing', price: 300 },
            { place: 'Meiji Shrine', price: 250 },
            { place: 'Disneyland', price: 500 },
            { place: 'Tsukiji Market', price: 280 },
            { place: 'Odaiba', price: 320 }
        ]
    },
    {
        city: 'rio de janeiro',
        code: 134921,
        places: [
            { place: 'Christ the Redeemer', price: 500 },
            { place: 'Sugarloaf Mountain', price: 400 },
            { place: 'Copacabana Beach', price: 300 },
            { place: 'Tijuca Forest', price: 350 },
            { place: 'Lapa Steps', price: 250 },
            { place: 'Botanical Garden', price: 280 },
            { place: 'Maracanã Stadium', price: 320 }
        ]
    },
    {
        city: 'auckland',
        code: 109654,
        places: [
            { place: 'Sky Tower', price: 350 },
            { place: 'Auckland Museum', price: 300 },
            { place: 'Waiheke Island', price: 250 },
            { place: 'Mount Eden', price: 400 },
            { place: 'Piha Beach', price: 500 },
            { place: 'Kelly Tarlton\'s Sea Life Aquarium', price: 280 },
            { place: 'One Tree Hill', price: 320 }
        ]
    },
    {
        city: 'paris',
        code: 131408,
        places: [
            { place: 'Eiffel Tower', price: 500 },
            { place: 'Louvre Museum', price: 400 },
            { place: 'Notre-Dame Cathedral', price: 300 },
            { place: 'Montmartre', price: 350 },
            { place: 'Seine River Cruise', price: 250 },
            { place: 'Palace of Versailles', price: 280 },
            { place: 'Musée d\'Orsay', price: 320 }
        ]
    },
    {
        city: 'melbourne',
        code: 127718,
        places: [
            { place: 'Great Ocean Road', price: 400 },
            { place: 'Federation Square', price: 350 },
            { place: 'Royal Botanic Gardens', price: 300 },
            { place: 'Queen Victoria Market', price: 250 },
            { place: 'Yarra River Cruise', price: 500 },
            { place: 'St. Kilda Beach', price: 280 },
            { place: 'Melbourne Zoo', price: 320 }
        ]
    },
    {
        city: 'london',
        code: 126632,
        places: [
            { place: 'Buckingham Palace', price: 500 },
            { place: 'Tower of London', price: 400 },
            { place: 'British Museum', price: 300 },
            { place: 'Westminster Abbey', price: 350 },
            { place: 'The Shard', price: 250 },
            { place: 'London Eye', price: 280 },
            { place: 'Hyde Park', price: 320 }
        ]
    },
    {
        city: 'new york',
        code: 130452,
        places: [
            { place: 'Statue of Liberty', price: 350 },
            { place: 'Central Park', price: 300 },
            { place: 'Empire State Building', price: 250 },
            { place: 'Times Square', price: 400 },
            { place: 'Metropolitan Museum of Art', price: 500 },
            { place: 'Brooklyn Bridge', price: 320 },
            { place: 'The High Line', price: 280 }
        ]
    }
];

export default itineraryPlaces;
