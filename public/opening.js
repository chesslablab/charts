const movetext = document.getElementById('movetext');
const charts = document.getElementById('charts');
const allEqual = arr => arr.every(val => val === arr[0]);

fetch(`http://localhost:8080/api/heuristics`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    movetext: movetext.innerHTML
  })
})
.then(res => res.json())
.then(res => {
  res.evalNames.forEach((item, i) => {
    const data = res.balance.map((value, index) => value[i]);
    if (!allEqual(data)) {
      const div = document.createElement('div');
      const canvas = document.createElement('canvas');
      div.appendChild(canvas);
      charts.appendChild(div);

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: data,
          datasets: [{
            label: item,
            data: data,
            borderWidth: 4,
            tension: 0.25,
            borderColor: '#0a0a0a'
          }]
        },
        options: {
          animation: false,
          elements: {
            point:{
              radius: 0
            }
          },
          scales: {
            y: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              },
              border: {
                display: false
              },
              beginAtZero: true,
              min: -1.1,
              max: 1.1
            },
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              },
              border: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 0,
                font: {
                  size: 16
                }
              }
            }
          }
        }
      });
    }
  });
})
.catch(error => {
  alert('Whoops! Something went wrong, please try again.');
})
.finally(() => {
  document.getElementById('loadingSpinner').style.display = 'none';
  document.getElementById('downloadBtn').style.display = 'block';
});
