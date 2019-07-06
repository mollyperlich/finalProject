/*
Contains functionality to populate the list of NY Time articles for a given date.
Data is stored within AWS DynamoDB and there is a AWS Lambda function that returns the 
articles for a given date
*/


//-- Const
const ARTICLEURL = "https://1wvzwvo96a.execute-api.us-west-2.amazonaws.com/dev?searchdate=";

const ARTICLETITLESDIV = "#article-titles";

const ARTICLEIMAGEDIV = "#article-image";



function updateArticleDetails(searchDate){
    /* Updates the UI based on the search date provided.

    Accepts : searchDate: (int) date to populate NY Time articles for; format of YYYYMMDD
                
    Returns : undefined
    */

    console.log("-> updateArticleDetails");


    //- Check Parameters
    if (Number.isInteger(searchDate) == false){
        //- Update UI
        let emptyArticles = [];

        populateArticles(emptyArticles);


        throw `Invalid search date: {searchDate}`;
    }


    //- Get Articles
    getArticlesFromEndpoint(searchDate);
}


function populateArticles(sourceArticles){
    /* Using the list of articles provided, updates the UI 

    Accepts : sourceArticles (array) Contains the articles for the date
                title: (string) title of article
                id: (string) unique identifier of the news article; created when downloaded
                sourceurl: (string) Url of the news article on the NY Times website
                imageurl: (string) Url to image from the news article; could be empty
                publishdate: (int) Date when the article was published, yyyyMMdd

    Returns : undefined
    */

    console.log("-> populateArticles");


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


function getArticlesFromEndpoint(searchDate){
    /* Call AWS Lambda function to get data from endpoint

    Accepts : searchDate: (int) date to get articles for; YYYYMMDD format

    Returns : Undefined
    */

    console.log("-> getArticlesFromEndpoint");

    //- Create Proxy URL
    //  Issues setting up AWS Gateway to allow remote access use proxy
    let sourceUrl = 'https://cors-anywhere.herokuapp.com/' + ARTICLEURL + searchDate;


    d3.json(sourceUrl).then(data => {
        console.log("Success getting articles");
        console.table(data);

        populateArticles(data);

    }).catch(e => {
        console.log(`Failure getting articles: ${e}`);

        let emptyArticles = [];
        populateArticles(emptyArticles);
    });
}
