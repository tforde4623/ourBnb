# ourbnb - airbnb clone

### Links

[check it out!](https://our-bnb.herokuapp.com/)

[github repo](https://github.com/tforde4623/ourBnb)

[Frontend Route Docs](https://github.com/tforde4623/ourbnb/wiki/Frontend-Routes-(React-router))

[Api Docs](https://github.com/tforde4623/ourBnb/wiki/Api-Docs)

[Features](#)

[Components](#)

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
                                                                                    
 react          react-router-dom       react-redux        js-cookie    react-dom    
 react-favicon  react-scripts          redux              redux-thunk  redux-logger 
 bcryptjs       cookie-parser          cors               csurf        dotenv       
 express        express-async-handler  express-validator  faker        helmet       
 jsonwebtoken   morgan                 per-env            pg           sequelize    
 sequelize-cli  dotenv-cli             nodemon                                      

## Future Direction

## Personal Implementation Experience
