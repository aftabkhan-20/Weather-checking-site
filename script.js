
const apiKey = "1e3b8b5f7f694e1a9a2144815232705"; // Using a public demo key

async function getWeather(city = null) {
  const cityInput = city || document.getElementById("cityInput").value;
  if (!cityInput) return;
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`);
  const data = await response.json();
  const container = document.getElementById("weatherData");
  if (data.error) {
    container.innerHTML = "<p>Error fetching weather data.</p>";
  } else {
    container.innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="weather icon"/>
      <p>Temperature: ${data.current.temp_c} °C</p>
      <p>Humidity: ${data.current.humidity}%</p>
    `;
  }
}
