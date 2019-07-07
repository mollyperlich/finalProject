d3.json('Data/News_Links.json').then(newslinks=>{
    d3.json('Data/Graph_Data.json').then(d=>{
    
        var tsPlot = document.getElementById('myDiv');
        var qPlot = document.getElementById('histDiv');
        var rr_hold=[];
        var rr_buy=[];
        var rr_sell=[];
        var x_hold=[];
        var x_buy=[];
        var x_sell=[];
        var y=[];
        var y_hold=[];
        var y_buy=[];
        var y_sell=[];
        d.forEach(obj=>{
            
            if (obj['Action_for_News_Date']=="Hold"){
                x_hold.push(obj['Close_Date']);
                y_hold.push(obj['Close_Price']);
                rr_hold.push(obj['Daily_Return']);
            }
            else{
                if (obj['Action_for_News_Date']=="Buy"){
                    x_buy.push(obj['Close_Date']);
                    y_buy.push(obj['Close_Price']);
                    rr_buy.push(obj['Daily_Return']);
                }
                else{
                    x_sell.push(obj['Close_Date']);
                    y_sell.push(obj['Close_Price']);
                    rr_sell.push(obj['Daily_Return']);
                }
            }
        
        })
    
        var trace_rr_buy = {
            x: rr_buy,
            type: 'histogram',
            xbins: {
                
                size: 0.005
                
              },
            name:'Buy Region',
            marker: { line:{width: 5,color:"green"} ,opacity:.8}
          };
        var trace_rr_sell = {
        x: rr_sell,
        type: 'histogram',
        xbins: {
                
            size: 0.005
            
          },
        
        name:'Sell Region',
        marker: { line:{width: 5,color:"red"} ,opacity:.8}
        };
        var trace_rr_hold = {
            x: rr_hold,
            type: 'histogram',
            xbins: {
                
                size: 0.005
                
              },
            name:'Hold Region',
            marker: { line:{width: 5,color:"gray"} ,opacity:.8}
          };
        var histData = [trace_rr_hold,trace_rr_sell,trace_rr_buy];
        layout_rr = {hovermode:'closest',
                  title:'Distribution of Daily Return',
                  colorway:['gray','red','green'],
                  xaxis: {
                    title: {
                      text: 'Stock Daily Return (S_t+1/S_t)',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: 'Frequency',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
         };
        Plotly.newPlot('histDiv', histData,layout_rr);
        var trace_buy = {
            x: x_buy,
            y: y_buy,
            mode: 'markers',
            type: 'scatter',
            name: 'Buy Region',
            
            marker: { size: 6 ,opacity:.7}
          };
          
          var trace_sell = {
            x: x_sell,
            y: y_sell,
            mode: 'markers',
            type: 'scatter',
            name: 'Sell Region',
            
            marker: { size: 6 ,opacity:.7}
          };
          var trace_hold = {
            x: x_hold,
            y: y_hold,
            mode: 'markers',
            type: 'scatter',
            name: 'Hold Region',
            
            marker: { size: 6 ,opacity:.5}
          };
          
        var data = [ trace_hold, trace_sell , trace_buy];
        
        layout = {hovermode:'closest',
                  title:'Stock Price Time Series Classified as Buy/Sell/Hold',
                  colorway:['gray','red','green'],
                  xaxis: {
                    title: {
                      text: 'Trading Date',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
                  yaxis: {
                    title: {
                      text: 'Closing Price',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                  },
         };
    
    Plotly.newPlot('myDiv', data, layout);
    
    tsPlot.on('plotly_click', function(data){
        //alert('You clicked this Plotly chart!');
        var div = document.getElementById('linksDiv');
        div.innerHTML="";
        //console.log(data[0]['fullData']['x']);
        console.log(data.points[0]);
        console.log(data.points[0].data.name);
        var recommendation="";
        if (data.points[0].data.name=='Buy Region'){
            recommendation="Buy";
        }
        else{
            if (data.points[0].data.name=='Hold Region'){
                recommendation="Hold";
            }
            else{
                recommendation="Sell";
            }
        }
        div.innerHTML+='<bold>'+'Date: '+data.points[0]['x']+' '+'Recommendation: '+recommendation+'<bold><br>';
        div.innerHTML+='<bold>News Headlines<bold><br><hr>'
        newslinks.forEach(obj=>{
            if (obj['publishdate']==data.points[0]['x']){
                console.log('<a href="'+obj['sourceurl']+'">'+obj['title']+'</a>'+'<br>');
                div.innerHTML += '<a href="'+obj['sourceurl']+'">'+obj['title']+'</a>'+'<br>';
            }
        })
        
        
        
    });
    });

});

//<a href="url">link text</a>

