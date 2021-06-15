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
            document.getElementById("uv-index").style.backgroundColor = "lightyellow";

        }
        else if (uvindex <8) {
            var grade = 3;
            document.getElementById("uv-index").style.backgroundColor = "lightorange";

        }
        else if (uvindex <11) {
            var grade = 4;
            document.getElementById("uv-index").style.backgroundColor = "lightgreen";

        }

        else {
            var grade = 5;
            document.getElementById("uv-index").style.backgroundColor = "lightpurple";
        }


        document.getElementById("city-name").value = "";
        document.getElementById("city-display").innerHTML = cityoutput;
        document.getElementById("temp").innerHTML = ' ' + tempvalue + ' &#176;C';
        document.getElementById("wind").innerHTML = ' ' + windvalue + ' MPH';
        document.getElementById("humidity").innerHTML = ' ' + humidvalue + ' %';
        document.getElementById("uv-index").innerHTML = ' ' + uvindex;
        


    })
})
}