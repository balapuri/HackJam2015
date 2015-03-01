// Creates canvas
var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);

var createSoil = function() {
	var x = 0;
	var w = window.innerWidth;
	var h = Math.floor(window.innerHeight * 0.3);
	var y = Math.floor(window.innerHeight * 0.7);
	var soil = paper.rect(x, y, w, h);
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
	drawpath(paper, s, 10000, attr, function(){console.log("done");});
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

createSoil();

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
	yoffset = Math.floor(yoffset * 0.6);
	newy = y-yoffset;
	x_control_offset = Math.floor(x_control_offset * 0.5);
	controlx = x-x_control_offset;
	controly = Math.floor(newy + (y-newy)/2);
}
myLittlePlanty();
