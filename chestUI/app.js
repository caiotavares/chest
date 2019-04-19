const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'))

app.get('/api/data', (req, res) => {
  let reader = fs.createReadStream( '/Users/caio.tavares/dev/personal/chest/data/04/19/1555643179');
  reader.on('open', () => {
    reader.pipe(res);
  });
})

app.listen(port, () => console.log('chest server started...'))
