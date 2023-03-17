var canvas, ctx, flag = false,
canvas2, ctx2,
canvas3, ctx3,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    hasInput = false,
    dragging = false,
    dragStartLocationx,
    dragStartLocationy,
    snapshot,
    snapshot3;

var linecolor = '#000000',
    linewidth = 25,
    tf = 'sans-serif';
    ts = '16px ';

var linemode=true,
    erasemode=false,
    textmode=false,
    dragmode=false,
    circlemode=false,
    trianglemode=false,
    rectanglemode=false,
    floodmode=false,
    spraymode=false,
    fill=false;


var orimg
var bg=true;
function setbg(){    
    var img3=ctx3.getImageData(0,0,canvas3.width,canvas3.height);

    if(bg){
        var tmp=ctx.getImageData(0,0,canvas.width,canvas.height);
        ctx.clearRect(0, 0,canvas.width,canvas.height);
        ctx.putImageData(img3,0,0);
        ctx3.putImageData(tmp,0,0);
        cPush();
    }
    else{
        var tmp=ctx.getImageData(0,0,canvas.width,canvas.height);
        ctx.putImageData(img3,0,0);
        ctx3.putImageData(tmp,0,0);
        cPush();
    }
    bg=!bg;


}

function init() {
    canvas = document.getElementById('mycan');
    ctx = canvas.getContext("2d");

    canvas2 = document.getElementById('mycan2');
    ctx2 = canvas2.getContext("2d");

    canvas3 = document.getElementById('mycan3');
    ctx3 = canvas3.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = "white";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    
    
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    cPush();
}


function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineCap = 'round';
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = linewidth;
    ctx.stroke();
    ctx.closePath();


    
    ctx3.beginPath();
    ctx3.moveTo(prevX, prevY);
    ctx3.lineTo(currX, currY);
    ctx3.lineCap = 'round';
    ctx3.strokeStyle = linecolor;
    ctx3.lineWidth = linewidth;
    ctx3.stroke();
    ctx3.closePath();
}

function erase() {
    orimg=ctx2.getImageData(currX,currY,linewidth,linewidth);

    ctx.clearRect(currX, currY, linewidth,linewidth);
    ctx.putImageData(orimg,currX,currY);

    ctx3.clearRect(currX, currY, linewidth,linewidth);
}
function clearzzz() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0,canvas.width,canvas.height);
        canvas.width=1000;
        canvas.height=600;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        
        ctx2.clearRect(0, 0,canvas2.width,canvas2.height);
        canvas2.width=1000;
        canvas2.height=600;
        ctx2.fillStyle = "white";
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

        
        ctx3.clearRect(0, 0,canvas3.width,canvas3.height);
        canvas3.width=1000;
        canvas3.height=600;
    }
}


function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            if(linemode){
                ctx.beginPath();
                ctx.fillStyle = linecolor;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
            }
            dot_flag = false;
        }
        if(textmode){
            if (hasInput) return;
            addInput(e.clientX, e.clientY);
        }
        if(dragmode){
            dragStart();
        }
        if(floodmode){
            if(findcolor(currX,currY)!=linecolor){
                flood_fill( currX, currY , color_to_rgba(linecolor) );
            }
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
        if(res=='up') cPush();
    }
    if (res == 'move') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;   
        if(flag){
            if(linemode) draw();
            if(erasemode) erase();
            if(dragmode) drag();
            if(spraymode)spray();
        } 
    }
}

//color
var colorWell;
var defaultColor = "black";

window.addEventListener("load", startup, false);

function startup() {
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", selectcolor, false);
    colorWell.select();
}

function selectcolor(event) {
    var p = document.querySelector("p");
    linecolor=event.target.value;
    if (p) {
        p.style.color = event.target.value;
    }
}



//slider
var slide = document.getElementById("myRange");
slide.addEventListener("change", function() {
    linewidth=slide.value
}, false);

//tool
var pencheckbox = document.getElementById("pencheck");
pencheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/pen.png'), default";
        linemode=true;
        erasemode=false;
        textmode=false;
        dragmode=false,
        circlemode=false,
        trianglemode=false,
        rectanglemode=false,
        floodmode=false;
        spraymode=false;

        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
  });

var erasecheckbox = document.getElementById("erasecheck");
erasecheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/erase.png'), default";
        linemode=false;
        erasemode=true;
        textmode=false;
        dragmode=false,
        circlemode=false,
        trianglemode=false,
        rectanglemode=false,
        floodmode=false;
        spraymode=false;

        pencheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
  });

