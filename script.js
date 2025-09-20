async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  // ⚠️ Apna real API key yaha paste karo
  const apiKey = "c4af9e5721f8a3598d5b068cb88749e7";

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("❌ City not found. Try like 'Kota,IN'");
      } else if (response.status === 401) {
        throw new Error("⚠️ Invalid API key! Please check your OpenWeather key.");
      } else {
        throw new Error("Something went wrong. Try again!");
      }
    }

    const data = await response.json();

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
