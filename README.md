# Battleship-Multiplayer

A test driven Battleship game in progress, built with React.JS, Node.JS and Express.JS.
Currently it is a functioning game on one page with a button to change player.
The end goal is a multiplayer implementation using websockets and a playable demo on Heroku.

## Next Steps
- Styling
- Move each player to a separate page (React-Router)
- Multiplayer (socket.io) 


## Design
The game rules are normal Battleship rules: a player can place ships on their own map, then attack a player by selecting cells on an obfuscated map, returning either a hit or miss value. The game ends when a player successfully hits every cell of an opponents fleet.

The game is comprised of various React components;
- Game
- ShipBoard
- AttackBoard
- Cell
- Fleet (for selecting ships to place)
- Switch (for changing player)

Cells are the individual grid squares, which display the state of a cell (sea, hit, miss, battleship). They are also used to display a fleet before it has been placed.
All components are stateless and have passed information through Props with the exception of the Game component. It contains all information about the various boards, hits and misses and so on.

## Built with
- React
- Node
- Express
- Webpack
- Bootstrap

## Test Suite
- Enzyme
- Chai
- Sinon

## Run
- Clone this repo
- `npm compile` for webpack to compile
- `npm start`
- Visit localhost://3000 in your browser

## Test
- Run `npm test` in the project root directory