var textcheckbox = document.getElementById("textcheck");
textcheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/T.png'), auto";
        linemode=false;
        erasemode=false;
        textmode=true;
        dragmode=false,
        circlemode=false,
        trianglemode=false,
        rectanglemode=false,
        floodmode=false;
        spraymode=false;
        
        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
  });


  
var circlecheckbox = document.getElementById("circlecheck");
circlecheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/circle.png'), auto";
        linemode=false,
        erasemode=false,
        textmode=false,
        dragmode=true,
        circlemode=true,
        trianglemode=false,
        rectanglemode=false,
        floodmode=false;
        spraymode=false;
        
        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
  });

var trianglecheckbox = document.getElementById("trianglecheck");
trianglecheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/triangle.png'), auto";
        linemode=false,
        erasemode=false,
        textmode=false,
        dragmode=true,
        circlemode=false,
        trianglemode=true,
        rectanglemode=false,
        floodmode=false;
        spraymode=false;
        
        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
});

var rectanglecheckbox = document.getElementById("rectanglecheck");
rectanglecheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/rectangle.png'), auto";
        linemode=false,
        erasemode=false,
        textmode=false,
        dragmode=true,
        circlemode=false,
        trianglemode=false,
        rectanglemode=true,
        floodmode=false;
        spraymode=false;
        
        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        floodcheckbox.checked=false;
        spraycheckbox.checked=false;
    }
    });

var floodcheckbox = document.getElementById("floodcheck");
floodcheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/paint.png'), auto";
        linemode=false,
        erasemode=false,
        textmode=false,
        dragmode=false,
        circlemode=false,
        trianglemode=false,
        rectanglemode=false;
        floodmode=true;
        spraymode=false;
        
        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        spraycheckbox.checked=false;
    }
    });

var spraycheckbox = document.getElementById("spraycheck");
spraycheckbox.addEventListener('change', function() {
    if (this.checked) {
        canvas.style.cursor="url('src/spray.png'), auto";
        linemode=false;
        erasemode=false;
        textmode=false;
        dragmode=false,
        circlemode=false,
        trianglemode=false,
        rectanglemode=false,
        floodmode=false;
        spraymode=true;

        pencheckbox.checked=false;
        erasecheckbox.checked=false;
        textcheckbox.checked=false;
        circlecheckbox.checked=false;
        trianglecheckbox.checked=false;
        rectanglecheckbox.checked=false;
        floodcheckbox.checked=false;
    }
  });


  //text
function addInput(x, y) {
    var input = document.createElement('input');

    input.style.color =linecolor;
    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = x + 'px';
    input.style.top = y-10 + 'px';

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    hasInput = true;
}

//Key handler for input box:
function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {

        drawText(this.value, parseInt(this.style.left, 10), 12+parseInt(this.style.top, 10));
        // drawText3(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
        hasInput = false;
        cPush();
    }
}

//Draw the text onto canvas:
function drawText(txt, x, y) {
    ctx.textBaseline = 'canvas.offsetTop';
    ctx.textAlign = 'canvas.offsetLeft';
    ctx.font = ts+tf;
    ctx.fillStyle = linecolor;
    ctx.fillText(txt, x-canvas.offsetLeft, y-canvas.offsetTop);

    ctx3.textBaseline = 'canvas3.offsetTop';
    ctx3.textAlign = 'canvas3.offsetLeft';
    ctx3.font = ts+tf;
    ctx3.fillStyle = linecolor;
    ctx3.fillText(txt, x-canvas.offsetLeft, y-canvas.offsetTop);

}




//textfont
var f = document.getElementById("textfont");
f.addEventListener("change", function() {
    tf=f.value;
},false);


//textsize
var fs = document.getElementById("textsize");
fs.addEventListener("change", function() {
    ts=fs.value+'px ';
});

//dragshape
function dragStart() {
    dragging = true;
    dragStartLocationx=currX;
    dragStartLocationy=currY;
    takeSnapshot();
}

function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    snapshot3 = ctx3.getImageData(0, 0, canvas.width, canvas.height);
}

function drag(event) {
    var positionx,positiony;
    if (dragging === true) {
        restoreSnapshot();
        positionx =currX;
        positiony=currY;
        drawshape(positionx,positiony);
    }
}

function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
    
    ctx3.putImageData(snapshot3, 0, 0);
}

function drawshape(positionx,positiony) {
    var shapefillcheckbox = document.getElementById("shapefillcheck")
    ctx.lineWidth=linewidth;
    ctx.strokeStyle=linecolor;
    ctx.fillStyle = linecolor;

    
    ctx3.lineWidth=linewidth;
    ctx3.strokeStyle=linecolor;
    ctx3.fillStyle = linecolor;
    if (circlemode) {
        drawCircle(positionx,positiony);
    }
    if (trianglemode) {
        drawTriangle(positionx,positiony);
    }if (rectanglemode) {
        drawRectangle(positionx,positiony);
    }

    if (shapefillcheckbox.checked) {
        ctx.fill();

        ctx3.fill();
    } else {
        ctx.stroke();
        
        ctx3.stroke();
    }
}

