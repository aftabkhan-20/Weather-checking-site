async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${apiKey}&units=metric`);
  const data = await response.json();

  const display = document.getElementById('weatherDisplay');
  if (data.cod !== 200) {
    display.innerHTML = `<p>${data.message}</p>`;
  } else {
    display.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  }
}
