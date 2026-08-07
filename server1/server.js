const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"]
};   

let collections = [{"id":"hyfysdfhsdf","name":"My Collection 1","description":"Description of My Collection 1","items":["item1","item2","item3"],"username":"John Doe"},{"name":"spagettie cards","id":"Jjkzf-qm9X","user_id":"Gj_4yxb48y","items":[],"description":"This is a new collection.","image":"http://localhost:8080/bracelet1.png","rating":0}];


let profiles = [{"id":"EwXdSEfLYp","username":"John Doe","email":"examplemail@gmail.com","password":"password123","cart":[],"recentlyViewed":[],"collections":["hyfysdfhsdf"],"wishlist":[],"favorites":[]},
{"id":"a27hkwk6fL","username":"Jane Smith","email":"examplemail2@gmail.com","password":"password456","cart":[],"recentlyViewed":[],"collections":[],"wishlist":[],"favorites":[]},
{"id":"Gj_4yxb48y","username":"MantisTheUltimate","email":"tobbanganmantis@gmail.com","password":"Mantis@123","cart":[],"recentlyViewed":[],"collections":[],"wishlist":[],"favorites":[]}];

let inventory = [{id: 'KUjvgOzFfb', label: 'ring', description: 'A classic yellow gold ring featuring a brilliant-cut diamond centerpiece.', price: 249, tags: ['Gold', 'Diamond'], name: 'Classic Diamond Ring', image: 'http://localhost:8080/bracelet1.png', quantity: 8, reviews: [], averageRating: 4.6, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'z-1o1kJwAJ', label: 'ring', description: 'An elegant white gold ring accented with sapphire stones.', price: 319, tags: ['White Gold', 'Sapphire'], name: 'Sapphire Elegance Ring', image: 'http://localhost:8080/bracelet2.png', quantity: 5, reviews: [], averageRating: 4.8, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'Yl5xcAproa', label: 'ring', description: 'A luxurious rose gold band featuring a ruby centerpiece.', price: 389, tags: ['Rose Gold', 'Ruby'], name: 'Ruby Blossom Ring', image: 'http://localhost:8080/bracelet3.png', quantity: 3, reviews: [], averageRating: 4.7, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'y8i6PBJkF8', label: 'ring', description: 'A platinum engagement ring with a stunning diamond setting.', price: 699, tags: ['Platinum', 'Diamond'], name: 'Platinum Promise Ring', image: 'http://localhost:8080/bracelet4.png', quantity: 2, reviews: [], averageRating: 4.9, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 't2-pHiosWS', label: 'ring', description: 'A vintage-inspired gold ring with emerald accents.', price: 279, tags: ['Gold', 'Emerald'], name: 'Emerald Vintage Ring', image: 'http://localhost:8080/bracelet5.png', quantity: 4, reviews: [], averageRating: 4.5, times_interacted: 0, ratings: [], front_page: 'false'},
{id: '4GBS3V5m_m', label: 'bracelet', description: 'A delicate silver bracelet with sapphire detailing.', price: 129, tags: ['Silver', 'Sapphire'], name: 'Silver Sapphire Bracelet', image: 'http://localhost:8080/lux_necklace_1.png', quantity: 10, reviews: [], averageRating: 4.7, times_interacted: 0, ratings: [], front_page: 'false'},
{id: '_vO50O7Vmc', label: 'bracelet', description: 'A polished gold bracelet with a timeless chain design.', price: 189, tags: ['Gold'], name: 'Classic Gold Bracelet', image: 'http://localhost:8080/lux_necklace_2.png', quantity: 7, reviews: [], averageRating: 4.6, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'ScTWQPNkqw', label: 'bracelet', description: 'A luxury bracelet adorned with brilliant diamonds.', price: 499, tags: ['Gold', 'Diamond'], name: 'Diamond Luxe Bracelet', image: 'http://localhost:8080/lux_necklace_3.png', quantity: 3, reviews: [], averageRating: 4.8, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'luyPBLg5Kr', label: 'bracelet', description: 'A modern silver bracelet featuring ruby accents.', price: 159, tags: ['Silver', 'Ruby'], name: 'Ruby Accent Bracelet', image: 'http://localhost:8080/lux_necklace_4.png', quantity: 6, reviews: [], averageRating: 4.9,  times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'MAwJNR3dXM', label: 'bracelet', description: 'A handcrafted platinum bracelet with emerald details.', price: 359, tags: ['Platinum', 'Emerald'], name: 'Emerald Platinum Bracelet', image: 'http://localhost:8080/lux_necklace_5.png', quantity: 4, reviews: [], averageRating: 4.7, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'DR3xsEkdge', label: 'necklace', description: 'A luxury diamond pendant suspended from a polished platinum chain.', price: 899, tags: ['Platinum', 'Diamond'], name: 'Royal Diamond Pendant', image: 'http://localhost:8080/necklace1.png', quantity: 2, reviews: [], averageRating: 4.2, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'NDVnS6sAmn', label: 'necklace', description: 'A sapphire centerpiece necklace crafted with white gold accents.', price: 749, tags: ['White Gold', 'Sapphire'], name: 'Sapphire Crown Necklace', image: 'http://localhost:8080/necklace2.png', quantity: 3, reviews: [], averageRating: 4.5, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'K6gUCHlE_-', label: 'necklace', description: 'An elegant platinum halo necklace featuring a brilliant gemstone setting.', price: 1199, tags: ['Platinum', 'Diamond'], name: 'Platinum Halo Necklace', image: 'http://localhost:8080/necklace3.png', quantity: 1, reviews: [], averageRating: 4.2, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'UQqz3txFJo', label: 'necklace', description: 'A luxurious emerald pendant designed for special occasions.', price: 949, tags: ['Gold', 'Emerald'], name: 'Emerald Prestige Pendant', image: 'http://localhost:8080/necklace5.png', quantity: 2, reviews: [], averageRating: 4.7, times_interacted: 0, ratings: [], front_page: 'false'},
{id: '2ukbj31_eQ', label: 'necklace', description: 'A cascading arrangement of diamonds set in a refined platinum frame.', price: 1499, tags: ['Platinum', 'Diamond'], name: 'Diamond Waterfall Necklace', image: 'http://localhost:8080/ring1.png', quantity: 1, reviews: [], averageRating: 4.9, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'YrghmBXt5M', label: 'necklace', description: 'A delicate silver necklace featuring cultured pearl accents.', price: 129, tags: ['Silver', 'Pearl'], name: 'Silver Pearl Necklace', image: 'http://localhost:8080/ring2.png', quantity: 8, reviews: [], averageRating: 4.3, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'oV0we7roCb', label: 'necklace', description: 'A gold chain necklace showcasing a vibrant ruby pendant.', price: 219, tags: ['Gold', 'Ruby'], name: 'Ruby Pendant Necklace', image: 'http://localhost:8080/ring3.png', quantity: 6, reviews: [], averageRating: 4.8, times_interacted: 0, ratings: [], front_page: 'false'},
{id: '2qZUtCTW2H', label: 'necklace', description: 'A charming emerald necklace designed for everyday elegance.', price: 189, tags: ['Silver', 'Emerald'], name: 'Emerald Charm Necklace', image: 'http://localhost:8080/ring4.png', quantity: 7, reviews: [], averageRating: 4.1, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'evES5ZvCJ0', label: 'necklace', description: 'A sophisticated sapphire drop pendant with a polished finish.', price: 259, tags: ['White Gold', 'Sapphire'], name: 'Sapphire Drop Necklace', image: 'http://localhost:8080/ring5.png', quantity: 5, reviews: [], averageRating: 4.6, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'IJmiMj8CUT', label: 'watch', description: 'A refined silver watch built for everyday professional wear.', price: 299, tags: ['Silver'], name: 'Executive Silver Watch', image: 'http://localhost:8080/watch1.png', quantity: 8, reviews: [], averageRating: 4.3, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'R48bEmN0ts', label: 'watch', description: 'A gold chronograph watch combining precision and luxury.', price: 549, tags: ['Gold'], name: 'Gold Chronograph Watch', image: 'http://localhost:8080/watch2.png', quantity: 4, reviews: [], averageRating: 4.2, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'LDJNyFqaad', label: 'watch', description: 'A sleek black watch featuring a minimalist modern design.', price: 349, tags: ['Black Steel'], name: 'Midnight Edition Watch', image: 'http://localhost:8080/watch3.png', quantity: 6, reviews: [], averageRating: 3.9, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'I0wKf2yW9e', label: 'watch', description: 'A sapphire-accented luxury watch with premium craftsmanship.', price: 799, tags: ['Sapphire', 'Silver'], name: 'Sapphire Edition Watch', image: 'http://localhost:8080/watch4.png', quantity: 3, reviews: [], averageRating: 4.9, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'MuOoGNLapI', label: 'watch', description: 'A heritage-inspired gold watch with timeless styling.', price: 649, tags: ['Gold'], name: 'Heritage Gold Watch', image: 'http://localhost:8080/watch5.png', quantity: 5, reviews: [], averageRating: 4.4, times_interacted: 0, ratings: [], front_page: 'false'},
{id: 'v-KDKTa_N-', label: 'watch', description: 'A platinum luxury watch engineered for precision and prestige.', price: 1299, tags: ['Platinum'], name: 'Platinum Prestige Watch', image: 'http://localhost:8080/watch6.png', quantity: 2, reviews: [], averageRating: 4.8, times_interacted: 0, ratings: [], front_page: 'true'},
{id: 'R13kGAjKXV', label: 'watch', description: 'A flagship diamond-accented watch designed for collectors.', price: 1999, tags: ['Diamond', 'Platinum'], name: 'Diamond Elite Watch', image: 'http://localhost:8080/watch7.png', quantity: 1, reviews: [], averageRating: 4.7, times_interacted: 0, ratings: [], front_page: 'true'}]