function drawCircle(positionx,positiony) {
    var radius = Math.sqrt(Math.pow((dragStartLocationx - positionx), 2) + Math.pow((dragStartLocationy - positiony), 2));
    ctx.beginPath();
    ctx.arc(dragStartLocationx, dragStartLocationy, radius, 0, 2 * Math.PI, false);

    ctx3.beginPath();
    ctx3.arc(dragStartLocationx, dragStartLocationy, radius, 0, 2 * Math.PI, false);
}

function drawTriangle(positionx,positiony) {
    ctx.beginPath();
    ctx.moveTo(dragStartLocationx + (positionx - dragStartLocationx) / 2, dragStartLocationy);
    ctx.lineTo(dragStartLocationx, positiony);
    ctx.lineTo(positionx, positiony);
    ctx.lineTo(dragStartLocationx + (positionx - dragStartLocationx) / 2, dragStartLocationy);
    ctx.closePath();

    
    ctx3.beginPath();
    ctx3.moveTo(dragStartLocationx + (positionx - dragStartLocationx) / 2, dragStartLocationy);
    ctx3.lineTo(dragStartLocationx, positiony);
    ctx3.lineTo(positionx, positiony);
    ctx3.lineTo(dragStartLocationx + (positionx - dragStartLocationx) / 2, dragStartLocationy);
    ctx3.closePath();
}

function drawRectangle(positionx,positiony) {
    ctx.beginPath();
    ctx.moveTo(dragStartLocationx,dragStartLocationy);
    ctx.lineTo(dragStartLocationx, positiony);
    ctx.lineTo(positionx, positiony);
    ctx.lineTo(positionx, dragStartLocationy);
    ctx.closePath();

    
    ctx3.beginPath();
    ctx3.moveTo(dragStartLocationx,dragStartLocationy);
    ctx3.lineTo(dragStartLocationx, positiony);
    ctx3.lineTo(positionx, positiony);
    ctx3.lineTo(positionx, dragStartLocationy);
    ctx3.closePath();
}


//undo redo
var cPushArray = [];

var cPushArray3 = [];
var cPushArrayx = [];
var cPushArrayy = [];
var cStep = -1;

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
        cPushArray.length = cStep;
        cPushArrayx.length = cStep;
        cPushArrayy.length = cStep;

        cPushArray3.length = cStep;
    }
    cPushArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    cPushArray3.push(ctx3.getImageData(0, 0, canvas.width, canvas.height));
    cPushArrayx.push(canvas.width);
    cPushArrayy.push(canvas.height);
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = cPushArray[cStep];

        var canvasPic3 = cPushArray3[cStep];
        var cx = cPushArrayx[cStep];
        var cy = cPushArrayy[cStep];
        canvas.width=cx;
        canvas.height=cy;

        canvas3.width=cx;
        canvas3.height=cy;
        ctx.putImageData(canvasPic, 0, 0);
        
        ctx3.putImageData(canvasPic3, 0, 0);
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = cPushArray[cStep];

        var canvasPic3 = cPushArray3[cStep];
        var cx = cPushArrayx[cStep];
        var cy = cPushArrayy[cStep];
        canvas.width=cx;
        canvas.height=cy;

        canvas3.width=cx;
        canvas3.height=cy;
        ctx.putImageData(canvasPic, 0, 0);
        
        ctx3.putImageData(canvasPic3, 0, 0);
    }
}

//upload image
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            
            canvas3.width = img.width;
            canvas3.height = img.height;
            ctx.drawImage(img,0,0);
            
            // ctx3.drawImage(img,0,0);
            cPush();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

//download
function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("mycan").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}



