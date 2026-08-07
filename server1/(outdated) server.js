
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"]
};

 

// started the server now basically we want to allow cross-origin requests from our frontend which is running on port 5173
// connect those two together and allow them to talk to each other
app.use(cors(corsOptions));
 
app.use(express.json());

let profiles = [{'id': 'EwXdSEfLYp', 'name': 'John Doe', 'age': 30,    'email': 'examplemail@gmail.com', 'password': 'password123', 'cart': []}, 
    {'id': 'a27hkwk6fL', 'name': 'Jane Smith', 'age': 25, 'email': 'examplemail2@gmail.com', 'password': 'password456', 'cart': []},]

let inventory = [{'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'EwXdSEfLYp', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'a27hkwk6fL', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'jay8XPmzfa', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a timeless design.', 'price': 70, 'tags': ['Gold', 'Pearl'], 'name': 'Gold Pearl Earrings'},
    {'id': 'wODuWE97Uo', 'label': 'Bracelets', 'description': 'A stylish bracelet made with high-quality materials.', 'price': 80, 'tags': ['Silver', 'Sapphire'], 'name': 'Silver Sapphire Bracelets'},
    {'id': 'LBz7eaK5ul', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Platinum', 'Diamond'], 'name': 'Platinum Diamond Necklace'},
    {'id': 'YfmBtXjfVV', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a classic design.', 'price': 70, 'tags': ['Gold', 'Emerald'], 'name': 'Gold Emerald Earrings'},
    {'id': 'WkBr8omj2l', 'label': 'Bracelets', 'description': 'A trendy bracelet with a modern design.', 'price': 90, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Bracelets'},
    {'id': 'Vrtp6cdHlk', 'label': 'Bracelets', 'description': 'A stylish bracelet made with premium materials.', 'price': 80, 'tags': ['Gold', 'Sapphire'], 'name': 'Gold Sapphire Bracelets'},
    {'id': '3_qaYD7zFV', 'label': 'Necklace', 'description': 'An elegant necklace made with high-quality materials.', 'price': 150, 'tags': ['Platinum', 'Emerald'], 'name': 'Platinum Emerald Necklace'},
    {'id': 'eHtHzo5jlJ', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': '8QAeFb8kQb', 'label': 'Necklace', 'description': 'A beautiful necklace with intricate designs.', 'price': 120, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'EvxVcqyWj-', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'Htpxk6AbD0', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'I8QtwDEJOL', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'MMBdbyaxoh', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a timeless design.', 'price': 70, 'tags': ['Gold', 'Pearl'], 'name': 'Gold Pearl Earrings'},
    {'id': 'iKhxppkHLn', 'label': 'Bracelets', 'description': 'A stylish bracelet made with high-quality materials.', 'price': 80, 'tags': ['Silver', 'Sapphire'], 'name': 'Silver Sapphire Bracelets'},
    {'id': 'dYS8eLUN7v', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Platinum', 'Diamond'], 'name': 'Platinum Diamond Necklace'},
    {'id': 'rUTQOLjnDU', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a classic design.', 'price': 70, 'tags': ['Gold', 'Emerald'], 'name': 'Gold Emerald Earrings'},
    {'id': 'Zc5-MD5b54', 'label': 'Bracelets', 'description': 'A trendy bracelet with a modern design.', 'price': 90, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Bracelets'},
    {'id': 'vYf5TiDajt', 'label': 'Bracelets', 'description': 'A stylish bracelet made with premium materials.', 'price': 80, 'tags': ['Gold', 'Sapphire'], 'name': 'Gold Sapphire Bracelets'},
    {'id': 'myOioyBath', 'label': 'Necklace', 'description': 'An elegant necklace made with high-quality materials.', 'price': 150, 'tags': ['Platinum', 'Emerald'], 'name': 'Platinum Emerald Necklace'},
    {'id': 'VZE-3L0gP5', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'fAAvwuFfnq', 'label': 'Necklace', 'description': 'A beautiful necklace with intricate designs.', 'price': 120, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'GYYD37o-tz', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'}]

inventory.forEach(item => {
    if(!item.name){
        item.name = item.tags.map(tag => tag).join(" ") + " " + item.label;
    }
});
app.get("/profiles", (req, res) => {
    res.json({profiles: profiles});
});

app.get("/inventory", (req, res) =>{
    res.json({inventory});
});

app.get("/inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === req.params.id);
    if(itemID){
        res.json({item: itemID});
    } else {
        res.status(404).json({error: "Item not found"});
    }
});

app.post("/profiles", (req, res) => {
    const newProfile = req.body;
    
    // Check if email already exists
    const exists = profiles.some(profile => profile.email === newProfile.email);
    
    if(exists){
        return res.status(400).json({error: "Profile already exists with this email"});
    }
    
    // Add new profile
    profiles.push(newProfile);
    
    // ✅ Return the created user, not the entire profiles array
    res.status(201).json({
        message: "Profile created successfully", 
        user: newProfile
    });
});
app.put("/profiles/:id", (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    
    const userIndex = profiles.findIndex(profile => profile.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({error: "User not found"});
    }
    
    // Update the user with new data
    profiles[userIndex] = { ...profiles[userIndex], ...updatedData };
    
    res.json({
        message: "Profile updated successfully", 
        user: profiles[userIndex]
    });
});
app.post("/inventory", (req, res) => {
    const newItems = req.body; 
    
    // Filter out items that already exist by ID or name+tags
    const itemsToAdd = newItems.filter(newItem => {
        return !inventory.some(existingItem => 
            existingItem.id === newItem.id || 
            (existingItem.name === newItem.name && JSON.stringify(existingItem.tags.sort()) === JSON.stringify(newItem.tags.sort()))
        );
    });
    
    // Add only new items
    inventory.push(...itemsToAdd);
    
    res.json({
        message: `${itemsToAdd.length} items added successfully`,
        inventory: inventory,
        itemsAdded: itemsToAdd.length
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});