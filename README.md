# NestJS Microservices Project

## Overview

This project is a microservices-based application built using NestJS. Each microservice is designed to be independent, scalable, and maintainable, following the best practices for microservice architecture. This project is following the nest js monorepo architecture.

### Architecture

The project is structured using the microservices architecture pattern, where each service is designed to perform a specific business function. The services communicate with each other via TCP connections, allowing for loose coupling and independent deployment.

### Microservices

The project includes the following microservices:

- deliver-jokes-service
- moderate-jokes-service
- submit-jokes-service

### Installation

#### Prerequisites

- Node.js (v16.x or higher)
- npm or Yarn
- Docker (optional)

#### Steps

##### Clone the repository:

```bash
git clone https://github.com/pasannissanka/joke-services-nestjs.git
cd joke-services-nestjs
```

##### Install dependencies:

```bash
npm install
# or
yarn install
```

##### Configure environment variables for each microservice:

Copy the .env.example file is available in root of the project, that shared between services, rename it to .env. Update the environment variables as needed.

#### DB setup

MySQL database is used for deliver-jokes-service. MongoDB is used for submit-jokes-service.
MySQL database schema and seed data can be applied using the following command:

```bash
# root directory
# Schema generation - update env variables accordingly
npx mikro-orm schema:create --config ./apps/deliver-jokes-service/src/db/mikro-orm.config.ts -r

# Seed data
npx mikro-orm seeder:run --config ./apps/deliver-jokes-service/src/db/mikro-orm.config.ts

```


### Running the Project

#### Running Microservices Locally

Start each microservice:

```bash
npm run start:dev:all

# or for specific microservices, navigate to the service directory and run:
npm run start <service-name> # e.g., npm run start deliver-jokes-service
```

Alternatively, use Docker Compose to start all services:
Docker compose contains MySQL database with seed data, and MongoDB for the moderate-jokes-service.

```bash
docker-compose build && docker-compose up
```

### Running in Production

#### Build the microservices:

```bash
npm run build:all
```

### Configuration

Each microservice has its own .env file where you can set environment-specific configurations like database connections, API keys, etc.

#### Example Configuration

```env
# Database
MYSQL_DB_NAME=JOKES_DB
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=app_user
MYSQL_DB_PASSWORD=password
MONGO_DB_NAME=JOKES_SUBMIT_DB
MONGO_DB_URL=mongodb://localhost:27017

# Security
JWT_SECRET=secret
JWT_EXPIRE_IN=3h

DEFAULT_LOGIN_USERNAME=admin@admin.com
DEFAULT_LOGIN_PASSWORD=password

# Ports
DELIVER_SVC_HOST=127.0.0.1
DELIVER_SVC_PORT=8001
DELIVER_SVC_TCP_PORT=8221

MODERATE_SVC_HOST=127.0.0.1
MODERATE_SVC_PORT=8002
MODERATE_SVC_TCP_PORT=8222

SUBMIT_SVC_HOST=127.0.0.1
SUBMIT_SVC_PORT=8003
SUBMIT_SVC_TCP_PORT=8223

```

#### Communication between Microservices

Microservices communicate using TCP. The communication pattern can be either request-response or event-driven, depending on the use case.

Example
For a request-response communication pattern using TCP:

```typescript
// In the sender service
const result = await firstValueFrom(
  this.submitServiceClient.send<ResponseDto<SubmittedJokeDto>>(
    MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED,
    { id },
  ),
);

// In the receiver controller
@MessagePattern(MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED)
async markAsAccepted(payload: { id: string }) {
  this.logger.log(
    `[${MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED}] payload: [${JSON.stringify(payload)}]`,
  );

  const data = await this.submitService.markAsAccepted(payload.id);

  return ResponseDto.success(data);
}

```

### Contributing

Contributions are welcome! Please follow the contribution guidelines to submit issues, feature requests, or pull requests.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
