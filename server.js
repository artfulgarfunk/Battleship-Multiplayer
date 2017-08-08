const express = require('express');

const app = express();
app.use(express.static('static'));


app.listen(3000, function() {
  console.log('Battleship started on port 3000');
})

app.get('/', (req, res) => {
  console.log('Battleship!');
})
