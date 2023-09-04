let city="Tokyo";
const apiKey = `0323eec9be03bbc903f4424d6cbbbb67`;

const form = document.getElementById('form');
const search = document.getElementById('search');

function setData() {
    showWeather();
}

async function showWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        showDataToUI(data);
    } catch (error) {
        console.log(error);
    }
}

function showDataToUI(data) {
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const weather = document.getElementById('weather');
    const status = document.getElementById('status');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    city.innerText = data.name;
    state.innerText = data.sys.country;
    // Temp
    weather.children[0].innerHTML= calculate(data.main.temp) + " C&deg;";
    // Max Min
    weather.children[1].innerHTML = `min : ${calculate(data.main.temp_min)} C&deg;, max : ${calculate(data.main.temp_max)} C&deg;`
    status.innerText = data.weather[0].main;
    humidity.innerText = "Humidity :" + data.main.humidity;
    wind.innerText = "Wind Speed :" + data.wind.speed;
}

function calculate(k) {
    return parseInt(k-275);
}

function callDataAPI(e) {
    e.preventDefault();
    city = search.value;
    showWeather();
    search.value = ``;
}
form.addEventListener('submit',callDataAPI);
setData();