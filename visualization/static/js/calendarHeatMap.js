console.log('calendarHeatMap')



function getDetails(){

    console.log(d3.select(this))
    console.log(d3.select(this).attr('sourceDate'))
    var formattedDate = d3.select(this).attr('sourceDate')
    var predictedValue = d3.select(this).attr('predictedResults')
    var actualValue = d3.select(this).attr('actualResults')
    // console.log(formattedDate.getMonth())

    // converts the date format to YYYYMMDD
        var now = new Date(formattedDate);
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var mm = m < 10 ? '0' + m : m;
        var dd = d < 10 ? '0' + d : d;
        value =  '' + y + mm + dd;

    console.log(value)
    updateArticleDetails(parseInt(value, actualValue))
    // d3.select(this).attribute

  }


  function loadCalendar(){
      console.log('getting data')
        d3.json("https://finalprojectcalendardata.s3-us-west-2.amazonaws.com/calendarData_3.json").then(data=>{
            // console.table(data)
        populateCalendar(data)



        })

  }

function populateCalendar(data) {

    // format int Date to a string to get YYYY-MM-DD format.
    data.forEach((item, index) => {
        var dateValue = item['date'].toString();
        var formatD = [dateValue.slice(0, 4), "-", dateValue.slice(4, 6), "-", dateValue.slice(6, 8)].join('');
        // item.push({'dateRect': b})

        item['dateRect'] = formatD
        });
        // console.table(data)
//   const sample = [
//     { Date: "2019-01-01", Actual: "BUY", Model: "DO NOTHING" },
//     { Date: "2019-01-02", Actual: "BUY", Model: "SELL" },
//     { Date: "2019-01-03", Actual: "SELL", Model: "BUY" },
//     { Date: "2019-01-04", Actual: "SELL", Model: "SELL" }
//   ];
  
  data.sort((a, b) => new Date(a.dateRect) - new Date(b.dateRect));

  const dateValues = data.map(dv => ({
    date: d3.timeDay(new Date(dv.dateRect)),
    actual: dv.actual,
    predicted: dv.predicted
  }));

  const svg = d3.select("#svg");
  const { width, height } = document
    .getElementById("svg")
    .getBoundingClientRect();

  function draw() {
    // this nests/group all the dates into each YEAR
    const years = d3
      .nest()
      .key(d => d.date.getUTCFullYear())
      .entries(dateValues)
      .reverse();
    const values = dateValues.map(c => c.value);
    // const maxValue = d3.max(values);
    // const minValue = d3.min(values);
    const cellSize = 25;
    const yearHeight = cellSize * 8;
    const group = svg.append("g");
    const year = group
      .selectAll("g")
      .data(years)
      .join("g")
      .attr(
        // this positions the group "g" at the top left corner of page
        "transform",
        (d, i) => `translate(50, ${yearHeight * i + cellSize * 1.5})`
      );

    
    // positioning the YEAR text on the page
    year
      .append("text")
      .attr("x", -70)
      .attr("y", -30)
      .attr("text-anchor", "end")
      .attr("font-size", 16)
      .attr("font-weight", 550)
      .attr("font-family","Arial")
      .attr("transform", "rotate(270)")
      .text(d => d.key);


    // the DAY cells
    const formatDay = d =>
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d.getUTCDay()];

    // const formatMonth = d =>
    //   ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()];


    const countDay = d => d.getUTCDay();
    const timeWeek = d3.utcSunday;
    const formatDate = d3.utcFormat("%x");


    const colorFn = d3
      // change this to use the scale ordinal for three colors
      // .schemeCategory10()
      .scaleOrdinal()
      .domain(['Buy', 'Sell', 'Hold', 'Unknown'])
      .range(["mediumseagreen", "salmon" , "silver", "white"]);
    
    const format = d3.format("+.2%");
   

    // position of the Day texts (M,T,....,S)
    year
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(d3.range(7).map(i => new Date(1995, 0, i)))
      .join("text")
      .attr("x", 4)
      .attr("y", d => (countDay(d) + 0.5) * cellSize - 5)
      .attr("dy", "0.31em")
      .attr("font-size", 12)
      .attr("font-family", "Arial")
      .text(formatDay);


    // actual outcome cell colors
    year
      .append("g")
      .selectAll("rect")
      .data(d => d.values)
      .join("rect")
      .attr("width", cellSize - 2.5)
      .attr("height", cellSize - 16.0)
      .attr(
        "x",
        (d, i) => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
      )
      .attr("y", d => countDay(d.date) * cellSize + 0.5)
      .attr("fill", d => colorFn(d.actual))
      .append("title")
      .text(d => `${formatDate(d.date)} (ACTUAL:${d.actual})`)
      .attr('actualResults', d=> d.actual)
      .attr('sourceDate', d=> d.date)
      .on('click', getDetails)
      .on("mouseover", function (d) {
        console.log('tooltip');
        console.log(d);
        toolTip.style("display", "block")
          .html(
            `${formatDate(d.date)} (MODEL:${d.actual})`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function () {
        toolTip.style("display", "none");
      });


    // model predicted outcome cell colors
    year
      .append("g")
      .selectAll("rect")
      .data(d => d.values)
      .join("rect")
      .attr("width", cellSize - 2.5)
      .attr("height", cellSize - 16.0)
      .attr(
        "x",
        (d, i) => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
      )
      .attr("y", d => countDay(d.date) * cellSize + 9.0)
      .attr("fill", d => colorFn(d.predicted))
      .append("title")
      .text(d => `${formatDate(d.date)} (MODEL:${d.predicted})`)
      .attr('predictedResults', d=> d.predicted)
      .attr('sourceDate', d=> d.date)
      .on('click', getDetails)
      .on("mouseover", function (d) {
        console.log('tooltip');
        console.log(d);
        toolTip.style("display", "block")
          .html(
            `${formatDate(d.date)} (MODEL:${d.predicted})`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function () {
        toolTip.style("display", "none");
      });



    
    // tooltip and click events
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

  }
  draw();

}
