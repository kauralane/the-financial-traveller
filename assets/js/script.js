$(function () {
  const apiKeyEx = "8d6403f7b11515b6add06ccb75af36f5";
  const apiBaseURLEx = "https://api.exchangeratesapi.io/v1/";






// NEWS API CODE - LK
const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba";
let userInput = $('#search-input').val().trim();

    $('#search-button').on('click', function () {
        fetchNews()
    })

// Fetch function
function fetchNews() {

    let userInput = $('#search-input').val().trim();
    
    // Base URL with language, category, and query parameter 'economy'. Also limits number of articles returned to 5. Doesn't seem to work
    const newsBaseURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&q=economy%20AND%20${userInput}&language=en&category=business,politics,crime,technology,domestic&size=5`

// Fetch function
function fetchNews() {
    fetch(newsBaseURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (let i = 0; i < 5; i++) {
                
// Article titles, images, descriptions, links
            let title = data.results[i].title
            
            let img = data.results[i].image_url

            let description = data.results[i].description

            let link = data.results[i].link

// Create elements for title, image, description and link
        $('#title-0').text(title)
        $('#image-0').attr('src', img)
        $('#description-0').text(description)
        $('#link-0').attr('href', link).text('Link to full article').attr('target', 'blank')

        // // append news information to the news section of document
        // $('#news-section').append(titleEl, imgEl, pEl, linkEl)
            }

            })
            
        }
    }
})