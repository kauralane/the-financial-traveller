$(function () {
  const apiKeyEx = "8d6403f7b11515b6add06ccb75af36f5";
  const apiBaseURLEx = "https://api.exchangeratesapi.io/v1/";






// NEWS API CODE - LK
const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba";
let userInput = $('#search-input').val().trim();

// BELOW CODE NOT YET WORKING
// // Need to write if statement to only load the England search 
// if ($('#news').empty()) {
//     fetchEnglandNews();
// }

// // Load up news from England when user first loads the page
// function fetchEnglandNews() {
//         let newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=England&language=en&category=business&size=3`

//         fetch(newsURL)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data)

//                 for (let i = 0; i < 3; i++) {

//                     // Article titles, images, descriptions, links
//                     let title = data.results[i].title

//                     let img = data.results[i].image_url

//                     let description = data.results[i].description

//                     let link = data.results[i].link

//                     $(`#title-${i}`).text(title)
//                     $(`#image-${i}`).attr('src', img)
//                     $(`#description-${i}`).text(description)
//                     $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank')
//     }
// })
// }

// On-click function for the search button
    $('#search-form').on('submit', function () {
            fetchNews();
    })


// Fetch function which incorporates user search
function fetchNews() {
    let userInput = $('#search-input').val().trim();
    
    // Base URL with language, category (business), and limit on number of articles
    const newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=${userInput}&language=en&category=business&size=3`

    fetch(newsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

// For loop to render each article to it's corresponding card
            for (let i = 0; i < 3; i++) {
                
            let title = data.results[i].title
            
            let img = data.results[i].image_url

            let description = data.results[i].description

            let link = data.results[i].link

                $(`#title-${i}`).text(title)
                $(`#image-${i}`).attr('src', img)
                $(`#description-${i}`).text(description)
                $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank')

// Clear out the user's search 
            $('#search-input').val("")

            }

            })
            
        }
    })