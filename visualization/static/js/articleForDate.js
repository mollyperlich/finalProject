/*
Contains functionality to populate the list of NY Time articles for a given date.
Data is stored within AWS DynamoDB and there is a AWS Lambda function that returns the 
articles for a given date
*/

console.log("-> articlesForData.js");


//-- Const
// URL to Restful endpoint that returns articles
const ARTICLEURL = "https://1wvzwvo96a.execute-api.us-west-2.amazonaws.com/dev?searchdate=";

// ID of div that contains the metadata which is to change color
const ARTICLE_MetadataDiv ="#article-metadatadiv";

// ID of the div that displays the date
const ARTICLE_MetadataTitle = "#article-metadatatitle";

// ID of the div that contains details
const ARTICLE_DetailsDiv = "#article-detailsdiv";



async function updateArticleDetails(searchDate, actualResult){
    /* Updates the UI based on the search date provided.

    Accepts : searchDate: (int) date to populate NY Time articles for; format of YYYYMMDD
              actualResult (string) actual result for date selected, values include:
                    "Hold", "Buy", "Sell", "Unknown"
                
    Returns : undefined
    */

    console.log("-> updateArticleDetails");


    //- Check Parameters
    if (Number.isInteger(searchDate) == false){
        throw `Invalid search date: ${searchDate}`;
    }

    if (actualResult == ''){
        actualResult = "Unknown";
    }


    //- Get Articles
    let sourceData = await getArticlesFromEndpointAsync(searchDate);


    //- Update Metadata
    updateArticleMetadata(searchDate, actualResult);


    //- Update Titles
    updateArticleTitles(sourceData);
}



function updateArticleMetadata(searchDate, actualResult){
    /* Sets the metadata for the selected date on calendar; changes the style and updates the date.

    Accepts : searchDate: (int) date to populate NY Time articles for; format of YYYYMMDD
              actualResult: (string) actual result for date selected, values include:
                    "Hold", "Buy", "Sell", "Unknown"
        
    Returns : undefined
    */

    console.log("-> updateArticleMetadata");


    //- Reference Metadata Div
    let articleMetadataDiv = d3.select(ARTICLE_MetadataDiv);


    //- Determine CSS Style
    let resultStyle = "unknownresult"

    if (actualResult == 'Hold'){
        resultStyle = "holdresult";
    }else if (actualResult == "Buy"){
        resultStyle = "buyresult";
    }else if (actualResult == "Sell"){
        resultStyle = "sellresult";
    }


    //- Update Style
    articleMetadataDiv.attr("class", `${resultStyle} resultcontainer`);


    //- Reference Title Div
    let articleTitleDiv = d3.select(ARTICLE_MetadataTitle);

    //- Remove Existing
    articleTitleDiv.selectAll("p").remove();

    //- Add Title
    let searchDateValue = moment(searchDate.toString(), "YYYYMMDD").toDate();

    articleTitleDiv.append("p")
        .text(moment(searchDateValue).format("dddd MMMM Do, YYYY"));
}


function updateArticleTitles(sourceData){
    /* Updates the UI by adding rows and columns with the articles provided. There are to be 3 articles per row.

    Accepts : sourceData (array) Contains the articles for the date
                title: (string) title of article
                id: (string) unique identifier of the news article; created when downloaded
                sourceurl: (string) Url of the news article on the NY Times website
                imageurl: (string) Url to image from the news article; could be empty
                publishdate: (int) Date when the article was published, yyyyMMdd

    Returns : undefined
    */
   
    console.log("-> updateArticleTitles");

    //- Select Div
    let articleDetailsDiv = d3.select(ARTICLE_DetailsDiv);


    //- Remove Existing
    articleDetailsDiv.selectAll("div").remove();


    let articleCounter = 0;
    let rowDiv = "";


    sourceData.forEach(articleData => {

        //- Create Row
        if (articleCounter == 0){
            rowDiv = articleDetailsDiv.append("div")
                           .attr("class", "row mt-3");
       }


       //- Create Column
       let columnClassAttr = "";
       let sourceHtml = "";

       if (articleData['imageurl'] == "NA"){

            //- Add Title Only
            columnClassAttr = "col-sm-12 col-md-4";

            sourceHtml = `<a href='${articleData['sourceurl']}' target='_blank'>` + 
                    `${articleData['title']}` + 
                    `</a>`; 
       }
       else
       {
            //- Add Image and Text
            columnClassAttr = "col-sm-12 col-md-4 text-truncate";

            sourceHtml = `<div class='text-center'><a href='${articleData['sourceurl']}' target='_blank'>` + 
                        `<img src='${articleData['imageurl']}' class='img-fluid rounded resultimage'>` + 
                        `</a></div>` + 
                        `<a href='${articleData['sourceurl']}' target='_blank'>` + 
                        `${articleData['title']}` + 
                        `</a>`;
       }

       let articleColumn = rowDiv.append("div")
                .attr("class", columnClassAttr);

        articleColumn.html(sourceHtml);


       //- Check Articles in Row
       //  Have 3 articles in each row; when 3 found then reset article counter to 0 to create new row
       articleCounter +=1;

       if (articleCounter == 3){
           articleCounter = 0;
       }
    });
}


async function getArticlesFromEndpointAsync(searchDate){
    /* Call AWS Lambda function to get data from endpoint

    Accepts : searchDate: (int) date to get articles for; YYYYMMDD format

    Returns : (array) list of the articles for the data provided
                title: (string) title of article
                id: (string) unique identifier of the news article; created when downloaded
                sourceurl: (string) Url of the news article on the NY Times website
                imageurl: (string) Url to image from the news article; could be empty
                publishdate: (int) Date when the article was published, yyyyMMdd
    */

    console.log("-> getArticlesFromEndpoint");

    try{

        //- Get Data
        let sourceUrl = ARTICLEURL + searchDate;

        let sourceData = await d3.json(sourceUrl);

        console.log(`Success in getting data from endpoint: ${searchDate}`);
        console.table(sourceData)


        return sourceData;

    } catch(err){
        console.log(err);

        let emptyData = [];
        return emptyData;
    }
}
