const { Owner } = require('../models');
// Create an array with the data we're going to seed
const ownerData = [
  {
    username: 'smithm',
    password: 'password1',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891328/classImages/default-owner.png',
    first_name: 'myles',
    last_name: 'smith',
    gender: 'Male',
    location_zip: 90001,
    dogs: "1",
    description: 'Looking for playdates for my youngest boy, he loves to go the trampoline park and is looking for friends to be active with'
  },
  {
    username: 'bobby',
    password: 'password123',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891328/classImages/default-owner.png',
    first_name: 'Bob',
    last_name: 'Grent',
    gender: 'Male',
    location_zip: 20141,
    dogs: "2",
    description: 'I love playing the guitar, but not as much as my sweet Biscuit, looking for playdates with creativity as the focus'
  },
  {
    username: 'florence',
    password: 'italy1968',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891328/classImages/default-owner.png',
    first_name: 'Florence',
    last_name: 'Swane',
    gender: 'Female',
    location_zip: 77001,
    dogs: "3",
    description: 'I love wine and tapas, but preferrably enjoy it with company and distracted doggos'
  }, 
  {
    username: 'Mewing0328',
    password: 'password',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891328/classImages/default-owner.png',
    first_name: 'MaSandra',
    last_name: 'Ewing',
    gender: 'Female',
    location_zip: 20854,
    dogs: "1",
    description: 'Testing profile'
  }
];

// Export the function
const seedOwner = () => Owner.bulkCreate(ownerData, {
  individualHooks: true
});

module.exports = seedOwner