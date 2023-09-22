document.getElementById("get-forecast").addEventListener("click", function () {
    const locationInput = document.getElementById("location-input").value;
    const apiKey = "822d8808cbd6870769fa74f8fd35cbde"; // Replace with your OpenWeatherMap API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locationName = data.name;
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;

            document.getElementById("location-name").textContent = locationName;
            document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
            document.getElementById("weather-image").src = `http://openweathermap.org/img/w/${weatherIcon}.png`;

            
            document.getElementById("weather-info").style.display = "block";
            document.getElementById('error-message').classList.add('hidden');
        })
        .catch(error => {
            document.getElementById("error-message").classList.remove('hidden');
            document.getElementById("weather-info").style.display = 'none';
        });
});
