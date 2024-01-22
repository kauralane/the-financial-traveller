const fetchdata = function() {
  const apiKeyEx = "c7d648abed88eaf4eb03b49fc2186e8b";
  const apiBaseURLEx = `http://api.exchangeratesapi.io/v1/2018-02-12?access_key=${apiKeyEx}`;
  
  fetch(apiBaseURLEx)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
          })
          
        }

$('#fetchButtonContainer').append('<button>').attr('id', 'fetchbutton')
let buttonfetch = $('#fetchbutton')
buttonfetch.on('click', fetchdata);




$(function () {

const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba"

// Fake user input - this will be linked to the input element on the HTML file later
const userInput = 'gb'

// Base URL with language 
    const newsBaseURL = `https://newsdata.io/api/1/news?apikey=pub_3661478808829817c896e863d91b2c1dd0dba&q=pizza`

// Fetch method
    fetch(newsBaseURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

// Will insert for loop here later, to render articles from first 5 results
            
// Article titles, images, descriptions, links
            console.log(data.results[0].title)
            let title = data.results[0].title
            
// Image element not working yet
            console.log(data.results[0].image_URL)
            let img = data.results[0].image_URL

            console.log(data.results[0].description)
            let description = data.results[0].description

            console.log(data.results[0].link)
            let link = data.results[0].link

        let titleEl = $('<h2>').text(title)
        let imgEl = $('<img>').attr('src', img)
        let pEl = $('<p>').text(description)
        let linkEl = $('<a>').attr('href', link).text('Link to full article')

        // append news information to the news section of document
        $('#news-section').append(titleEl, imgEl, pEl, linkEl)
            
            // }

        })
      })



