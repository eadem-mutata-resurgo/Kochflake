

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

let tm = mat3.create();
let red = 0;
let green = 0;
let blue =0;
const size = 150;
const depth = 3;

let a = 0;
let t = 0;
let dt = 0.6;
let dc = 0;

window.onload = (event) => {
    scale(1, -1);
    translate(w/2, -7*h/8);
    rotate(-30);
    context.lineWidth = 1;
    draw();
}



function draw() {
    context.clearRect(-w, -h, 2*w, 2*h);

    red = 125*Math.cos(dc*Math.PI/180).toString()+130;
    green = 125*Math.cos(4*dc*Math.PI/180).toString()+130;
    blue = -125*Math.cos(2*dc*Math.PI/180).toString()+130;
    context.fillStyle = "rgb(" + red + " " + green + " " + blue + ")";

    a = 60*Math.cos(t*Math.PI/180);
    kochFlake();

    if (t>=360) { t=0; }
    t += dt;
    if (dc >= 360) { dc = 0; }
    else { dc+= 0.25; }
    window.requestAnimationFrame(draw);
}

function kochFlake() {
    context.beginPath();
    moveTo(0,0);
    koch(depth, size);
    rotate(120);
    koch(depth, size);
    rotate(120);
    koch(depth, size);
    rotate(120);
    context.fill();
    context.stroke();
    context.closePath();
}

function koch(depth, size) {
    if (depth == 0) {
        translate(0, size);
        lineTo(0,0);
    }
    else {
        koch(depth-1, size/3);
        rotate(-a);
        koch(depth-1, size/3);
        rotate(2*a);
        koch(depth-1, size/3);
        rotate(-a);
        koch(depth-1, size/3);
    }
}

function rotate(d) { mat3.rotate(tm, tm, -d*Math.PI/180); }
function scale(dx, dy) { mat3.scale(tm, tm, [dx, dy]); }
function translate(dx, dy){ mat3.translate(tm, tm, [dx, dy]); }
function moveTo(x,y) {let res=vec2.create(); vec2.transformMat3(res,[x,y],tm); context.moveTo(res[0],res[1]);}
function lineTo(x,y) {let res=vec2.create(); vec2.transformMat3(res,[x,y],tm); context.lineTo(res[0],res[1]);}