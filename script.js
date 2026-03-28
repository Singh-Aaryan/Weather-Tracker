const apiKey = "bbdff7a05434ef3bc266b03d10110d50";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const logs = document.getElementById("logs");

let history = JSON.parse(localStorage.getItem("cityHistory")) || [];

function log(message){

const p = document.createElement("p");
p.textContent = message;
logs.appendChild(p);

}

async function getWeather(){

const city = cityInput.value.trim();

if(!city){
alert("Enter a city name");
return;
}

logs.innerHTML="";

log("Sync Start");
log("[ASYNC] Fetching weather data...");

try{

const response = await fetch(
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
);

log("Promise resolved (Microtask)");

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

log("[ASYNC] Data received");

document.getElementById("city").textContent = data.name;
document.getElementById("temp").textContent = data.main.temp + " °C";
document.getElementById("weather").textContent = data.weather[0].main;
document.getElementById("humidity").textContent = data.main.humidity + "%";
document.getElementById("wind").textContent = data.wind.speed + " m/s";

if(!history.includes(city)){

history.push(city);

localStorage.setItem(
"cityHistory",
JSON.stringify(history)
);

showHistory();

}

}
catch(error){

document.getElementById("city").textContent="City not found";
document.getElementById("temp").textContent="-";
document.getElementById("weather").textContent="-";
document.getElementById("humidity").textContent="-";
document.getElementById("wind").textContent="-";

}

setTimeout(()=>log("setTimeout executed (Macrotask)"),0);

log("Sync End");

}

function showHistory(){

const box = document.getElementById("history");

box.innerHTML="";

history.forEach(city=>{

const span = document.createElement("span");

span.textContent=city;

span.addEventListener("click",()=>{

cityInput.value=city;
getWeather();

});

box.appendChild(span);

});

}

searchBtn.addEventListener("click", getWeather);

showHistory();