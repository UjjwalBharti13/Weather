const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector(".Search");

// Event listener
searchBtn.addEventListener("click", async function () {
    const location = searchInput.value;
    if (location !== "") {
        // Fetch weather data
        const data = await fetchWeather(location);
        
        // Update DOM with fetched data
        if (data != null) {
            updateDOM(data);
        }
        searchInput.value = "";
    }
});

const tempratureElem = document.querySelector(".temprature");
const countryElem = document.querySelector(".Country");
const locationElem = document.querySelector(".Location");
const conditionElem = document.querySelector(".condition");
const emojiImg = document.querySelector(".weather-icon");  // Updated selector
const dateElem = document.querySelector(".Date");
const timeElem = document.querySelector(".time");

function updateDOM(data) {
    console.log("Updating the DOM with data", data);
    
    const temp = data.current.temp_c;
    const country = data.location.country;
    const location = data.location.name;
    const timeData = data.location.localtime;
    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;

    tempratureElem.textContent = temp + "°C";
    countryElem.textContent = country;
    locationElem.textContent = location;
    conditionElem.textContent = condition;
    dateElem.textContent = date;
    timeElem.textContent = time;
    emojiImg.src = iconLink;
}

async function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=8bdc457057024ff7bc3173828241607&q=${location}&aqi=no`;
    const response = await fetch(url);
    
    if (response.status === 400) {
        alert("Location is invalid");
        return null;
    } else if (response.status === 200) {
        const json = await response.json();
        console.log(json);
        return json;
    }
}
