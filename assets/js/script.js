$(document).ready(function () {
  const apiKeyEx = "8d6403f7b11515b6add06ccb75af36f5";
  const apiBaseURLEx = "https://api.exchangeratesapi.io/v1/";
  console.log('test')
})

$(function () {

const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba"

// Fake user input - this will be linked to the input element on the HTML file later
let userInput = 'pizza'

// Base URL with language 
const newsBaseURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&q=${userInput}&language=en`

// Fetch method
    fetch(newsBaseURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

// For loop - to render relevant data from the first 5 results 
            // for (let i = 0; i < 5; i++) {
            
// Article titles, images, descriptions, links
            console.log(data.results[0].title)
            let title = data.results[0].title
            console.log(data.results[0].image_URL)
            let img = data.results[0].image_URL
            console.log(data.results[0].description)
            let description = data.results[0].image_URL
            console.log(data.results[0].link)
            let link = data.results[0].link

        $('<h1>').text(title)
            $('<img>').attr('src', data.results[0].image_URL)
            $()
            
            // }

        })

})
