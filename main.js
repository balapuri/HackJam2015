// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(10, 50, window.innerWidth, window.innerHeight);

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(50, 40, 30);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#fff");

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff");