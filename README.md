# Connection to the database and models of the PiсsArt chair booking system



### Installation

Using npm:

```sh
$ npm i booking-db
```

In Node.js:

```sh
const { 
    dbConnection, 
    User, 
    Team,  
    Chair, 
    Position,
    Reservation
} = require('booking-db');

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