//flood fill
function flood_fill( x, y, color ) {
    pixel_stack = [{x:x, y:y}] ;
    pixels = ctx.getImageData( 0, 0, canvas.width, canvas.height ) ;

    pixels3 = ctx3.getImageData( 0, 0, canvas.width, canvas.height ) ;
    var linear_cords = ( y * canvas.width + x ) * 4 ;
    original_color = {r:pixels.data[linear_cords],
                      g:pixels.data[linear_cords+1],
                      b:pixels.data[linear_cords+2],
                      a:pixels.data[linear_cords+3]} ;

    while( pixel_stack.length>0 ) {
        new_pixel = pixel_stack.shift() ;
        x = new_pixel.x ;
        y = new_pixel.y ;

        //console.log( x + ", " + y ) ;
  
        linear_cords = ( y * canvas.width + x ) * 4 ;
        while( y-->=0 &&
               (pixels.data[linear_cords]==original_color.r &&
                pixels.data[linear_cords+1]==original_color.g &&
                pixels.data[linear_cords+2]==original_color.b &&
                pixels.data[linear_cords+3]==original_color.a) ) {
            linear_cords -= canvas.width * 4 ;
        }
        linear_cords += canvas.width * 4 ;
        y++ ;

        var reached_left = false ;
        var reached_right = false ;
        while( y++<canvas.height &&
               (pixels.data[linear_cords]==original_color.r &&
                pixels.data[linear_cords+1]==original_color.g &&
                pixels.data[linear_cords+2]==original_color.b &&
                pixels.data[linear_cords+3]==original_color.a) ) {
            pixels.data[linear_cords]   = color.r ;
            pixels.data[linear_cords+1] = color.g ;
            pixels.data[linear_cords+2] = color.b ;
            pixels.data[linear_cords+3] = color.a ;

            
            pixels3.data[linear_cords]   = color.r ;
            pixels3.data[linear_cords+1] = color.g ;
            pixels3.data[linear_cords+2] = color.b ;
            pixels3.data[linear_cords+3] = color.a ;

            if( x>0 ) {
                if( pixels.data[linear_cords-4]==original_color.r &&
                    pixels.data[linear_cords-4+1]==original_color.g &&
                    pixels.data[linear_cords-4+2]==original_color.b &&
                    pixels.data[linear_cords-4+3]==original_color.a ) {
                    if( !reached_left ) {
                        pixel_stack.push( {x:x-1, y:y} ) ;
                        reached_left = true ;
                    }
                } else if( reached_left ) {
                    reached_left = false ;
                }
            }
        
            if( x<canvas.width-1 ) {
                if( pixels.data[linear_cords+4]==original_color.r &&
                    pixels.data[linear_cords+4+1]==original_color.g &&
                    pixels.data[linear_cords+4+2]==original_color.b &&
                    pixels.data[linear_cords+4+3]==original_color.a ) {
                    if( !reached_right ) {
                        pixel_stack.push( {x:x+1,y:y} ) ;
                        reached_right = true ;
                    }
                } else if( reached_right ) {
                    reached_right = false ;
                }
            }
            
            linear_cords += canvas.width * 4 ;
        }
    }
    ctx.putImageData( pixels, 0, 0 ) ;
    
    ctx3.putImageData( pixels3, 0, 0 ) ;
}

function color_to_rgba( color ) {
    if( color[0]=="#" ) { // hex notation
        color = color.replace( "#", "" ) ;
        var bigint = parseInt(color, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return {r:r,
                g:g,
                b:b,
                a:255} ;
    } else if( color.indexOf("rgba(")==0 ) { // already in rgba notation
        color = color.replace( "rgba(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," ) ;
        return {r:color[0],
                g:color[1],
                b:color[2],
                a:color[3]*255} ;
    } else {
        console.error( "warning: can't convert color to rgba: " + color ) ;
        return {r:0,
                g:0,
                b:0,
                a:0} ;
    }
}

function findcolor(x,y){
    var p = ctx.getImageData(x, y, 1, 1).data; 
    
    // If transparency on the image
    if((p[0] == 0) && (p[1] == 0) && (p[2] == 0) && (p[3] == 0)){
        coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    return hex;
};
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//spray
function spray() {
    var imagedata=ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels = imagedata.data;

    
    var imagedata3=ctx3.getImageData(0, 0, canvas.width, canvas.height);
    pixels3 = imagedata3.data;
    
    for (var i = 0; i < 100; i++) {
        var angle = Math.random() * Math.PI * 2,
            radius  = Math.random() * linewidth,
            xpos = (currX + Math.cos(angle) * radius) | 0,
            ypos = (currY + Math.sin(angle) * radius) | 0,
            offset = (xpos + ypos * imagedata.width) * 4;
        var co=color_to_rgba(linecolor)
        //set the color of a pixel using its component colors: r,g,b,a (0-255)
        pixels[offset]     = co.r; //red
        pixels[offset + 1] = co.g; //green
        pixels[offset + 2] = co.b; //blue
        pixels[offset + 3] = 255;  //alpha

        
        pixels3[offset]     = co.r; //red
        pixels3[offset + 1] = co.g; //green
        pixels3[offset + 2] = co.b; //blue
        pixels3[offset + 3] = 255;  //alpha
      }
      ctx.putImageData(imagedata, 0, 0);
      
      ctx3.putImageData(imagedata3, 0, 0);
}