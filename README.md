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

## Usage of the application

- Click register at the bottom of the landing page (here)[https://gamevitation.netlify.app/]
- After being navigated to the server landing page, register an account with the link in the top right. 
- After configuring the game, use the prodivded link to your event that you can share with your friends to play the game!

## Endpoint routes USER

| Route          |  Description                                             |
| -------------- | ------------------------------------------------------- |
| / | home page with the links to sign in and login in the backend    |
| /wedding/:wedding_url | renders the welcome page with wedding configuration data |
| /game/:game_id  | renders the game with the configuration from that id |
| /scores/:wedding_url | shows the scores of people from both sides of the wedding |
| /invite/:wedding_url   | shows the invitation to the wedding with custom title and message |
