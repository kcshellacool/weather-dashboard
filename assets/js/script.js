var history123 = [];
var pulllist = [];

var pulllist = JSON.parse(localStorage.getItem("history")) || [];
        
var searchhistory = document.createElement("div");
searchhistory.setAttribute("class","historylist")
document.getElementById("container").appendChild(searchhistory);

for (let i = 0; i < pulllist.length; i++) {
    var listbutton = document.createElement("button");
    listbutton.innerHTML = pulllist[i];
    listbutton.setAttribute("onclick","research()");
    listbutton.setAttribute("id",pulllist[i]);

    searchhistory.appendChild(listbutton);

}

function search() {

    var APIKEY = '977aaca33e217d2e5b67fea5def2010e';

    var cityname = document.querySelector("#city-name").value;
    
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&appid=' + APIKEY +'&units=metric')
    .then (response => response.json())
    .then (function(response) {

        console.log(response)

        var latvalue = response.coord.lat;
        var lonvalue = response.coord.lon;
        var cityoutput = response.name;

        // pull storage
        var pulllist = JSON.parse(localStorage.getItem("history")) || [];

        pulllist.push(cityoutput); 
        
        // update storage
        localStorage.setItem("history",JSON.stringify(pulllist));
        
        
        // var searchhistory = document.createElement("div");
        // searchhistory.setAttribute("class","historylist")
        // document.getElementById("container").appendChild(searchhistory);
        searchhistory.innerHTML = "";
        
        for (let i = 0; i < pulllist.length; i++) {
            var listbutton = document.createElement("button");
            listbutton.innerHTML = pulllist[i];
            listbutton.setAttribute("onclick","research()");
            listbutton.setAttribute("id",pulllist[i]);

            
            searchhistory.appendChild(listbutton);

        }

        
    
    
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ latvalue + '&lon=' + lonvalue + '&units=metric&appid=' + APIKEY)
    .then (response =>response.json())
    .then (function(response){
        
        console.log(response)
        var tempvalue = response.current.temp;
        var windvalue = response.current.wind_speed;
        var humidvalue = response.current.humidity;
        var uvindex = response.current.uvi;

        /*check uvindex grade*/
        if (uvindex <3 ) {
            var grade = 1;
            document.getElementById("uv-index").style.backgroundColor = "lightgreen";
        }
        else if (uvindex <6) {
            var grade = 2;
            document.getElementById("uv-index").style.backgroundColor = "yellow";

        }
        else if (uvindex <8) {
            var grade = 3;
            document.getElementById("uv-index").style.backgroundColor = "orange";

        }
        else if (uvindex <11) {
            var grade = 4;
            document.getElementById("uv-index").style.backgroundColor = "red";

        }

        else {
            var grade = 5;
            document.getElementById("uv-index").style.backgroundColor = "lightpurple";
        }

        document.querySelector("#box1").style.display = "block";

        document.getElementById("city-name").value = "";
        document.getElementById("city-display").innerHTML = cityoutput;
        document.getElementById("temp").innerHTML = ' ' + tempvalue + ' &#176;C';
        document.getElementById("wind").innerHTML = ' ' + windvalue + ' MPH';
        document.getElementById("humidity").innerHTML = ' ' + humidvalue + ' %';
        document.getElementById("uv-index").innerHTML = ' ' + uvindex;

        var icontoday = document.getElementById("icontoday");
        icontoday.setAttribute("src", "http://openweathermap.org/img/wn/"+ response.current.weather[0].icon + "@2x.png");

        console.log(response.daily[0].dt)

        /*get 5-day forecast*/

        document.querySelector(".forecast-cards").style.display = "flex";
        
        for (let i = 0; i < 5; i++) {
            var datetitle = document.createElement("h3");
            var fcd = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US");

            datetitle.innerHTML = fcd;
            var fcicon = document.createElement("img");
            fcicon.setAttribute("src", "http://openweathermap.org/img/wn/"+ response.daily[i].weather[0].icon + "@2x.png");

            var fctemp = document.createElement("p")
            fctemp.innerHTML = 'Temp: ' + response.daily[i].temp.day + ' &#176;C';
            var fcwind = document.createElement("p");
            fcwind.innerHTML = 'Wind: ' + response.daily[i].wind_speed + ' MPH';
            var fchumid = document.createElement("p");
            fchumid.innerHTML = 'Humidity: ' + response.daily[i].humidity + ' %';
            
            var parentdiv = document.getElementById("day-"+i);
            parentdiv.innerHTML = "";
            parentdiv.appendChild(datetitle);
            parentdiv.appendChild(fcicon);
            parentdiv.appendChild(fctemp);
            parentdiv.appendChild(fcwind);
            parentdiv.appendChild(fchumid);

            
        }



    })
})
}


