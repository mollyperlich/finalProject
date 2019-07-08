d3.csv('../Data/Conditional_Buy_Quantile.csv').then(buy=>{
    d3.csv('../Data/Conditional_Sell_Quantile.csv').then(sell=>{
        var qBuySell = document.getElementById('mvnDiv');
        var bq={};
        bq['buy']=[];
        bq['sell']=[];
        var sq={};
        sq['buy']=[];
        sq['sell']=[];
        buy.forEach(qbuy=>{
            bq['buy'].push(qbuy['buy_q_0.90']);
            bq['sell'].push(qbuy['Sell']);
        })
        sell.forEach(qsell=>{
            sq['buy'].push(qsell['Buy']);
            sq['sell'].push(qsell['sell_q_0.90']);
        })
        console.log(bq);
        console.log(sq);

        var trace_qbuy = {
            x: bq['buy'],
            y: bq['sell'],
            mode: 'markers',
            type: 'scatter',
            name: '0.9 quantile of Buys',
            
            marker: { size: 2 ,opacity:.7}
          };
          
          var trace_qsell = {
            x: sq['buy'],
            y: sq['sell'],
            mode: 'markers',
            type: 'scatter',
            name: '0.9 quantile of Sells',
            
            marker: { size: 2 ,opacity:.7}
          };
          var qdata = [ trace_qbuy,trace_qsell];
          qlayout = {hovermode:'closest',
                  title:'Multivariate Normal 0.9 quantiles of Buy/Sell counts (575 stocks)',
                  colorway:['green','red'],
                  xaxis: {
                    title: {
                      text: 'Number of Stock Indicating Buy',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: 'Number of Stocks indicating Sell',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
         };
         Plotly.newPlot('mvnDiv', qdata, qlayout);
    });

});

//<a href="url">link text</a>

