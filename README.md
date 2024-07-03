<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE). -->
# My List Service

This project implements the "My List" feature for an Stage OTT platform, allowing users to manage their personalized list of favorite movies and TV shows.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Directory Structure](#directory-structure)

## Features

- **Add to My List**: Add a movie or TV show to the user's list.
- **Remove from My List**: Remove a movie or TV show from the user's list.
- **List My Items**: Retrieve all items in the user's list with pagination support.

## Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Configuration Management**: [@nestjs/config](https://docs.nestjs.com/techniques/configuration)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Testing Framework**: [Jest](https://jestjs.io/)

## Installation

1. Clone the repository:

```bash
   $ git clone <repository_url>

   $ cd my-list-service
```

## Install dependencies
```bash
$ npm install
```

## Create a .env file in the root directory and add your MongoDB connection string:
```bash
$ MONGODB_URI=<your_mongodb_connection_string>
```

## Database Setup
- **Ensure MongoDB is running and accessible.**
- **Seed the database with initial data:**
```bash
$ npm run seed
```

## Running the Application
- **Start the application:**
```bash
$ npm run start:dev
```
- **The service will be available at http://localhost:3000.**

## API Endpoints
- **Add to My List:**
- **URL:** /my-list/add
- **Method:** POST
- **Request Body:** 
```bash
{
  "userId": "user1",
  "itemId": "movie1"
}
```
- **Response:** 
```bash
{
  "_id": "unique_id",
  "userId": "user1",
  "itemId": "movie1"
}
```

- **Remove to My List:**
- **URL:** /my-list/remove
- **Method:** DELETE
- **Request Body:** 
```bash
{
  "userId": "user1",
  "itemId": "movie1"
}
```
- **Response:** 
```bash
{
  "message": "Item removed from list"
}
```
- **List My Items**
- **URL:** /my-list/list
- **Method:** GET
- **Query Parameters:** 
- **userId:** User ID
- **page:** Page number (default: 1)
- **limit:** Number of items per page (default: 10)
- **Response:**
```bash
[
  {
    "_id": "unique_id",
    "userId": "user1",
    "itemId": "movie1"
  }
]
```
## Testing

- **Run the Tests**
```bash
$ npm run test
```

## Directory Structure 
```bash
my-list-service/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── my-list/
│   │   ├── my-list.controller.ts
│   │   ├── my-list.module.ts
│   │   ├── my-list.service.ts
│   ├── schemas/
│   │   ├── mylist.schema.ts
│   │   ├── movie.schema.ts
│   │   ├── tvshow.schema.ts
│   │   ├── user.schema.ts
│   ├── scripts/
│   │   └── seed.ts
├── test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

