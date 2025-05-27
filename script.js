async function getWeather() {
  const city = document.getElementById("cityDropdown").value;
  const apiKey = "fe22775a50f4b53a43b16c804fd8f6ff";

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`;

  try {
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
      <h2>${currentData.name}, ${currentData.sys.country}</h2>
      <p><strong>${currentData.weather[0].main}</strong> - ${currentData.weather[0].description}</p>
      <p>Temperature: ${currentData.main.temp}°C</p>
      <p>Humidity: ${currentData.main.humidity}%</p>
      <p>Wind: ${currentData.wind.speed} m/s</p>
    `;

    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    const forecastBox = document.getElementById("forecast");
    forecastBox.innerHTML = "<h3>7-Day Forecast</h3>";

    if (forecastData.list) {
      forecastData.list.forEach(day => {
        const date = new Date(day.dt * 1000);
        forecastBox.innerHTML += `
          <div class="forecast-day">
            <strong>${date.toDateString()}</strong><br/>
            ${day.weather[0].main} - ${day.weather[0].description}<br/>
            Temp: ${day.temp.day}°C<br/>
            Humidity: ${day.humidity}%
          </div>
        `;
      });
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "<p>Error fetching weather data.</p>";
  }
}