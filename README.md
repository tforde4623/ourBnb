# ourbnb - airbnb clone

### Links

[check it out!](https://our-bnb.herokuapp.com/)

[github repo](https://github.com/tforde4623/ourBnb)

[Frontend Route Docs](https://github.com/tforde4623/ourbnb/wiki/Frontend-Routes-(React-router))

[Api Docs](https://github.com/tforde4623/ourBnb/wiki/Api-Docs)

[Features](https://github.com/tforde4623/ourBnb/wiki/Working-Features)

[Components](https://github.com/tforde4623/ourBnb/wiki/React-Components-List)

[Database Schema](https://github.com/tforde4623/ourBnb/wiki/Database-Schema)

[Redux Structure Docs](#)

## What is it?
Ourbnb is a clone of airbnb to book places to stay on trips, or even find trips to go on based on open places to stay that are the experience themselfs. 
The twist that makes this different than airbnb is you have the option to share the booking with people.

## Screenshots

## How to play around with it locally
1. Clone the repository
2. Navigate to repository in a command line
3. Run the cmd "npm run install" in the root directory
4. Setup database
    - setup a .env file in the backend based off of the .env.example file given
    - setup a psql user with create db privledges with the same name and password as your .env file
    - run "npm dotenv sequelize db:create"
    - run "npm dotenv sequelize db:migrate"
    - run "npm dotenv sequelize db:seed:all"
        - the seed will setup a demo user (and three others) the demo user will have the following credentials:
            - username: Demo-lition
            - password: password
5. Start the server and the react front end seperately
    - "npm run dev:frontend"
    - "npm run dev:backend"

## Technologies Used
|               |                       |    Technologies   |             |              |
|---------------|-----------------------|-------------------|-------------|--------------|
| react         | react-router-dom      | react-redux       | js-cookie   | react-dom    |
| react-favicon | react-scripts         | redux             | redux-thunk | redux-logger |
| bcryptjs      | cookie-parser         | cors              | csurf       | dotenv       |
| express       | express-async-handler | express-validator | faker       | helmet       |
| jsonwebtoken  | morgan                | per-env           | pg          | sequelize    |
| sequelize-cli | dotenv-cli            | nodemon           |             |              | 
## Future Direction
In the future there is a LOT I would like to do.

Here are some of those things:
    - Allow messaging between the owner of the location and the possible customers as well as the possible customers with each other. Implementing web sockets.
    - Allow bookings of locations to take place.
    - Add ability to check availability and price and calculate it based on how many nights to book on the spot.
    - Use some photo hosting service (probably an aws box) to store live photos uploaded instead of urls.

## Personal Implementation Experience

Challenges:
    - CSS - I have not done the entire style alone for a website of this size without a framework. It was an eye opener that I need to practice my styling skills.
    - Time - The original project had a time limit of one week, managing my time and delegating tasks to myself based on importance was a really cool experience.

Wins: 
    - I learned SO MUCH about full stack development and making the front and back end work together. As well as just all the technologies and topics in general.
    - Seeing the project start to come together was really cool for me. I really was proud of myself for how much I learned in the time I had, and I am really excited to continue to work on this project to continue learning.
