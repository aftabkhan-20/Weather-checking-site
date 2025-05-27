
const apiKey = "1e3b8b5f7f694e1a9a2144815232705";

async function getWeather(city = null) {
  const cityInput = city || document.getElementById("cityInput").value.trim();
  if (!cityInput) return;

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("weatherData").innerHTML = "<p>City not found or error fetching data.</p>";
      return;
    }

    document.getElementById("weatherData").innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="icon"/>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Humidity: ${data.current.humidity}%</p>
    `;
  } catch (err) {
    document.getElementById("weatherData").innerHTML = "<p>Error fetching weather data.</p>";
  }
}
