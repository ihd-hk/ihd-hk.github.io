requirejs(['leaflet/leaflet', 'leaflet.ChineseTmsProviders'], function (L) {
  var map = L.map('map', {
    zoomControl: false
  });

  L.tileLayer.chinaProvider('Google.Normal.Map', {}).addTo(map);

  var locations = [
    { name: 'Hong Kong', lat: 22.285751, lng: 114.151216 },
    { name: 'Shanghai', lat: 31.223229, lng: 121.429183 },
    { name: 'Beijing', lat: 39.944872, lng: 116.440303 },
    { name: 'Malaysia', lat: 3.002691, lng: 101.539828 },
    { name: 'Phillipines', lat: 14.583366, lng: 121.051311 },
    { name: 'India', lat: 19.115796, lng: 72.887422 }
  ];

  var bounds = [
    [Infinity, Infinity], // Top left
    [-Infinity, -Infinity] // Bottom Right
  ];


  locations.forEach(function(location) {
    new L.Marker([location.lat, location.lng]).addTo(map).bindPopup(location.name);
    bounds[0][0] = Math.min(bounds[0][0], location.lat);
    bounds[0][1] = Math.min(bounds[0][1], location.lng);
    bounds[1][0] = Math.max(bounds[1][0], location.lat);
    bounds[1][1] = Math.max(bounds[1][1], location.lng);
  });
  map.fitBounds(bounds);
});