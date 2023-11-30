# Getting Started with ITplus24

## Available Scripts

In the project directory, you can run:

### `docker-compose up --build`

this will build the necessery images and run backend, frontend, mongo and redis containers

## Web Application

after the containers is running
visit http://localhost:3000

## Environemnt variables

to make it easy , I included the environemnt variables directly in the docker compose file
which is a bad choice

## Mails

since nodemailer has some issues when running inside a docker container, I had to stop the send mails service
while running inside docker container

this can be done by the environemnt variable for backend service called ENVIRONEMT='docker'

thus it is still possible to send emails by assigning different value to the ENVIRONEMNT while running the backend service outside docker world

## Technlogies

Node.js - typescipt for backend service

Reactjs for frontend service

mongoDB as a database - storing the geolocation details object returned by the 3rd party for a specific address with indexing on the address property to impove the performance of read query

redis for caching purposes "cache the mapping value between the address name enterd by user and the actual address name returned by the 3rd party API, so this addrss value can be used to fetch the related object directly from the database"
