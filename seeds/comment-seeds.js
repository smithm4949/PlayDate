const { Comment } = require('../models');

const data = [
  {
    text: "If you need any help with setup or details, shoot me a text, I'm free all day!",
    owner_id: 2,
    event_id: 1
  },
  {
    text: "Can't wait, thanks for doing this!",
    owner_id: 3,
    event_id: 1
  },
  {
    text: "Can't wait, thanks for doing this!",
    owner_id: 2,
    event_id: 1
  },
  {
    text: 'Sounds totally rad!',
    owner_id: 3,
    event_id: 1
  },
  {
    text: "Can't wait, thanks for doing this!",
    owner_id: 2,
    event_id: 2
  },
  {
    text: 'Sounds totally rad!',
    owner_id: 3,
    event_id: 2
  },
  {
    text: "If you need any help with setup or details, shoot me a text, I'm free all day!",
    owner_id: 2,
    event_id: 2
  },
  {
    text: 'Seriously, thanks for organizing this.',
    owner_id: 1,
    event_id: 2
  },
  {
    text: "If you need any help with setup or details, shoot me a text, I'm free all day!",
    owner_id: 2,
    event_id: 3
  },
  {
    text: 'Sounds totally rad!',
    owner_id: 1,
    event_id: 3
  },
  {
    text: 'Me and the pups will be there with snacks!',
    owner_id: 3,
    event_id: 3
  },
  {
    text: 'Me and the pups will be there with snacks!',
    owner_id: 3,
    event_id: 3
  }
];

const comments = ["Can't wait, thanks for doing this!",
  "Me and the pups will be there with snacks!",
  "Sounds totally rad!",
  "Seriously, thanks for organizing this.",
  "If you need any help with setup or details, shoot me a text, I'm free all day!"];

function generateSeeds() {
  let numSeededUsers = 3;
  let numSeededEvents = 3;
  let numFillerComments = comments.length;
  let numComments = Math.floor(Math.random() * 5 + 2); //Random num comments between 2 and 6
  for (let i = 1; i <= numSeededEvents; i++) {
    for (let j = 0; j < numComments; j++) {
      let seedObj = {
        text: comments[Math.floor((Math.random() * numFillerComments))],
        owner_id: Math.floor(Math.random() * numSeededUsers + 1),
        event_id: i
      }
      data.push(seedObj);
    }
  }
};

// Export the function
// const seedComment = () => {
//   generateSeeds();
//   console.log("DATA FOR SEEDING", data);
//   Comment.bulkCreate(data);
// };

const seedComment = () => Comment.bulkCreate(data);

module.exports = seedComment