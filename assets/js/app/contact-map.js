requirejs(['leaflet/leaflet', 'leaflet.ChineseTmsProviders'], function (L) {
  var map = L.map('map', {
    zoomControl: false
  });

  L.tileLayer.chinaProvider('Google.Normal.Map', {}).addTo(map);

  var locations = [
    { name: 'Hong Kong',   id: 'hong-kong',   lat: 22.285751, lng: 114.151216 },
    { name: 'Shanghai',    id: 'shanghai',    lat: 31.223229, lng: 121.429183 },
    { name: 'Beijing',     id: 'beijing',     lat: 39.921755, lng: 116.441423 },
    { name: 'Malaysia',    id: 'malaysia',    lat: 3.0026910, lng: 101.539828 },
    { name: 'Philippines', id: 'philippines', lat: 14.583366, lng: 121.051311 },
    { name: 'India',       id: 'india',       lat: 13.026855, lng: 77.6307368 }
  ];

  var bounds = [
    [Infinity, Infinity], // Top left
    [-Infinity, -Infinity] // Bottom Right
  ];


  locations.forEach(function(location) {
    new L.Marker([location.lat, location.lng]).addTo(map).bindPopup('<a href="#' + location.id + '">' + location.name + '</a>');
    bounds[0][0] = Math.min(bounds[0][0], location.lat);
    bounds[0][1] = Math.min(bounds[0][1], location.lng);
    bounds[1][0] = Math.max(bounds[1][0], location.lat);
    bounds[1][1] = Math.max(bounds[1][1], location.lng);
  });
  map.fitBounds(bounds);
});

requirejs(['smoothScroll'], function(SmoothScroll) {
  var scroll = new SmoothScroll('a[href*="#"]', {
    header: 'nav.navbar',
  });
});
