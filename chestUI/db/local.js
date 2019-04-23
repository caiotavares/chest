const fs = require('fs');
const dataPath = '/Users/caio.tavares/dev/personal/chest/data/';

function format(values) {
  return values[0].map((v, i, array) => {
    return {
      label: v.name,
      data: values.map(v => v[i].buyPrice)
    }
  })
}

// TODO: Replace blocking calls with streams
function load(from) {
  return new Promise((resolve, reject) => {
    let data = {};
    let files = fs.readdirSync(dataPath).filter(t => t >= from)

    files.forEach(f => {
      let raw = fs.readFileSync(dataPath + f, 'utf8');
      data[f] = JSON.parse(raw)
    });

    resolve({
      labels: Object.keys(data),
      datasets: format(Object.values(data))
    });
  })
}

module.exports = {
  load
}
