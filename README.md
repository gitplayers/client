## Technologies
- React 
- Html canvas
- Chart.js
- Jest
- Javascript/Html
- CSS

## Deployment
- Netlify

## Installation

- To run the application on your own machine `npm run dev`

### Usage

* Run docker-compose up on another terminal
* Run in the pipenv shell terminal pipenv run dev to launch
* Go to localhost:8000 to view the server app


## Endpoint routes USER

| Route          |  Description                                             |
| -------------- | ------------------------------------------------------- |
| / | home page with the links to sign in and login in the backend    |
| /wedding/:wedding_url | renders the welcome page with wedding configuration data |
| /game/:game_id  | renders the game with the configuration from that id |
| /scores/:wedding_url | shows the scores of people from both sides of the wedding |
| /invite/:wedding_url   | shows the invitation to the wedding with custom title and message |
