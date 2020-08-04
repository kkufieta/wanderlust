import {foursquareClientId, foursquareClientSecret, openWeatherKey} from './config.js';

// Foursquare API Info
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
// const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city
// name}&appid={your api key}';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4')];
const $weatherDiv = $('#weather1');
const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Add AJAX functions here:
const getVenues =
    async () => {
  const city = $input.val()
}

const getForecast =
    () => {

    }


// Render functions
const renderVenues =
    (venues) => {
      $venueDivs.forEach(($venue, index) => {
        // Add your code here:

        let venueContent = '';
        $venue.append(venueContent);
      });
      $destination.append(`<h2>${venues[0].location.city}</h2>`);
    }

const renderForecast =
    (day) => {
      // Add your code here:

      let weatherContent = '';
      $weatherDiv.append(weatherContent);
    }

const executeSearch =
    () => {
      $venueDivs.forEach(venue => venue.empty());
      $weatherDiv.empty();
      $destination.empty();
      $container.css('visibility', 'visible');
      getVenues()
      getForecast()
      return false;
    }

          $submit.click(executeSearch)