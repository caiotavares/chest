const context = document.getElementById('chest-chart').getContext('2d');

let chart = new Chart(context, {
  type: 'line',
  data: {
    labels: ['18/04/2019', '19/04/2019'],
    datasets: []
  },
  options: {}
});

function load(from, to) {
  return fetch('/api/data')
    .then(res => res.json());
}

load()
  .then(data => {
    data.forEach(d => {
      chart.data.datasets.push({
        label: d.name,
        // backgroundColor: 'rgb(255, 99, 132)',
        // borderColor: 'rgb(255, 99, 132)',
        data: [d.sellPrice, d.buyPrice]
      })
    })
    chart.update();
  });