function research() {

    var APIKEY = '977aaca33e217d2e5b67fea5def2010e';

    var cityname = event.target.id;
    console.log(event.target.id)
    
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&appid=' + APIKEY +'&units=metric')
    .then (response => response.json())
    .then (function(response) {

        console.log(response)

        var latvalue = response.coord.lat;
        var lonvalue = response.coord.lon;
        var cityoutput = response.name;

        
    
    
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ latvalue + '&lon=' + lonvalue + '&units=metric&appid=' + APIKEY)
    .then (response =>response.json())
    .then (function(response){
        
        console.log(response)
        var tempvalue = response.current.temp;
        var windvalue = response.current.wind_speed;
        var humidvalue = response.current.humidity;
        var uvindex = response.current.uvi;

        /*check uvindex grade*/
        if (uvindex <3 ) {
            var grade = 1;
            document.getElementById("uv-index").style.backgroundColor = "lightgreen";
        }
        else if (uvindex <6) {
            var grade = 2;
            document.getElementById("uv-index").style.backgroundColor = "yellow";

        }
        else if (uvindex <8) {
            var grade = 3;
            document.getElementById("uv-index").style.backgroundColor = "orange";

        }
        else if (uvindex <11) {
            var grade = 4;
            document.getElementById("uv-index").style.backgroundColor = "red";

        }

        else {
            var grade = 5;
            document.getElementById("uv-index").style.backgroundColor = "lightpurple";
        }

        document.querySelector("#box1").style.display = "block";

        document.getElementById("city-name").value = "";
        document.getElementById("city-display").innerHTML = cityoutput;
        document.getElementById("temp").innerHTML = ' ' + tempvalue + ' &#176;C';
        document.getElementById("wind").innerHTML = ' ' + windvalue + ' MPH';
        document.getElementById("humidity").innerHTML = ' ' + humidvalue + ' %';
        document.getElementById("uv-index").innerHTML = ' ' + uvindex;

        var icontoday = document.getElementById("icontoday");
        icontoday.setAttribute("src", "http://openweathermap.org/img/wn/"+ response.current.weather[0].icon + "@2x.png");

        console.log(response.daily[0].dt)

        /*get 5-day forecast*/

        document.querySelector(".forecast-cards").style.display = "flex";
        
        for (let i = 0; i < 5; i++) {
            var datetitle = document.createElement("h3");
            var fcd = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US");

            datetitle.innerHTML = fcd;
            var fcicon = document.createElement("img");
            fcicon.setAttribute("src", "http://openweathermap.org/img/wn/"+ response.daily[i].weather[0].icon + "@2x.png");

            var fctemp = document.createElement("p")
            fctemp.innerHTML = 'Temp: ' + response.daily[i].temp.day + ' &#176;C';
            var fcwind = document.createElement("p");
            fcwind.innerHTML = 'Wind: ' + response.daily[i].wind_speed + ' MPH';
            var fchumid = document.createElement("p");
            fchumid.innerHTML = 'Humidity: ' + response.daily[i].humidity + ' %';
            
            var parentdiv = document.getElementById("day-"+i);
            parentdiv.innerHTML = "";
            parentdiv.appendChild(datetitle);
            parentdiv.appendChild(fcicon);
            parentdiv.appendChild(fctemp);
            parentdiv.appendChild(fcwind);
            parentdiv.appendChild(fchumid);

            
        }



    })
})
}


function clearstuff() {
    localStorage.clear();
    searchhistory.innerHTML = "";
}