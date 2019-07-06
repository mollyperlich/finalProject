console.log('calendarHeatMap')



function getDetails(){

    console.log(d3.select(this))
    console.log(d3.select(this).attr('sourceDate'))
    var formattedDate = d3.select(this).attr('sourceDate')
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
    updateArticleDetails(parseInt(value))
    // d3.select(this).attribute

  }

  function loadCalendar() {

  const sample = [
    { Date: "2019-01-01", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-01-02", Actual: "BUY", Model: "SELL" },
    { Date: "2019-01-03", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-04", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-05", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-06", Actual: "SELL", Model: "DO NOTHING" },
    { Date: "2019-01-07", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-08", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-09", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-10", Actual: "BUY", Model: "BUY" },
    { Date: "2019-01-11", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-01-12", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-13", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-01-14", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-01-15", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-16", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-17", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-18", Actual: "BUY", Model: "BUY" },
    { Date: "2019-01-19", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-01-20", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-21", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-01-22", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-01-23", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-01-24", Actual: "BUY", Model: "SELL" },
    { Date: "2019-01-25", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-26", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-27", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-28", Actual: "BUY", Model: "SELL" },
    { Date: "2019-01-29", Actual: "SELL", Model: "BUY" },
    { Date: "2019-01-30", Actual: "SELL", Model: "SELL" },
    { Date: "2019-01-31", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-01", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-02-02", Actual: "BUY", Model: "SELL" },
    { Date: "2019-02-03", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-04", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-05", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-06", Actual: "SELL", Model: "DO NOTHING" },
    { Date: "2019-02-07", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-08", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-09", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-10", Actual: "BUY", Model: "BUY" },
    { Date: "2019-02-11", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-02-12", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-13", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-02-14", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-02-15", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-16", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-17", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-18", Actual: "BUY", Model: "BUY" },
    { Date: "2019-02-19", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-02-20", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-21", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-02-22", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-02-23", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-02-24", Actual: "BUY", Model: "SELL" },
    { Date: "2019-02-25", Actual: "SELL", Model: "BUY" },
    { Date: "2019-02-26", Actual: "SELL", Model: "SELL" },
    { Date: "2019-02-27", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-01", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-03-02", Actual: "BUY", Model: "SELL" },
    { Date: "2019-03-03", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-04", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-05", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-06", Actual: "SELL", Model: "DO NOTHING" },
    { Date: "2019-03-07", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-08", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-09", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-10", Actual: "BUY", Model: "BUY" },
    { Date: "2019-03-11", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-03-12", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-13", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-03-14", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-03-15", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-16", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-17", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-18", Actual: "BUY", Model: "BUY" },
    { Date: "2019-03-19", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-03-20", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-21", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-03-22", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-03-23", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-03-24", Actual: "BUY", Model: "SELL" },
    { Date: "2019-03-25", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-26", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-27", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-28", Actual: "BUY", Model: "SELL" },
    { Date: "2019-03-29", Actual: "SELL", Model: "BUY" },
    { Date: "2019-03-30", Actual: "SELL", Model: "SELL" },
    { Date: "2019-03-31", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-01", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-04-02", Actual: "BUY", Model: "SELL" },
    { Date: "2019-04-03", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-04", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-05", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-06", Actual: "SELL", Model: "DO NOTHING" },
    { Date: "2019-04-07", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-08", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-09", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-10", Actual: "BUY", Model: "BUY" },
    { Date: "2019-04-11", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-04-12", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-13", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-04-14", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-04-15", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-16", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-17", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-18", Actual: "BUY", Model: "BUY" },
    { Date: "2019-04-19", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-04-20", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-21", Actual: "DO NOTHING", Model: "SELL" },
    { Date: "2019-04-22", Actual: "DO NOTHING", Model: "BUY" },
    { Date: "2019-04-23", Actual: "BUY", Model: "DO NOTHING" },
    { Date: "2019-04-24", Actual: "BUY", Model: "SELL" },
    { Date: "2019-04-25", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-26", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-27", Actual: "SELL", Model: "SELL" },
    { Date: "2019-04-28", Actual: "BUY", Model: "SELL" },
    { Date: "2019-04-29", Actual: "SELL", Model: "BUY" },
    { Date: "2019-04-30", Actual: "SELL", Model: "SELL" }
  ];
  
  sample.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  const dateValues = sample.map(dv => ({
    date: d3.timeDay(new Date(dv.Date)),
    value: dv.Actual,
    model: dv.Model
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
    const maxValue = d3.max(values);
    const minValue = d3.min(values);
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

    const formatMonth = d =>
      ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()];


    const countDay = d => d.getUTCDay();
    const timeWeek = d3.utcSunday;
    const formatDate = d3.utcFormat("%x");


    const colorFn = d3
      // change this to use the scale ordinal for three colors
      // .schemeCategory10()
      .scaleOrdinal()
      .domain(['BUY', 'SELL', 'DO NOTHING'])
      .range(["mediumseagreen", "salmon" , "silver"]);
    
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
      .attr("fill", d => colorFn(d.value))
      .append("title")
      // .text(d => `${formatDate(d.date)} (ACTUAL:${d.value})`);


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
      .attr("fill", d => colorFn(d.model))
      .attr('sourceDate', d=> d.date)
      .on('click', getDetails)
      .on("mouseover", function (d) {
        console.log('tooltip');
        console.log(d);
        toolTip.style("display", "block")
          .html(
            `${formatDate(d.date)} (MODEL:${d.model})`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function () {
        toolTip.style("display", "none");
      });

      // .append("title")
      // .text(d => `${formatDate(d.date)} (MODEL:${d.model})`)
      // .on('click', function () {
      //   console.log('click');
      // });


    
    // tooltip and click events
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

  }
  draw();

}
