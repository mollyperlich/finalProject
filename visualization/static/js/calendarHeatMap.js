console.log('calendarHeatMap')



function getDetails(){
    /*  Handles the click event of rectangle within the calendar; gets the selected item 
        and then updates the details.

    Accepts : nothing

    Returns : undefined
    */
  
    console.log("--> getDetails");

    //- Get Select Item
    var formattedDate = d3.select(this).attr('sourceDate')
    var actualValue = d3.select(this).attr('actualResults')
    console.log(actualValue)

    //- Converts the date format to YYYYMMDD
    var now = new Date(formattedDate);
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    value =  '' + y + mm + dd;


    //- Update UI
    updateArticleDetails(parseInt(value), actualValue)
}


function loadCalendar(){
    /* Prepares the page by loading the calendar; pulls from AWS S3 and then updates the UI

    Accepts : nothing

    Returns : undefined
    */

    console.log("-> loadCalendar");

    d3.json("https://finalprojectcalendardata.s3-us-west-2.amazonaws.com/calendarData_5.json").then(data=>{
      populateCalendar(data);
    });
}


function populateCalendar(data) {
  /* Populates the D3 calendar based on the data provided

  Accepts : data: (array) contains list of dictionary, one item for each day
              "date" (int) date of the record; in YYYYMMDD format
              "predicted" (string) what the model recommended; "Unknown", "Hold", "Sell"
              "actual" (string) what the actual stock did; "Unknown", "Hold", "Sell"
  */

    console.log("--> populateCalendar");

    //- Format Date Required for Calendar
    // format int Date to a string to get YYYY-MM-DD format.
    data.forEach((item, index) => {
        var dateValue = item['date'].toString();
        var formatD = [dateValue.slice(0, 4), "-", dateValue.slice(4, 6), "-", dateValue.slice(6, 8)].join('');

        item['dateRect'] = formatD
    });


    //- Create Array for Charts
    const dateValues = data.map(dv => ({
      date: d3.timeDay(new Date(dv.dateRect)),
      actual: dv.actual,
      predicted: dv.predicted
    }));


    //- Create SVG
    const svg = d3.select("#svg");



    // this nests/group all the dates into each YEAR
    const years = d3
      .nest()
      .key(d => d.date.getUTCFullYear())
      .entries(dateValues)
      .reverse();
    const values = dateValues.map(c => c.value);
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
      .range(["mediumseagreen", "salmon" , "silver", "lavender"]);
    
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
      .append("title")
      .text(d => `${formatDate(d.date)} (ACTUAL:${d.actual})`)
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
      .attr('actualResults', d=> d.actual)
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
      .append("title")
      .text(d => `${formatDate(d.date)} (MODEL:${d.predicted})`)
      .on("mouseout", function () {
        toolTip.style("display", "none");
      });



    
    // tooltip and click events
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

      //- Create Legend
      createLegend(group)
}


function createLegend(svgGroup){
    /* Creates legend; boxes with the color and label

    Accepts : svgGroup (D3 G element) element to add the legend components
    
    Returns : nothing
    */

    console.log("-> createLegend");


    let legend = svgGroup
          .append("g")
          .attr(
              "transform",
              `translate(10,10})`);


    //- Buy
    legend
      .append("rect")
      .attr("width", 100)
      .attr("height", 25)
      .attr("x", 400)
      .attr("y", 5)
      .attr("fill", 'mediumseagreen');

    legend.append("text")
          .attr("x", 450)
          .attr("y", 22)
          .attr("class", "resultLabelText")
          .attr("text-anchor", "middle")
          .text("Buy");
        

    //- Sell
    legend
      .append("rect")
      .attr("width", 100)
      .attr("height", 25)
      .attr("x", 500)
      .attr("y", 5)
      .attr("fill", 'salmon');

    legend.append("text")
      .attr("x", 550)
      .attr("y", 22)
      .attr("class", "resultLabelText")
      .attr("text-anchor", "middle")
      .text("Sell");


    //- Hold
    legend
      .append("rect")
      .attr("width", 100)
      .attr("height", 25)
      .attr("x", 600)
      .attr("y", 5)
      .attr("fill", 'silver');
    
    legend.append("text")
      .attr("x", 650)
      .attr("y", 22)
      .attr("class", "resultLabelText")
      .attr("text-anchor", "middle")
      .text("Hold");


    //- Unknown
    legend
      .append("rect")
      .attr("width", 100)
      .attr("height", 25)
      .attr("x", 700)
      .attr("y", 5)
      .attr("fill", 'lavender');

    legend.append("text")
      .attr("x", 750)
      .attr("y", 22)
      .attr("class", "resultLabelText")
      .attr("text-anchor", "middle")
      .text("Unknown");
}
