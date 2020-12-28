requirejs(['leaflet/leaflet', 'leaflet.ChineseTmsProviders'], function (L) {
  var map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: false
  });

  L.tileLayer.chinaProvider('Google.Normal.Map', {}).addTo(map);

  var locations = [
    { name: { en: 'Hong Kong',   ch: '香港'},           id: 'hong-kong',  lat: 22.285751, lng: 114.151216 },
    { name: { en: 'Shanghai',    ch: '上海'},           id: 'shanghai',   lat: 31.216116, lng: 121.431984 },
    { name: { en: 'Beijing',     ch: '北京'},           id: 'beijing',    lat: 39.921755, lng: 116.441423 },
    { name: { en: 'Shenzhen',    ch: '深圳'},           id: 'shenzhen',   lat: 22.540302, lng: 114.038560 },
    { name: { en: 'Malaysia',    ch: '马来西亚，吉隆坡'}, id: 'malaysia',   lat: 3.0648183, lng: 101.608208 },
    { name: { en: 'Philippines', ch: '菲律宾，马尼拉'},  id: 'philippines', lat: 14.583366, lng: 121.051311 },
    { name: { en: 'India',       ch: '印度，班加罗尔'},  id: 'india',       lat: 13.026855, lng: 77.6307368 }
  ];

  var bounds = [
    [Infinity, Infinity], // Top left
    [-Infinity, -Infinity] // Bottom Right
  ];


  locations.forEach(function(location) {
    new L.Marker([location.lat, location.lng]).addTo(map).bindPopup('<a href="#' + location.id + '">' + location.name[IHD_PAGE_LANG] + '</a>');
    bounds[0][0] = Math.min(bounds[0][0], location.lat);
    bounds[0][1] = Math.min(bounds[0][1], location.lng);
    bounds[1][0] = Math.max(bounds[1][0], location.lat);
    bounds[1][1] = Math.max(bounds[1][1], location.lng);
  });
  map.fitBounds(bounds);
});
