const { Dog } = require('../models');

const dogData = [
    {
        pic_hyperlink: "https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891319/classImages/default-dog.png",
        name: "Sparks",
        age: "8", //months old
        breed: "Chihuahua",
        gender: "Female",
        owner_id: 1,
    },
    {
        pic_hyperlink: "https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891319/classImages/default-dog.png",
        name: "Biscuit",
        age: "48", //months old (4 years old)
        breed: "Boxer",
        gender: "Male",
        owner_id: 2,
    },
    {
        pic_hyperlink: "https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891319/classImages/default-dog.png",
        name: "Chief",
        age: "12",//months old (1 year old)
        breed: "Heeler",
        gender: "Male",
        owner_id: 3,
    },
    {
        pic_hyperlink: "https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891319/classImages/default-dog.png",
        name: "Chief",
        age: "36", //months old (3 years old)
        breed: "Boxer",
        gender: "Male",
        owner_id: 4,
    },
];

// Export the function
const seedDog = () => Dog.bulkCreate(dogData);

module.exports = seedDog;