

const flight = {
    trueCouse: 0,
    distanceNM: 0,
    windDirection: 0,
    windSpeed: 0,
    trueAirSpeed: 0,
    groundSpeed: 0,   
    addedTime: 0.0,
    airportIataCodes : {
        destination: '',
        departing: ''
    },
}

// Link Front End

let txtDestinationIata = document.getElementById('destination')
let txtDepartureIata = document.getElementById('departure')
let txtRate = document.getElementById('rate')
let txtTime = document.getElementById('time')
let txtDistance = document.getElementById('distance')
let txtDestLat = document.getElementById('DestLat')
let txtDestLong = document.getElementById('DestLong')
let txtDepLat = document.getElementById('DepLat')
let txtDepLong = document.getElementById('DepLong')

// Calculate Distance d = r * t
let btnCalculate = document.getElementById("calculate")

btnCalculate.addEventListener("click", function(){
    r = txtRate.value
    t = txtTime.value
    d = txtDistance.value
    destIata = txtDestinationIata.value
    departureIata = txtDepartureIata.value

    flight.airportIataCodes["destination"] = destIata
    flight.airportIataCodes["departure"] = departureIata
    flight.trueAirSpeed = r
    flight.time = t
    calculateNaiveDistance(r, t)
    // fetchAirportInformation(destIata)
    // fetchAirportInformation(departureIata)

    // Display Distance Value
    txtDistance.value = flight.distanceNM

});

function calculateFlightTime(){
    
}


function calculateNaiveDistance(r, t){
    let distance = (r * t);
    flight.distanceNM = distance
};

// Fetch Airport Coordinates using https://www.air-port-codes.com/airport-codes-api/
let btnCoordinates = document.getElementById("coord")
btnCoordinates.addEventListener("click", function(){
    destIata = txtDestinationIata.value
    departureIata = txtDepartureIata.value


    // fetchDestinationAirportInformation(destIata)
    // fetchDepartureAirportInformation(departureIata)
    
    fetchAirportInfo(destIata,departureIata)
    // Display Destination
    

});


function fetchAirportInfo(dest,departure){
    fetchDestinationAirportInformation(dest)
    fetchDepartureAirportInformation(departure)
}

var map = L.map('map')

function setMapView(lat,lng){
    map.setView([lat, lng], 13);
}


function fetchDepartureAirportInformation(iata){
    var apcm = new apc('single', {key: '****d486af',secret: '****c1846c5fbb1', limit: 7}) 
    
    // handle successful response
    apcm.onSuccess = function (data) {
    let airport = data.airport.name
    txtDepLat.innerHTML = data.airport.latitude
    txtDepLong.innerHTML = data.airport.longitude
    let elevation = data.airport.elevation

    setMapView(data.airport.latitude,data.airport.longitude)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // var depPoint = L.point(data.airport.latitude,data.airport.longitude)
    L.marker([data.airport.latitude,data.airport.longitude]).addTo(map)

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();
 

    };
 
    // handle response error
    apcm.onError = function (data) {
    console.log(data.message);
    };
 
    // makes the request to get the airport data
    apcm.request(iata);
}

function fetchDestinationAirportInformation(iata){
    var apcm = new apc('single', {key: '****d486af',secret: '****c1846c5fbb1', limit: 7}) 
            
    // handle successful response
    apcm.onSuccess = function (data) {
    let airport = data.airport.name
    txtDestLat.innerHTML = data.airport.latitude
    txtDestLong.innerHTML = data.airport.longitude
    let elevation = data.airport.elevation

    
    L.path([])    
        
    L.marker([data.airport.latitude,data.airport.longitude]).addTo(map)

        };
 

    
// handle response error
    apcm.onError = function (data) {
    console.log(data.message);
    };

 
// makes the request to get the airport data
    apcm.request(iata);
};







