# betworks-msg-app-server
This project is used to demonstrate a simple use on a node/express webserver to serve up a rest api.
The API by default will be served on port 4000. Valid test users can be found in the src/models/users.json file.

## Installing Docker
Follow the following [link](https://www.docker.com/get-started) to install docker

## Building the Application
Run `docker build -t msgserver .` to build the project.

## Run the application
Run `docker run -d -p 4000:4000 --name messaging-app msgserver` to run the project on port 4000.

## Run tests
Run `npm run test` to execute unit tests
