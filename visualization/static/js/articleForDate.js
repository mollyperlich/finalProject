/*
Contains functionality to populate the list of NY Time articles for a given date.
Data is stored within AWS DynamoDB and there is a AWS Lambda function that returns the 
articles for a given date
*/

console.log("-> articlesForData.js");

//-- Const
const ARTICLEURL = "https://1wvzwvo96a.execute-api.us-west-2.amazonaws.com/dev?searchdate=";

const ARTICLETITLESDIV = "#article-titles";

const ARTICLEIMAGEDIV = "#article-image";

const ARTICLE_MetadataDiv ="#article-metadatadiv";

const ARTICLE_MetadataTitle = "#article-metadatatitle";



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


    //- Update 
}



function updateArticleMetadata(searchDate, actualResult){
    /*

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

function populateArticles(sourceArticles, actualResult){
    /* Using the list of articles provided, updates the UI 

    Accepts : sourceArticles (array) Contains the articles for the date
                title: (string) title of article
                id: (string) unique identifier of the news article; created when downloaded
                sourceurl: (string) Url of the news article on the NY Times website
                imageurl: (string) Url to image from the news article; could be empty
                publishdate: (int) Date when the article was published, yyyyMMdd
              actualResult (string) actual result for date selected, values include:
                    "Hold", "Buy", "Sell", "Unknown"

    Returns : undefined
    */

    console.log("-> populateArticles");



    //- Check for Articles
    if (sourceArticles.length == 0){

        return;
    }



    //- Update Metadata
    let articleMetadataDiv = d3.select(ARTICLE_MetadataDiv);






    //- Populate Articles List
    let articleList =  d3.select(ARTICLETITLESDIV);

    articleList.selectAll("li")
        .data(sourceArticles)
        .enter()
        .append("li")
        .html(d => {
            //- Get Article Details
            sourceUrl = d['sourceurl'];
            title = d['title'];

            //- Create HTML
            sourceHtml = "";

            if (sourceUrl != 'NA'){
                sourceHtml = `<a href='${sourceUrl}' target='_blank'>${title}</a>`;
            }
            else{
                sourceHtml = title;
            }

            return sourceHtml;
        });
        
    
    //- Populate Image
    // Get First Valid Image
    imageUrl = "";

    for (let article of sourceArticles){
        
            if (article['imageurl'] != 'NA'){
                imageUrl = article['imageurl'];
                break;
            }
    }

    console.log(`The url: ${imageUrl}`);

    // Update UI
    let imageDiv = d3.select(ARTICLEIMAGEDIV);

    imageDiv.append('img')
        .attr('class', 'img-thumbnail img-fluid')
        .attr('src', imageUrl);
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
