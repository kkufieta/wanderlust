import {foursquareClientId, foursquareClientSecret, openWeatherKey} from './config.js';

// Foursquare API Info
const foursquareUrl = 'https://api.foursquare.com/v2/venues';

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

const getVenues =
    async () => {
  const city = $input.val()
  const urlToFetch = `${foursquareUrl}/explore?near=${
      city}&limit=10&client_id=${foursquareClientId}&client_secret=${
      foursquareClientSecret}&v=20200801`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues =
          jsonResponse.response.groups[0].items.map(item => item.venue);
      renderVenues(venues);
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
}

const getForecast =
    async () => {
  const city = $input.val()
  const urlToFetch = `${weatherUrl}?q=${city}&appid=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const forecast = await response.json();
      renderForecast(forecast)
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
}

// Render functions
const renderVenues =
    (venues) => {
      $venueDivs.forEach(($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueIconLink = venueIcon.prefix + 'bg_32' + venueIcon.suffix;
        const address = venue.location.formattedAddress;
        const location = {
          'address': address[0],
          'city': address[1],
          'country': address[2]
        };
        const venueContent =
            createVenueHTML(venue.name, location, venueIconLink)
        $venue.append(venueContent);
      });
      $destination.append(`<h2>${venues[0].location.city}</h2>`);
    }

const renderForecast =
    (day) => {
      const weatherContent = createWeatherHTML(day)
      $weatherDiv.append(weatherContent);
    }

const executeSearch =
    () => {
      $venueDivs.forEach(venue => venue.empty());
      $weatherDiv.empty();
      $destination.empty();
      $container.css('visibility', 'visible');
      getVenues();
      getForecast();
      return false;
    }

          $submit.click(executeSearch)