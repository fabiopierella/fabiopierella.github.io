// Initialize the map
var map = L.map('map').setView([55.783, 12.518], 13);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a blue dot for the current location
var currentLocationMarker = L.circleMarker([55.783, 12.518], {
    color: 'blue',
    radius: 10
}).addTo(map);

// Define locations
var locations = [
    { lat: 55.784, lng: 12.519, name: 'Location 1' },
    { lat: 55.785, lng: 12.520, name: 'Location 2' },
    { lat: 55.786, lng: 12.521, name: 'Location 3' }
];

// Add markers for each location
locations.forEach(function(location, index) {
    L.marker([location.lat, location.lng]).addTo(map)
        .bindPopup(location.name);
});

// Function to show a specific location
function showLocation(index) {
    var location = locations[index - 1];
    map.setView([location.lat, location.lng], 15);
}

// Function to update the current location marker
function updateCurrentLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    currentLocationMarker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);
}

// Watch the current location from the browser
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateCurrentLocation, function(error) {
        console.error("Error getting location: ", error);
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}
