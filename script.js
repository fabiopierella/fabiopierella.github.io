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
    { lat: 55.68634412924957, lng: 12.097581363876735, name: 'Vestas V52 turbine'},
    { lat: 55.68706232885536, lng: 12.097898149813245, name: 'Measurement Instruments and LiDARS' },
    { lat: 55.68771026985759, lng: 12.099745561102958, name: 'Large Scale Facility (LSF)' },
    { lat: 55.69162080922385, lng: 12.102136334429295, name: 'Composite Materials Lab (COM)' }    
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
