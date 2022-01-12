const api = {
  key: "577c69d1405a1e62ddeac7f2f328337e",
  base: "https://api.openweathermap.org/data/2.5/",
};
const input = document.querySelector(".search-box");
input.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(input.value);
  } 
}

function getResults(query="", lat="", long="") {
  let urlQuery = query? `${api.base}forecast?q=${query}&units=metric&appid=${api.key}`: 
  `${api.base}forecast?units=metric&lat=${lat}&lon=${long}&appid=${api.key}`
  fetch(urlQuery)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}


 function displayResults (weather) {
  console.log(weather)
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.city.name}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp")
  temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>\xB0C</span> <br> ${Math.round((weather.list[0].main.temp)* 9/5+32)}<span>\xB0F</span>`
  
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = "The sky in "+ weather.city.name + " " + weather.list[0].weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `<p>Whit min& max<p>${Math.round(weather.list[0].main.temp_min)}\xB0C/ ${Math.round(weather.list[0].main.temp_max)}\xB0C <br> ${Math.round((weather.list[0].main.temp_min)* 9/5+32)}\xB0F/${Math.round((weather.list[0].main.temp_max)* 9/5+32)}<span>\xB0F</span>`; 


  day1.innerHTML = `<p>day1<p> ${weather.list[5].main.temp_min}\xB0C / ${weather.list[5].main.temp_max}\xB0C` ;
  day2.innerHTML = `<p>day2<p> ${weather.list[13].main.temp_min}\xB0C / ${weather.list[13].main.temp_max}\xB0C` ;
  day3.innerHTML = `<p>day3<p> ${weather.list[21].main.temp_min}\xB0C / ${weather.list[21].main.temp_max}\xB0C` ;
  day4.innerHTML = `<p>day4<p> ${weather.list[29].main.temp_min}\xB0C / ${weather.list[29].main.temp_max}\xB0C` ;
  day5.innerHTML = `<p>day5<p> ${weather.list[36].main.temp_min}\xB0C / ${weather.list[36].main.temp_max}\xB0C` ;
}

function dateBuilder(d) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()] 
  let date = d.getDate() 
    if (date < 10) 
      date = "0"+d.getDate()
  let month = d.getMonth()+1;
  let year = d.getFullYear(); 

  return `${day} ${date}.${month}.${year}`
}

window.onload = function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser"
    } 
}

function showPosition(position) {
    var lat = position.coords.latitude;
     var lon = position.coords.longitude;
getResults("",lat,lon)
}