// Creates canvas
var paper = Raphael(0, 50, window.innerWidth, window.innerHeight);

// global variables
var left = -1;
var soil = null;
var leaves = [];
var yoffset = 100;
var x_control_offset = 20;
var x = Math.floor(window.innerWidth * 0.5);
var y = Math.floor(window.innerHeight* 0.7);
var newx = x;
var newy = y-yoffset;
var controlx = x-x_control_offset;
var controly = Math.floor(newy + (y-newy)/2);

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

var createSoil = function(soil) {
	var x = 0;
	var w = window.innerWidth;
	var h = Math.floor(window.innerHeight * 0.3);
	var y = Math.floor(window.innerHeight * 0.7);
	if (soil != null) {
		soil.remove();
	}
	soil = paper.rect(x, y, w, h);
	soil.attr("fill", "90-#4D1D09-#8C5037");
	soil.attr("stroke", "90-#4D1D09-#8C5037");
	
	var radius = 0;
	for (var i = 0; i < w; i+= radius) { 
		radius = Math.floor(Math.random() * 10);
		var c = paper.circle(x, y, radius);
		x += radius;
		c.attr("fill", "#8C5037");
		c.attr("stroke", "#8C5037");
	}
}

var updateXY = function () {
	x = x;
	y = newy;
	yoffset = Math.floor(yoffset * 0.6);
	newy = y-yoffset;
	x_control_offset = Math.floor(x_control_offset * -0.5);
	controlx = x-x_control_offset;
	controly = Math.floor(newy + (y-newy)/2);
	left *= -1;
}

var growPlant = function(left, flowr) {
	var s = 'M' + x + ' ' + y + 'Q' + controlx + ' ' + controly + ' ' + newx + ' ' + newy;
	console.log(s);
	// var c = paper.path(s);
	attr = {"stroke": "#2c7", "stroke-width": 10};
	var triangleString = 'M' + 
	drawpath(paper, s, 1000, attr, function(){
		if (flowr) {
			var w = 100;
			var h = 100;
			// var leaf = paper.path(leafString(Math.floor(newx-w/2), Math.floor(newy-w/2), w, h,true));
			var leaf = paper.path(rainDrop(newx, newy, w, h,true));		
			var trans = Math.floor(-1 * leaf.getBBox().height + 5);
			var rot = 45 * left;
			leaf.transform("r"+rot+"t"+0+","+trans);
			leaf.attr("fill", "#2c7");
			leaf.attr("stroke", "#2c7");
			leaves.push(leaf);
			updateXY();
		}
		else {
			updateXY();
			petal = paper.circle(x, y-20, 10);
			petal.attr("fill", "#FFAEB9");
			petal.attr("stroke", "#FFAEB9");
			petal = paper.circle(x-10, y-10, 10);
			petal.attr("fill", "#FFAEB9");
			petal.attr("stroke", "#FFAEB9");
			petal = paper.circle(x+10, y-10, 10);
			petal.attr("fill", "#FFAEB9");
			petal.attr("stroke", "#FFAEB9");
			petal = paper.circle(x, y, 10);
			petal.attr("fill", "#FFAEB9");
			petal.attr("stroke", "#FFAEB9");
			circle = paper.circle(x, y-10, 10);
			circle.attr("fill", "#ff0");
			circle.attr("stroke", "#ff0");
		}});
}

var rainDrop = function(x, y, w, h) {
	var cx1 = Math.floor(x-(w)/2);
	var cy1 = Math.floor(y+(h)/2);
	var cx2 = Math.floor(x+(w)/2);
	var cy2 = Math.floor(y+(h)/2);
	var newx = x;
	var newy = y + h;
	var s = 'M' + x + ' ' + y + 'C' + cx1 + ' ' + cy1 + ' ' + cx2 + ' ' + cy2 + ' ' + x + ' ' + y;
	return s;
}

var leafString = function(x, y, w, h, left) {
	var cx1 = x;
	var cy1 = Math.floor(y+(w)/2);
	var cx2 = Math.floor(x+(w)/2);
	var cy2 = y;
	var newx = x;
	var newy = y + h;
	var s = 'M' + x + ' ' + y + 'C' + cx1 + ' ' + cy1 + ' ' + cx2 + ' ' + cy2 + ' ' + x + ' ' + y;
	console.log(s);
	return s;
} 

/* 
 * Copied method from some dude
 */
function drawpath( canvas, pathstr, duration, attr, callback )
{
    var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
    var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
    var total_length = guide_path.getTotalLength( guide_path );
    var last_point = guide_path.getPointAtLength( 0 );
    var start_time = new Date().getTime();
    var interval_length = 50;
    var result = path;        

    var interval_id = setInterval( function()
    {
        var elapsed_time = new Date().getTime() - start_time;
        var this_length = elapsed_time / duration * total_length;
        var subpathstr = guide_path.getSubpath( 0, this_length );            
        attr.path = subpathstr;

        path.animate( attr, interval_length );
        if ( elapsed_time >= duration )
        {
            clearInterval( interval_id );
            if ( callback != undefined ) callback();
                guide_path.remove();
        }                                       
    }, interval_length );  
    return result;
}

var flower = false;

var myLittlePlanty = function() {
	if (yoffset < 60) {
		if (!flower) {
			growPlant( left, false);
			flower = true;
			return;
		}
		else {
			return;
		}
	}
	growPlant( left, true);
}
createSoil(soil);
myLittlePlanty();

var reDrawStuff = function(){
	createSoil(soil);
}


