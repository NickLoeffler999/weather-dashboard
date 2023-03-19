var APIkey = "4e1b1189d39d0dd8c3e37af296f4105d";

var searchFormEl = document.querySelector('#search-button');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-value').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    console.log("You Submitted");
    getAPIData(searchInputVal)
    getAPI5Data(searchInputVal)
    var localSt = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    localSt.push(searchInputVal)
    localStorage.setItem("weather-dashboard",JSON.stringify(localSt))
    displayLS()
}
displayLS()
function displayLS(){
    var localSt = JSON.parse(localStorage.getItem("weather-dashboard")) || []
    var searchBtList = ""
    for(let i=0;i<localSt.length;i++){
        searchBtList += `
        <button class="showNow btn btn-secondary">${localSt[i]}</button>
        `
    }
    console.log(searchBtList)
    document.querySelector(".history").innerHTML = searchBtList
    var btnElements = document.querySelectorAll(".showNow")
    btnElements.forEach(elem => elem.addEventListener("click",previousSearch))
}
function previousSearch(event){
var city = event.target.textContent
console.log(city)
getAPI5Data(city)
getAPIData(city)
}
function getAPIData(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
    fetch(queryURL)
        .then(result => result.json())
        .then(response => {
            console.log(response)
            document.getElementById("today").innerHTML = `
                <div class="card bg-info" style="width:18rem; height:auto;">
            <div class="card-body">
            <h5 class="card-title">${response.name}</h5>
            <p class="card-text">Temp: ${response.main.temp}</p>
            <p class="card-text">Humidity: ${response.main.humidity}</p>
            <p class="card-text">Wind Speed: ${response.wind.speed}</p>
            <p class="card-text">Weather Description: ${response.weather[0].description}
            
            <img src=" https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" class="card-img-top" alt="...">
    </p>
  
  </div>
</div>
            `
        })
}
function getAPI5Data(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
    fetch(queryURL)
        .then(result => result.json())
        .then(response => {
            console.log(response) // 5 -3 // 24/3 = 8, looping thru 8 - same time every day
            var dayCards = ""
            for (let i = 0; i < response.list.length; i = i + 8) {
                dayCards += `
            <div class="card bg-primary text-white" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${dayjs(response.list[i].dt_txt).format('DD/MM/YYYY')}</h5>
            <p class="card-text">Temp: ${response.list[i].main.temp}</p>
            <p class="card-text">Humidity: ${response.list[i].main.humidity}</p>
            <p class="card-text">Wind Speed: ${response.list[i].wind.speed}</p>
            <p class="card-text">Weather Description: ${response.list[i].weather[0].description}
            
            <img src=" https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png" width="60" height="100" class="card-img-top" alt="...">
    </p>
    
  </div>
</div>
            `
            }
            document.getElementById("forecast").innerHTML = dayCards
        })
}


searchFormEl.addEventListener('click', handleSearchFormSubmit);