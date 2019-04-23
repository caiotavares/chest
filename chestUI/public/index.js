const context = document.getElementById('chest-chart').getContext('2d');

const chart = new Chart(context, {
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {}
});

function toDate(t) {
  let date = new Date(t * 1000);
  return date.toLocaleString('pt-br');
}

function load(from) {
  return fetch('/api/data?from=' + from)
    .then(res => res.json());
}

let t = 1555986600;

load(t)
  .then(data => {
    chart.data.datasets = data.datasets;
    chart.data.labels = data.labels.map(d => toDate(d));
    chart.update();
  });
