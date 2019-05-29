requirejs(['smoothScroll'], function(SmoothScroll) {
  var scroll = new SmoothScroll('a[href*="#"]', {
    header: 'nav.navbar',
  });
});
