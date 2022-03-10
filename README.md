# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Demo users

By default **10 admin** users, and **10 regular** users will be created.

To login to the system as an admin user your credentials will be:

```
`email: admin#@test.com			password: admin#`
```

To login to the system as a regular user your credentials will be:

```
email: user#@test.com			password: user#
```

**In both cases the # symbol has to be replaced by a number from 1 to 10.**

In case you need to test with a bigger amount of users you can change the constants that are in create-demo-user.js (seeders folder).

```
const NUMBER_OF_ADMIN_USERS = 10
const NUMBER_OF_REGULAR_USERS = 10
```



