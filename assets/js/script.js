$(function () {

    // To note - this API gives 1500 fetches total 
    const exAPIKey = "1569a418148c4ece3affae5f";

    function getExchangeRate() {

$('#exchange-results').empty();

    let baseCurrency = $('#base-input').val().trim();
    let targetCurrency = $('#target-input').val().trim();
    const exURL = `https://v6.exchangerate-api.com/v6/${exAPIKey}/pair/${baseCurrency}/${targetCurrency}`;

                fetch(exURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                
                let base = data.base_code;
                let target = data.target_code;
                let rate = data.conversion_rate;

                let rateEl = $('<h3>').text(`Conversion rate: 1 ${base} = ${rate} ${target}`)

                $('#exchange-results').append(rateEl)

                })
            }

    $('#currency-search-button').on('click', function() {
        getExchangeRate();
    })



    // NEWS API CODE - LK
    const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba";

    // render previous search history buttons from local storage upon opening page
    renderHistory();

    // On-click function for the search button
    $('#search-button').on('click', function () {
        fetchNews();
    })

    // Fetch function which incorporates user search
    function fetchNews() {
        let userInput = $('#search-input').val().trim();

        // Base URL with language, category (business), and limit on number of articles
        const newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=${userInput}&language=en&category=business&size=3`;

        fetch(newsURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)

                // If statement: if the API returns 0 results for the searched country, tell the user there are no results
                if (data.results == 0) {
                    for (let i = 0; i < 3; i++) {
                        $(`#title-${i}`).text('No current news');
                        $(`#image-${i}`).attr('src', "./assets/images/no-news-placeholder.jpeg").addClass('news-image');
                        $(`#description-${i}`).text('Why not try searching a different country?');
                        $(`#link-${i}`).attr('href', 'https://www.bbc.co.uk/news/business/economy').text('Or, check out the latest economic news on the BBC website').attr('target', 'blank');
                    }
                }

                else {

        // Save search history function
                    saveNewsSearch();

                    // For loop to render each article to its corresponding card
                    for (let i = 0; i < 3; i++) {

                        // Get the title
                        let title = data.results[i].title;

                        // If the article doesn't have an image URL, use a placeholder image
                        if (!data.results[i].image_url) {
                            let img = "./assets/images/no-news-placeholder.jpeg"
                            $(`#image-${i}`).attr('src', img).addClass('news-image');
                        } else {
                            let img = data.results[i].image_url
                            $(`#image-${i}`).attr('src', img).addClass('news-image');
                        }

                        // Get the description
                        let description = data.results[i].description;

                        // Get the full article link
                        let link = data.results[i].link;

                        // Render the title, description and link
                        $(`#title-${i}`).text(title);
                        $(`#description-${i}`).text(description);
                        $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank');

                        // Clear out the user's search text from the search box
                        $('#search-input').val("");
                    }
                }

            })

    }

function saveNewsSearch() {
    let userInput = $('#search-input').val().trim();
    if (userInput !== "") {
        let countryButton = $('<button>').text(userInput).addClass('countryButton').data('countryName', userInput);
        $('#history').append(countryButton);

        let countriesArray = JSON.parse(localStorage.getItem('countries')) || [];
        countriesArray.push(userInput);

        localStorage.setItem('countries', JSON.stringify(countriesArray));
    }
}

    function renderHistory() {
        let countriesArray = JSON.parse(localStorage.getItem('countries')) || [];
        let lastFive = countriesArray.slice(-5);
        lastFive.forEach(country => {
            let countryButton = $('<button>').text(country).addClass('countryButton').data('countryName', country);
            $('#history').append(countryButton);
        
        })
    }


    // REPEATED CODE BUT WITH SAVED HISTORY COUNTRY; VERY WET, NEEDS TO BE DRIED

    // On clicking history button, display results for that country
    $('#history').on('click', '.countryButton', function () {
        let countryName = $(this).data('countryName');

        const newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=${countryName}&language=en&category=business&size=3`;

        fetch(newsURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // If statement: if the API returns 0 results for the searched country, tell the user there are no results
                if (data.results == 0) {
                    for (let i = 0; i < 3; i++) {
                        $(`#title-${i}`).text('No current news');
                        $(`#image-${i}`).attr('src', "./assets/images/no-news-placeholder.jpeg").addClass('news-image');
                        $(`#description-${i}`).text('Why not try searching a different country?');
                        $(`#link-${i}`).attr('href', 'https://www.bbc.co.uk/news/business/economy').text('Or, check out the latest economic news on the BBC website').attr('target', 'blank');
                    }
                }

                else {

                    // For loop to render each article to its corresponding card
                    for (let i = 0; i < 3; i++) {

                        // Get the title
                        let title = data.results[i].title;

                        // If the article doesn't have an image URL, use a placeholder image
                        if (!data.results[i].image_url) {
                            let img = "./assets/images/no-news-placeholder.jpeg"
                            $(`#image-${i}`).attr('src', img).addClass('news-image');
                        } else {
                            let img = data.results[i].image_url;
                            $(`#image-${i}`).attr('src', img).addClass('news-image');
                        }

                        // Get the description
                        let description = data.results[i].description;

                        // Get the full article link
                        let link = data.results[i].link;

                        // Render the title, description and link
                        $(`#title-${i}`).text(title);
                        $(`#description-${i}`).text(description);
                        $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank');

                        // Clear out the user's search text from the search box
                        $('#search-input').val("");
                    }
                }

            })
        })

$('#clear-history-btn').on('click', function () {
    localStorage.clear();
    $('#history').empty();
})

})