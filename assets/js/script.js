$(function () {
    const apiKeyEx = "8d6403f7b11515b6add06ccb75af36f5";
    const apiBaseURLEx = "https://api.exchangeratesapi.io/v1/";






    // NEWS API CODE - LK
    const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba";
    let userInput = $('#search-input').val().trim();

    // On-click function for the search button
    $('#search-button').on('click', function () {
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

                // If statement: if the API returns 0 results for the searched country, tell the user there are no results
                if (data.results == 0) {
                    for (let i = 0; i < 3; i++) {
                        $(`#title-${i}`).text('No current news')
                        $(`#image-${i}`).attr('src', "./assets/images/no-news-placeholder.jpeg")
                        $(`#description-${i}`).text('Why not try searching a different country?')
                        $(`#link-${i}`).attr('href', 'https://www.bbc.co.uk/news/business/economy').text('Or, check out the latest economic news on the BBC website').attr('target', 'blank')
                    }
                }
                else {
                    // For loop to render each article to its corresponding card
                    for (let i = 0; i < 3; i++) {

                        // Get the title
                        let title = data.results[i].title

                        // If the article doesn't have an image URL, use a placeholder image
                        if (!data.results[i].image_url) {
                            let img = "./assets/images/no-news-placeholder.jpeg"
                            $(`#image-${i}`).attr('src', img)
                        } else {
                            let img = data.results[i].image_url
                            $(`#image-${i}`).attr('src', img)
                        }

                        // Get the description
                        let description = data.results[i].description

                        // Get the full article link
                        let link = data.results[i].link

                        // Render the title, description and link
                        $(`#title-${i}`).text(title)
                        $(`#description-${i}`).text(description)
                        $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank')

                        // Clear out the user's search text from the search box
                        $('#search-input').val("")
                    }
                }

            })

    }
})