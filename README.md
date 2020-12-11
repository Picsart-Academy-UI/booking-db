# Connection to the database and models of the PiсsArt chair booking system



### Installation

Using npm:

```sh
$ npm i picsart-booking-db-models
```

In Node.js:

```sh
const { 
    dbConnection, 
    User, 
    Team,  
    Chair, 
    Reservation 
} = require('picsart-booking-db-models');

dbConnection(MONGO_URI);

// example create User
const user = new User({
    first_name: 'John',
    last_name: 'Adams',
    email: 'yourmail@gmail.com',
    team_id: 2,
    is_admin: false,
    invitation_token: 'dgyhdsncujndisd',
    password: 'shgdfdkfdjk'
});
