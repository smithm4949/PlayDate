const { Event } = require('../models');
// Create an array with the data we're going to seed
const eventData = [
  {
    name: 'Fun time at the park!',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891322/classImages/default-event.png',
    location_zip: 90001,
    location_name: 'Sligo Creek!',
    description: 'Me and the dogs are gonna be at the park playing with balls and discs from 2 to 4. Come join us! Imma bring snack for people and doggos!',
    time: '2pm to 4pm',
    date: '2023-05-04 14:00:00',
    host_id: '1'
  },
  {
    name: 'Dog party fun outside',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891322/classImages/default-event.png',
    location_zip: 90001,
    location_name: 'Turkey Thicket Park',
    description: 'Gonna be a sweet time, come hangout with us to start your day!',
    time: '6:30 - 8 am',
    date: '2023-05-07 06:30:00',
    host_id: '4'
  },
  {
    name: 'Puppertravaganza!',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891322/classImages/default-event.png',
    location_zip: 90001,
    location_name: 'Glover Park',
    description: 'Biggest dog party this side of the lake! Bring your friends, bring your toys, bring your booze, lets celebrate the weather!',
    time: '4:00pm to 6:30pm',
    date: '2023-05-14 16:00:00',
    host_id: '4'
  },
  {
    name: 'Get Crunk!',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891322/classImages/default-event.png',
    location_zip: 20888,
    location_name: 'Potomac Park',
    description: 'Fun fun fun!',
    time: '4:00pm',
    date: '2023-05-12 16:00:00',
    host_id: '3'
  },
  {
    name: 'Run around!',
    pic_hyperlink: 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1677891322/classImages/default-event.png',
    location_zip: 90001,
    location_name: 'Hoover Park',
    description: 'Let us have some fun with the pups!',
    time: '6:30pm',
    date: '2023-06-14 16:00:00',
    host_id: '2'
  }
];

const eventAttendees = [
  {
    event_id: '1',
    attendee_id: '2'
  },
  {
    event_id: '1',
    attendee_id: '3'
  }
];

// Export the function
const seedEvent = () => Event.bulkCreate(eventData);

module.exports = seedEvent