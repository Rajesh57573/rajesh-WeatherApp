const APIkey = "e397877b49f88ae504d4bcdd416a511b";

async function GetWeather() {
  const city = document.getElementById('cityinput').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayweather(data);
  }
  catch (error) {
    console.error("Failed to fetch Weather Data:", error);
    alert("Failed to fetch Weather Data.");
  }
}

function displayweather(data) {
  const { 
    main: { temp, humidity }, weather, 
    wind: { speed }, 
    sys: { country }, 
    name
  } = data;
  
  const [{ main: weatherMain, description, icon }] = weather;
  const weatherDisplay = document.getElementById('weatherDisplay');
  if (data.cod !== 200) {
    weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  } 

  const weatherHTML = `
    <h3 class="city-name">Weather in ${name}, ${country}</h3>
    <p class="temperature"> ${temp}°C</p>
    <div class="weather-description">
      <p><span class="main-condition">Weather: </span>${weatherMain} (${description})</p>
      <p><span class="main-condition">Humidity: </span>${humidity}%</p>
      <p><span class="main-condition">Wind: </span>${speed} m/s<p>
      <img src = "https://openweathermap.org/img/w/${icon}.png" alt="Weather icon" width = "70" height = "70">
    </div>
  `;
  weatherDisplay.innerHTML = weatherHTML;
}