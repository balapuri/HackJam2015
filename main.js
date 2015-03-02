// Creates canvas
var paper = Raphael(0, 50, window.innerWidth, window.innerHeight);

// Creates circle at x = 50, y = 40, with radius 10
//TODO: redraw on window rescale.


var cloud1 = buildCloud(window.innerWidth-460, 10, 0)
var cloud2 = buildCloud(window.innerWidth-200, 50, 0)
var cloud3 = buildCloud(130, 50, 4)
var cloud4 = buildCloud(280, 10, 2)
var cloud5 = buildCloud(490, 60, 3)

cloudArr = [24 + window.innerWidth-460, 24 + window.innerWidth-200, 24 + 130, 24 + 280, 24+490];
cloudHeights = [10, 50, 50, 10, 60]


circle = paper.circle(window.innerWidth-250, 60, 50)
circle.attr("fill", "#FFFF85")
circle.attr("stroke", "#FFFF85")


function cloudCircle (x, y, r) {
	circle = paper.circle(x, y, r)
	circle.attr("fill", "#fff")
	circle.attr("stroke", "#fff")
	return circle
}

function buildCloud (x, y, r) {
	c1 = cloudCircle(x + 50, y +40, 20 +r);
	c2 = cloudCircle(x + 79, y + 18, 18+r);
	c3 = cloudCircle(x + 24, y +45, 15+r);
	c4 = cloudCircle(x + 80, y +40, 20+r);
	c5 = cloudCircle(x + 105,y + 37, 20+r);
	c6 = cloudCircle(x + 130,y + 44, 15+r);
	return [c1, c2, c3, c4, c5, c6]
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

var createSoil = function(redraw) {
	var x = 0;
	var w = window.innerWidth;
	var h = Math.floor(window.innerHeight * 0.3);
	var y = Math.floor(window.innerHeight * 0.7);
	if (redraw == true) {
		console.log("not null");
		soil.hide();
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

var growPlant = function(x, y, controlx, controly, newx, newy) {
	var s = 'M' + x + ' ' + y + 'Q' + controlx + ' ' + controly + ' ' + newx + ' ' + newy;
	console.log(s);
	// var c = paper.path(s);
	attr = {"stroke": "#2c7", "stroke-width": 10};
	var triangleString = 'M' + 
	drawpath(paper, s, 10000, attr, function(){stopRain();});
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

function stopRain(){
	circle.show()
	for (var i = 0; i < dropArr1.length; i++) {
			dropArr1[i].stop()
			dropArr1[i].hide()
	}
	for (var i = 0; i < dropArr2.length; i++) {
			dropArr2[i].stop()
			dropArr2[i].hide()
	}
	dropArr1 = []
	dropArr2 = []
}

function renderRain (startpos, endpos, rainDrop, height) {
	console.log(startpos)
	circle.hide()
	for (i = 0; i < window.innerWidth; i+=31) {
		if(i % 2 == 0){
			push = true
		}
		for (j = height; j < window.innerHeight - (0.3*(window.innerHeight)); j+=31) {
			
			if (i > startpos && i < endpos){
				var drop = paper.path(rainDrop(i, j, 30, 30))
				drop.attr("fill", "#F5FFFF");
				drop.attr("stroke", "#F5FFFF");
				if (i % 2 == 0){
					dropArr1.push(drop)
				}
				else {
					dropArr2.push(drop)
				}
			}

		}
	}
}
var rainAnimation = Raphael.animation(  { transform: [ "T", 0, 10 ] }, 100, 'linear', 
                    function()
                    {
                        // note that the callback is invoked in the context of the animated element, so we can simply write...
                        // this.animate( { transform: "" }, 500, 'linear' );

                        this.animate(rainAnimation2)
                        
                    } );
var rainAnimation2 = Raphael.animation(  { transform: [ "T", 0, -10 ] }, 100, 'linear', 
                    function()
                    {
                        // note that the callback is invoked in the context of the animated element, so we can simply write...
                        // this.animate( { transform: "" }, 500, 'linear' );
                        this.animate(rainAnimation)
                    } );


var dropArr1 = []
var dropArr2 = []
function triggerRain (){
	for (var i = 0; i < cloudArr.length; i++) {
		renderRain(cloudArr[i]-20, cloudArr[i] + 120, rainDrop, cloudHeights[i] + 80);
		reDrawStuff();
		console.log(i)
	}

	for (var i = 0; i < dropArr1.length; i++) {
			dropArr1[i].animate(rainAnimation)
			
		
	}

	for (var i = 0; i < dropArr2.length; i++) {
			dropArr2[i].animate(rainAnimation2)	
		
	}

	setTimeout(function() { stopRain(); }, 2000);

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

// var soil = null;
createSoil(false);

var yoffset = 100;
var x_control_offset = 20;
var x = Math.floor(window.innerWidth * 0.5);
var y = Math.floor(window.innerHeight* 0.7);
var newy = y-yoffset;
var controlx = x-x_control_offset;
var controly = Math.floor(newy + (y-newy)/2);

var myLittlePlanty = function() {
	growPlant(x, y, controlx, controly, x, newy);
	x = x;
	y = newy;
	yoffset = Math.floor(yoffset * 0.8);
	newy = y-yoffset;
	x_control_offset = Math.floor(x_control_offset * -0.5);
	controlx = x-x_control_offset;
	controly = Math.floor(newy + (y-newy)/2);
}

myLittlePlanty();
createSoil();

var reDrawStuff = function(){
	createSoil(true);
}