app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "script-src 'self'; " +
        "img-src 'self' http: https:; " +
        "font-src 'self'; " +
        "connect-src 'self' http://localhost:* https:;"
    );
    next();
});
app.use(express.json());


app.get("/collections", (req, res) => {
    res.json({collections: collections});
})
app.use(express.static("photos"));
app.post("/collections", (req, res) => {
    const newCollection = req.body;
    collections.push(newCollection);
    res.status(201).json({
        message: "Collection created successfully",
        collection: newCollection
    });
})

app.get("/collections/:id", (req, res) => {
    const collectionID = collections.find(collection => collection.id === req.params.id);
    if(!collectionID){
        return res.status(404).json({error: "Collection not found"});
    }
    res.json({collection: collectionID});
})

app.patch("/collections/:id", (req, res) => {
    // this will be used for updating the collection's title, description, and items. not for creating new collections,
    //  which will be done through POST.
    const collectionIndex = collections.findIndex(collection => collection.id === req.params.id);
    if(collectionIndex !== -1){
        collections[collectionIndex] = {...collections[collectionIndex], ...req.body};
        console.log("{server side} updated collection", collections[collectionIndex]);
        return res.json({
            message: "Collection updated successfully",
            collection: collections[collectionIndex]
        });
    }
    return res.status(404).json({error: "Collection not found"});
})

