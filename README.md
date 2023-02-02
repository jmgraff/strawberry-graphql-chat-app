# Strawberry GraphQL Real-Time Chat Application

Based on the template repo found here:
https://github.com/jmgraff/fastapi-strawberry-urql

An article explaining how the subscriptions work can be found here:
https://codehammer.io/graphql-example-real-time-chat-app-using-subscriptions/

This project illustratres how to use Subscriptions in GraphQL to create
real-time web apps that don't need to use polling.

## Requiremets

In order to run this, you'll need:
 - Linux
 - `make`
 - Docker with docker compose plugin
 - NodeJS and NPM

## Quick Start

After cloning this repository, run the following

```bash
make setup build dev
```

This will install the NPM packages and start the application in development mode. Any changes made to the source
file will be hot-reloaded.

The app will be running at http://localhost:3000

## Configuring

The Makefile exports an environment variable "HOSTNAME" that is currently set to "localhost". If you are going to be
visiting the app from a different machine, make sure to change this environment variable to the correct IP address or
hostname.

## Production vs Development

To build and launch the app in production mode, run:

```bash
make build prod
```

To build and launch the app in development mode with hot-reloading of souce files, run:

```bash
make build dev
```
