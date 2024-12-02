# DarkThrone Reborn

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

This project is a re-creation to the classic MMO DarkThrone. This is a side-project, there is no intention to make any profit from it, nor should there be any expectations of it being a complete game.

## Before you start

You need to have the following installed on your machine:

| Requirement | Version    |
| ----------- | ---------- |
| Node        | >= 20.11.0 |
| NPM         | >= 10.2.0  |
| PostgreSQL  | >= 14.0.0  |

<details>
  <summary>A note on development environment</summary>

  Primary development is done with an Apple computer running an arm64 architecture. Any issues with other architectures should be reported as a bug.
</details>

## Getting Started

1. Clone the repository

2. Run `npm install` to install the dependencies

3. Setup your environment file

   Copy the `.env` file to `.env.local`:
   
   ```bash
   cd apps/api && cp .env .env.local && cd -
   ```
   
   Optionally replace the defaults to match your local environment
   

4. Connect to an already running PostgreSQL database or use `cd apps/api/ && docker-compose up -d && cd -` to create a PostgreSQL in a Docker container

   You can turn it off using `docker-compose down`.

5. Run the database migrations

   ```bash
   npx nx knex api migrate:latest
   ```

6. Start the application

   ```bash
   npx nx run-many -t serve -p api,web-app
   ```

   This will start the:
   * API on port 3000
   * Web App on port 4200
   * Placeholder Site on port 4201.

## Basic Architecture

### API

This is the main backend for the application. It handles business logic and data storage. This app also handles the processing for time based events such as daily citizens and player turns.

### Web App

This is the main frontend for the game and the interface that players use. It communicates with the API via a client library, making extensibility amd maintenance easier.

### Placeholder Site

This is a temporary website that welcomes users into the game. It will be replaced with a proper marketing site in the future.