app.get("/profiles", (req, res) => {
    res.json({profiles: profiles});
});
app.post("/profiles", (req, res) => {
    const newAccount = req.body;

    const accountexist = profiles.some(account => account.email === newAccount.email || account.id === newAccount.id);

    if(!accountexist){
        profiles.push(newAccount);
    
        res.status(201).json({
            message: "Account created successfully",
            user: newAccount, 
            profiles: profiles
        });
    }
    return res.status(400).json({error: "Account already exists with this email"});
});

app.get("/profiles/:id", (req, res) => {
    const userIndex = profiles.findIndex(profile => profile.id === req.params.id);
    if(userIndex !== -1){
        res.json({user: profiles[userIndex]});
    }
    return res.status(404).json({error: "User not found"});
})

app.patch("/profiles/:id", (req, res) => {
    // this will be used for updating the user's name, email, password, and cart.
    const userIndex = profiles.findIndex(account => account.id === req.params.id);
    if(userIndex !== -1){
        profiles[userIndex] = {...profiles[userIndex], ...req.body};
        return res.json({ 
            message: "Account updated successfully",
            user: profiles[userIndex]
        });
    } 
    return res.status(404).json({error: "User not found"});
}) 

app.get("/inventory", (req, res) => {
    res.json({inventory: inventory});
});
app.get("/inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === req.params.id);
    if(!itemID){
        return res.status(404).json({error: "Item not found"});
    }
    res.json({item: itemID});
})
app.post("/inventory", (req, res) => {
    // for adding new items to the inventory, not for updating existing items.
    const itemsToAdd = req.body.filter(item => {
        return !inventory.some(existingItem => existingItem.id === item.id);
    });
    inventory.push(...itemsToAdd);
    res.status(201).json({
        message: "Items added successfully",
        items: itemsToAdd
    });
})
app.patch("/inventory/:id", (req, res) => {
    // for updating certain aspects of the item. like quantity, 
    // front-page status, reviews, ratings etc. but not the entire item object, 
    // which is what PUT would imply. 
    // This allows for more efficient updates without needing to send the entire 
    // item data when only a few fields need to be changed.
    const itemIndex = inventory.findIndex(item => item.id === req.params.id);
    if(itemIndex !== -1){
        inventory[itemIndex] = {...inventory[itemIndex], ...req.body};
        res.json({
            message: "Item updated successfully",
            item: inventory[itemIndex]
        });
    }
    return res.status(404).json({error: "Item not found"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});