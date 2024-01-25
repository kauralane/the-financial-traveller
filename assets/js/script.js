$(function () {

// Currency API (1500 fetches) - (Laura)
    const exAPIKey = "1569a418148c4ece3affae5f";

    function getExchangeRate() {

// Empty out any previous results which are rendered to the page
        $('#exchange-results').empty();

// Fetch function and base URL
        let baseCurrency = $('#base-input').val().trim();
        let targetCurrency = $('#target-input').val().trim();
        const exURL = `https://v6.exchangerate-api.com/v6/${exAPIKey}/pair/${baseCurrency}/${targetCurrency}`;

        fetch(exURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // Render data from API to the page
                let base = data.base_code;
                let target = data.target_code;
                let rate = data.conversion_rate;

                let rateEl = $('<h3>').text(`Conversion rate: 1 ${base} = ${rate} ${target}`)

                $('#exchange-results').append(rateEl)
            })
    }

    // Event listener for currency exchange submit button
    $('#currency-search-button').on('click', function () {
        getExchangeRate();
    })
    
    // News API (Laura)
    const newsAPIKey = "3661478808829817c896e863d91b2c1dd0dba";

    // Render search history upon opening page
    renderHistory();

    // On-click function for the search button
    $('#search-button').on('click', function () {
        fetchNews();
    })

    // Fetch function which incorporates user search
        function fetchNews() {
        $(`#news-heading`).empty();
        let userInput = $('#search-input').val().trim();

            if (userInput !== "") {
        // Base URL with language, category (business), and limit on number of articles
        const newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=${userInput}&language=en&category=business&size=3`;

        // Render a title to the page to tell user what location the news is from
        let newsTitle = $('<h5>').text(`Showing business news from: ${userInput}`).addClass('news-location-heading');
        $(`#news-heading`).prepend(newsTitle);

        fetch(newsURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                renderNews(data);
            })
        }  
    }

// Function to render results from API to the page
    function renderNews(data) {
        // If statement: if the API returns 0 results for the searched country, tell the user there are no results
        if (data.results == 0) {
            for (let i = 0; i < 3; i++) {
                $(`#title-${i}`).text('Sorry, no available business news for this location');
                $(`#image-${i}`).attr('src', "./assets/images/no-news-placeholder.jpeg").addClass('news-image');
                $(`#description-${i}`).text('Why not try searching a different location?');
                $(`#link-${i}`).attr('href', 'https://www.bbc.co.uk/news/business/economy').text('Or, check out the latest global economic news on the BBC website').attr('target', 'blank');
            }
        }

        // If the API returns results, then ...
        else {

            // Save the user's search 
            saveNewsSearch();

            // Render each article title, image, description and link to a corresponding carousel card
            for (let i = 0; i < 3; i++) {

                let title = data.results[i].title;

                // If the article doesn't have an image URL, use a placeholder image

                if (!data.results[i].image_url) {
                    let img = "./assets/images/no-news-placeholder.jpeg"
                    $(`#image-${i}`).attr('src', img).addClass('news-image');
                } else {
                    let img = data.results[i].image_url
                    $(`#image-${i}`).attr('src', img).addClass('news-image');
                }

                let description = data.results[i].description;
                let link = data.results[i].link;
                
                $(`#title-${i}`).text(title);
                $(`#description-${i}`).text(description);
                $(`#link-${i}`).attr('href', link).text('Link to full article').attr('target', 'blank');

                // Clear out the user's search text from the search box
                $('#search-input').val("");
            }
        }
    }

    // Function to save user's search to local storage (if search returns news articles from the API). 
    function saveNewsSearch() {
        let userInput = $('#search-input').val().trim();
        if (userInput !== "") {
            if (!$(`.countryButton:contains('${userInput}')`).length) {
                let countryButton = $('<button>').text(userInput).addClass('countryButton').data('countryName', userInput);
                $('#history').append(countryButton);

                let countriesArray = JSON.parse(localStorage.getItem('countries')) || [];
                countriesArray.push(userInput);

                localStorage.setItem('countries', JSON.stringify(countriesArray));
            }
        }
    }

    // Function to render last five search items from local storage to the page
    function renderHistory() {
        let countriesArray = JSON.parse(localStorage.getItem('countries')) || [];
        let lastFive = countriesArray.slice(-5);
        lastFive.forEach(country => {
            let countryButton = $('<button>').text(country).addClass('countryButton').data('countryName', country);
            $('#history').append(countryButton);

        })
    }


// Event listener and fetch for saved search button - targeting the value on the clicked button.
    $('#history').on('click', '.countryButton', function () {

        $(`#news-heading`).empty();

        let countryName = $(this).data('countryName');
        const newsURL = `https://newsdata.io/api/1/news?apikey=pub_${newsAPIKey}&qInTitle=${countryName}&language=en&category=business&size=3`;

    // Title to show where the news that's being displayed is coming from
        let newsTitle = $('<h5>').text(`Showing business news from: ${countryName}`).addClass('news-location-heading');
        $(`#news-heading`).prepend(newsTitle);

        fetch(newsURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                renderNews(data);
    })
    })

// Event listener to clear local storage & search history buttons
    $('#clear-history-btn').on('click', function () {
        localStorage.clear();
        $('#history').empty();
    })
})