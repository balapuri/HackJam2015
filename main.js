// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(10, 50, window.innerWidth, window.innerHeight);

// Creates circle at x = 50, y = 40, with radius 10
//TODO: redraw on window rescale.

buildCloud(window.innerWidth-460, 10, 0)
buildCloud(window.innerWidth-200, 50, 0)
buildCloud(130, 50, 4)
buildCloud(280, 10, 2)
buildCloud(490, 60, 3)

circle = paper.circle(window.innerWidth-250, 60, 50)
circle.attr("fill", "#FFFF85")
circle.attr("stroke", "#FFFF85")
// animateSun(circle)

function cloudCircle (x, y, r) {
	circle = paper.circle(x, y, r)
	circle.attr("fill", "#fff")
	circle.attr("stroke", "#fff")
	return circle
}

function buildCloud (x, y, r) {
	var circle = cloudCircle(x + 50, y +40, 20 +r);
	var circle2 = cloudCircle(x + 79, y + 18, 18+r);
	var circle3 = cloudCircle(x + 24, y +45, 15+r);
	var circle4 = cloudCircle(x + 80, y +40, 20+r);
	var circle5 = cloudCircle(x + 105,y + 37, 20+r);
	var circle6 = cloudCircle(x + 130,y + 44, 15+r);
}

// cloudAnimation = Raphael.animation({x: 1000}, 10000, "easeOut");

var animateSun = Raphael.animation({fill: "#FFFF66", stroke: "#FFE271", "stroke-width": 25, "stroke-opacity": 0.5}, 3000, "linear", resetSun(circle)).repeat(Infinity);
circle.animate(animateSun)
// function animateSun (circle){
// 	circle.animate({fill: "#FFFF66", stroke: "#FFE271", "stroke-width": 20, "stroke-opacity": 0.5}, 1000, "linear", resetSun(this));
// }

function resetSun (circle) {
	// circle.animate({fill: "#FFFF85", stroke: "#FFE271", "stroke-width": 2, "stroke-opacity": 1}, 5000, "linear")
}

