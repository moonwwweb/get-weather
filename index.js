async function getWeather(){
    
    const cityName = document.getElementById("cityInput").value.toLowerCase()
    const apiKey = "977d62d9c3ac6077de00d3f1db80f660"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)

        if (response.ok){
            displayWeather(data)
        }else{
            document.getElementById("result").innerHTML = "<h1>City not found<h1>"
        }
        
    } catch (error) {
        document.getElementById("result").innerHTML = "<h1>Error Fetching Data!<h1>"
        console.error(error)
    }

    document.getElementById("cityInput").value = ""

    
}

function displayWeather(data){
    const weatherBox = document.getElementById("result");
    weatherBox.innerHTML = ''
    const {name : city, 
        main : {temp, humidity},
        weather:[{description, id}],
        sys:{country}
    } = data;
    
    const cityDisplay = document.createElement('h1')
    cityDisplay.classList.add("cityName")
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descriptionDisplay = document.createElement('p')
    descriptionDisplay.classList.add("lastP")
    const weatherSymbol = document.createElement('h2')
    weatherSymbol.classList.add("weatherSymbols")

    cityDisplay.textContent = `${city}, (${country})`
    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descriptionDisplay.textContent = description
    weatherSymbol.textContent = getWeatherSymbol(id)

    weatherBox.appendChild(cityDisplay)
    weatherBox.appendChild(tempDisplay)
    weatherBox.appendChild(humidityDisplay)
    weatherBox.appendChild(descriptionDisplay)
    weatherBox.appendChild(weatherSymbol)
    

}

function getWeatherSymbol(weatherId) {
    switch (true) {
        case weatherId >=200 && weatherId <=232:
            return "🌩️"
        case weatherId >=300 && weatherId <=321:
            return "🌧️"
        case weatherId >=500 && weatherId <=504:
            return "🌦️"
        case weatherId ==511 :
            return "❄️"
        case weatherId >=520 && weatherId <=531:
            return "🌧️"
        case weatherId >=600 && weatherId <=622:
            return "❄️"
        case weatherId >=701 && weatherId <=781:
            return "🌫️"
        case weatherId == 800:
            return "☁️"
        case weatherId >=801 && weatherId <=804:
            return "☁️"
            
        default:
            return "❓"

    }
}

document.getElementById("getWeather").addEventListener("click", getWeather)