# Mantichor Frontend
![alt text](https://img.shields.io/travis/com/bptlab/mantichor-frontend.svg "Travis Build")

Frontend service for the Mantichor Choreography Execution Engine.

## Deployment

1. Clone the repository
    ```console
    foo@bar:~$ git clone https://github.com/bptlab/mantichor-frontend
    foo@bar:~$ cd mantichor-frontend
    ```
2. Deploy the service using docker compose / stack:
    ```console
    foo@bar:~$ docker-compose up
    # OR #
    foo@bar:~$ docker stack deploy -c docker-compose.yml mantichor
    ```


## Development

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Clone the repository
  ```
  git clone https://github.com/bptlab/mantichor-frontend
  cd mantichor-frontend
  ```
3. Install the dependencies
  ```
  npm install
  ```
4. Start the app
  ```
  npm start
  ```
5. Server is running on http://localhost:8080.

## Building Docker Images manually

1. Login to your docker account
  ```
  docker login
  ```
2. Build the image
  ```
  docker build -t bptlab/mantichor-frontend:latest .
  ```
3. Run the image
  ```
  docker run -p 8080:8080 bptlab/mantichor-frontend:latest
  ```

## License

Copyright (c) 2020

Licensed under the [MIT license](LICENSE).
