# PlayDate
[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Description
PlayDate is a social application where users, dog owners, can connect with other dog owners to coordinate play dates.  Users can post dog profiles, create events at parks, leave comments for other users, and leave comments for other user's events.

## Table of Contents
[1. Installation](#installation)

[2. Link](#link)

[3. Usage](#usage)

[4. Contributing](#contributing)

[5. Questions](#questions)

[6. License](#license)

[7. Screenshots](#screenshots)

[8. Credits](#credits)

## Installation 
The application has dependencies (see package.json file). Before using the application, install npm modules.

```bash
npm install
```

Next seed the data into the MySQL database.
```bash
npm run seed
```
## Link
PlayDate application is deployed live [here](https://git.heroku.com/boiling-temple-57076.git)

## Usage 
The application will be invoked by using the following command:

```bash
node server.js OR npm start
```

```
PlayDate:
 - uses Node.js and Express.js to create a RESTful API
 - uses Handlebars.js as the template engine
 - uses MySQL and the Sequelize ORM for the database
 - uses {{PLACEHOLDER FOR THE NEW LIBRARY, PACKAGE, OR TECHNOLOGY}}
 - uses FULL CRUD to GET, POST, PUT, and DELETE routes for retrieving and adding new data
 - has a folder structure that meets the MVC paradigm
 - includes authentication (express-session and cookies)
 - protects API keys and sensitive information with environment variables
 - is deployed using Heroku (with data)
 - has a polished UI
 - is responsive and interactive (i.e., accept and respond to user input)
 - meets good-quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.)
```

## Contributing 
Contributions are welcomed for future versions with features such as:
- {{Add future enhancement ideas here and below}}

For all contributions, please refer to [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) for contributing guidelines.


## Questions
Check our our GitHub accounts for our other work.
If you have additional questions, please find us on LinkedIn!

Andre {LAST NAME?} | [GitHub](https://github.com/VenBak) | [LinkedIn/Email?](PLACEHOLDER)

Claire Lee | [GitHub](https://github.com/leeclaire156) | [LinkedIn/Email?](PLACEHOLDER)

MaSandra Ewing | [GitHub](https://github.com/mewing0328) | [LinkedIn](https://www.linkedin.com/in/masandra-ewing/)

Myles Smith | [GitHub](https://github.com/smithm4949) | [LinkedIn/Email?](PLACEHOLDER)

## License 
eSale application is covered by MIT license. 

 To view the most current and full license description in opensource.org, click on the license name below.  

 [![MIT}](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

 ## Screenshots 

1. Creating database in MySQL workbench

    <img src="./assets/placeholder" style="width:30rem">

2. Seeding data into database and starting application

    <img src="./assets/placeholder" style="width:30rem">

3. CREATE (POST) a new Dog

    <img src="./assets/placeholder" style="width:30rem">

4. READ (GET) all Events

    <img src="./assets/placeholder" style="width:30rem">

5. UPDATE (PUT) an Event

    <img src="./assets/placeholder" style="width:30rem">

6. DELETE a Dog

    <img src="./assets/placeholder" style="width:30rem">

## Credits
Credit for tutorials and guides I utilized in my code

[YouTube: How to Make a Website with Login and Register](https://www.youtube.com/watch?v=p1GmFCGuVjw&t=534s): Utilized for tutorial for styling.

[YouTube: Bootstrap 5 Navbar With Logo](https://www.youtube.com/watch?v=hK6dMdxt3hQ)

[Reset Tutorial](https://flaviocopes.com/how-to-reset-form/): Reset form function

[Default Select an Option for Dropdown Menu](https://www.geeksforgeeks.org/how-to-set-the-default-value-for-an-html-select-element/): Used for gender dog 

[Restrict value for date input](https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today): Stackoverflow troubleshooting tip

[date input bug fix reference](https://stackoverflow.com/questions/20321202/not-showing-placeholder-for-input-type-date-field#:~:text=Just%20add%20onfocus%3D%22)

[Horizontal Scrolling](https://blog.hubspot.com/website/horizontal-scrolling): Used for large number of cards to scroll horizontally

[Numbers only Regex](https://uibakery.io/regex-library/numbers-only)

[Scroll to View](https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location)

[Circulate Images](https://www.webfx.com/blog/web-design/circular-images-css/)

[Delete icon provided by Freepik from Flaticon](https://www.flaticon.com/free-icon/bin_484662)

[Event icon provided by iconixar from Flaticon](https://www.flaticon.com/free-icon/event_2413035)

[Unlocked padlock icon provided by Dave Gandy from Flaticon](https://www.flaticon.com/free-icon/padlock-unlock_25215)

[Two paws icon provided by icongeek26 from Flaticon](https://www.flaticon.com/free-icon/paws_4787175)

[Owner playing with dog and ball icon provided by Freepik from Flaticon](https://www.flaticon.com/free-icon/playing_6381352)

[Man Throwing A Disc And Dog Jumping To Catch It icon by Freepik from Flaticon](https://www.flaticon.com/free-icon/man-throwing-a-disc-and-dog-jumping-to-catch-it_53082)

[Profile icon provided by inkubators from Flaticon](https://www.flaticon.com/free-icon/profile_3106921)

[Secured Lock icon provided by Freepik from Flaticon](https://www.flaticon.com/free-icon/secured-lock_17354)

[navbar span icon provided by Alkhalifi Design Flaticon](https://www.flaticon.com/free-icon/menu_8212733)

[Rounding numbers](https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/)

[Handlebar built-in helpers: includesZero](https://handlebarsjs.com/guide/builtin-helpers.html#if)