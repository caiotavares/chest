const request = require('request-promise-native');
const cheerio = require('cheerio');
const fs = require('fs');

const URI = 'http://www.tesouro.fazenda.gov.br/tesouro-direto-precos-e-taxas-dos-titulos'
const options = {
  uri: URI,
  transform: (body) => {
    return cheerio.load(body)
  }
}

function write(file, content) {
  let stream = fs.createWriteStream(file);
  stream.once('open', (fd) => {
    stream.write(content)
    stream.end();
  })
}

function processArguments(data) {
  let content = JSON.stringify(data);
  if (process.argv[2] == 'file') {
    let file = process.argv[3]
    write(file, content)
  }
  else if (process.argv[2] == 'out') {
    console.log(content)
  }
}

function sort(data) {
  return data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

function combine(data) {
  let result = [];
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].name === data[i + 1].name) {
      result.push({
        name: data[i].name,
        date: data[i].date,
        buyPrice: data[i].buyPrice || data[i + 1].buyPrice,
        sellPrice: data[i].sellPrice || data[i + 1].sellPrice
      });
    }
  }
  return result;
}

function extract($) {
  let result = [];
  $('.camposTesouroDireto')
    .each((i, v) => {
      let values = $(v).children('.listing')
      result[i] = {
        name: $(v).children('.listing0').text(),
        date: $(values[0]).text(),
        interest: $(values[1]).text(),
        buyPrice: values.length == 4 ? $(values[3]).text() : undefined,
        sellPrice: values.length == 3 ? $(values[2]).text() : undefined
      }
    })
  return result;
}

request(options)
  .then($ => extract($))
  .then(r => sort(r))
  .then(r => combine(r))
  .then(r => processArguments(r))
