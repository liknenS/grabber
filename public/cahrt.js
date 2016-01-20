google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        XHR.get("/table.json").then(function(result) {
            var table = [['create','sell','buy','nbrb']];
            for(var i in result){
              var tmp = [];
              tmp.push(new Date(result[i].create));
              tmp.push(+result[i].sell.replace(' ', ''));
              tmp.push(+result[i].buy.replace(' ', ''));
              tmp.push(+result[i].nbrb.replace(' ', ''));
              table.push(tmp);
            }

        var data = google.visualization.arrayToDataTable(table);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

        });
      }