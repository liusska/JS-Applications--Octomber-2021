function attachEvents() {
    let getWeatherBtn = document.getElementById('submit');
    getWeatherBtn.addEventListener('click', getWeatherHandler);
    let locationInput = document.getElementById('location');

    let conditions = {
        'Sunny': () => '☀',
        'Partly sunny': () => '⛅',
        'Overcast': () => '☁',
        'Rain': () => '☂'
    }

    function getWeatherHandler() {
        let forecastContainer = document.getElementById('forecast');
        forecastContainer.style.display = 'block';
        let currentForecastContainer = document.querySelector('#current');
        Array.from(currentForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        let upcomingForecastContainer = document.querySelector('#upcoming');
        Array.from(upcomingForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(body => body.json())
            .then(locations => {
                let locationName = locationInput.value;
                let location = locations.find(el => el.name === locationName);
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                    .then(body => body.json())
                    .then(currentWeatherReport => ({code: location.code, currentWeatherReport}));
            })
            .then(({code, currentWeatherReport}) => {
                let htmlReport = createCurrentWeatherElement(currentWeatherReport);

                currentForecastContainer.appendChild(htmlReport);

                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            })
            .then(x => x.json())
            .then(upcommingWeatherReport => {
                console.log(upcommingWeatherReport);
                let upcomingForecast = createUpcommingWeatherElement(upcommingWeatherReport);
                upcomingForecastContainer.appendChild(upcomingForecast);
            })
            .catch(err => {
                let errorDiv = document.createElement('div');
                errorDiv.classList.add('label');
                errorDiv.textContent = 'Error';
                currentForecastContainer.appendChild(errorDiv);
            });

        function createUpcommingWeatherElement(weatherReport) {
            let forecastInfoDiv = document.createElement('div');
            forecastInfoDiv.classList.add('forecast-info');

            let day1html = createDayReport(weatherReport.forecast[0]);
            let day2html = createDayReport(weatherReport.forecast[1]);
            let day3html = createDayReport(weatherReport.forecast[2]);

            forecastInfoDiv.appendChild(day1html);
            forecastInfoDiv.appendChild(day2html);
            forecastInfoDiv.appendChild(day3html);
            return forecastInfoDiv;

        }

        function createDayReport(forecast) {
            let upcomingSpan = document.createElement('span');
            upcomingSpan.classList.add('upcoming');

            let symbolSpan = document.createElement('span');
            symbolSpan.classList.add('symbol');
            symbolSpan.textContent = conditions[forecast.condition]();

            let temperatureSpan = document.createElement('span');
            temperatureSpan.classList.add('forecast-data')
            temperatureSpan.textContent = `${forecast.low}°/${forecast.high}°`;

            let weatherSpan = document.createElement('span');
            weatherSpan.classList.add('forecast-data')
            weatherSpan.textContent = forecast.condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(temperatureSpan);
            upcomingSpan.appendChild(weatherSpan);

            return upcomingSpan;

        }

        function createCurrentWeatherElement(weatherReport) {
            let forecastDiv = document.createElement('div');
            forecastDiv.classList.add('forecasts');

            let conditionSymbolSpan = document.createElement('span');
            conditionSymbolSpan.classList.add('condition', 'symbol');
            conditionSymbolSpan.textContent = conditions[weatherReport.forecast.condition]();

            let conditionSpan = document.createElement('span');
            conditionSpan.classList.add('condition');

            let nameSpan = document.createElement('span');
            nameSpan.classList.add('forecast-data')
            nameSpan.textContent = weatherReport.name;

            let temperatureSpan = document.createElement('span');
            temperatureSpan.classList.add('forecast-data')
            temperatureSpan.textContent = `${weatherReport.forecast.low}°/${weatherReport.forecast.high}°`;

            let weatherSpan = document.createElement('span');
            weatherSpan.classList.add('forecast-data')
            weatherSpan.textContent = weatherReport.forecast.condition;

            conditionSpan.appendChild(nameSpan);
            conditionSpan.appendChild(temperatureSpan);
            conditionSpan.appendChild(weatherSpan);

            forecastDiv.appendChild(conditionSymbolSpan);
            forecastDiv.appendChild(conditionSpan);
            return forecastDiv;
        }
    }
}

attachEvents();