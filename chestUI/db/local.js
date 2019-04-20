const fs = require('fs');
const dataPath = '/Users/caio.tavares/dev/personal/chest/data/';

// TODO: Replace blocking calls with streams
function load(from) {
  return new Promise((resolve, reject) => {
    let data = [];
    let files = fs.readdirSync(dataPath).filter(f => f >= from)

    files.forEach(f => {
      let raw = fs.readFileSync(dataPath + f, 'utf8');
      let content = {};
      content[f] = JSON.parse(raw)
      data.push(content)
    });
    resolve(data);
  })
}

module.exports = {
  load
}
