const express = require('express');
const db = require('./db/local');

const app = express();
const port = 3000;

function error(status, body) {
  console.log('Error: ' + body);
  let error = new Error(body);
  error.status = status;
  throw error;
}

function handle(req, res) {
  try {
    let from = req.query.from;
    if (!from) { error(400) }
    db.load(from.toString())
      .then(data => res.send(data))
      .catch(e => error(500, e))
  }
  catch (err) {
    res.status(err.status || 500).send(err.message)
  }
}

app.use(express.static(__dirname + '/public'))
app.get('/api/data', handle)

app.listen(port, () => console.log('chest server started...'));
