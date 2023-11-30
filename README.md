# The Checkers Club

Welcome to The Checkers Club, a software built with NodeJs, to play multiplayer Checkers online against other players.

## Overview

This project is divided into two main containers: the server (API/backend) and the client (frontend). The server is built using Express.js for the REST API and WebSocket (SocketIo) for real-time communication. The client is developed in React.

## Key Features

- **Online Gameplay:**
  - Play Checkers online with other players in real-time.
  - Create or join game rooms.
  - Listen to room events.

- **Room:**
  - Uses Redis as a database to store game rooms.
  - Rooms are automatically removed after 24 hours.
  - Rooms can have password.

## Software Architecture

- **Improvements**
  - (On big projects) Use load balances for backend connections.

- **Infra**
  - CD (Continuous Deployment) runs automatically for releases in `main` branch (both frontend and backend separated).
  - Redis deployed at RedisLabs.
  - FrontEnd deployed at Amazon S3. Cloudfront for CDN(global assets distribution).
  - BackEnd deployed at Amazon EC2. Nginx to reverse proxies.
  - Certbot for SSL certificates
  - Using Route53 for DNS.

- **FrontEnd**
  - Vite@4 for bundling.
  - React@18 to create interfaces.
  - Zustand@4 for state management.

- **BackEnd**
  - ExpressJs@4 for REST API connections.
  - SocketIo@4 for WebSockets connections.
  - Redis as database for Rooms.

## Future implementations
- User management (register, login, game stats, friends, etc).
- Gamefication (change pieces/board styles).

## Contribution

Feel free to contribute to the project. Open an issue to discuss new features or problems, and send pull requests to propose changes.

## License
This project is licensed under the MIT License.