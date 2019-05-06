# Mantichor Frontend
![alt text](https://img.shields.io/travis/com/bptlab/mantichor-frontend.svg "Travis Build")

Frontend service for the Mantichor Choreography Execution Engine.

## Deployment

1. Clone the repository
    ```console
    foo@bar:~$ git clone https://github.com/bptlab/mantichor-frontend
    foo@bar:~$ cd mantichor-frontend
    ```

1. Deploy the service using docker compose / stack:
    ``````console
    foo@bar:~$ docker-compose up

    OR

    foo@bar:~$ docker stack deploy -c docker-compose.yml mantichor
    ```


## Development

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
1. Clone the repository
  ```
  git clone https://github.com/bptlab/mantichor-frontend
  cd mantichor-frontend
  ```
1. Install the dependencies
  ```
  npm install
  ```
1. Start the app
  ```
  npm start
  ```
1. Server is running on http://localhost:8080.

## Building Docker Images manually

1. Login to your docker account
  ```
  docker login
  ```
1. Build the image
  ```
  docker build -t bptlab/mantichor-frontend:latest .
  ```
1. Test the image
  ```
  docker run -p 8080:8080 bptlab/mantichor-frontend:latest
  ```
1. Push the image
  ```
  docker push bptlab/mantichor-frontend:latest
  ```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
