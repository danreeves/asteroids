
var canvas,
    c; // c is the canvas' context 2D

setupCanvas();

var mouseX, mouseY,
    halfWidth = canvas.width/2,
    halfHeight = canvas.height/2,
    bullets = [],
    ship = new ShipMoving(halfWidth, halfHeight),
    thrusting = false,
    rotateLeft = false,
    rotateRight = false,
    bullets = [],
    asteroids = [],
    spareAsteroids = [];

for(var i = 0; i<5; i++) {

    var asteroid = new MovingCircle(
        (Math.ceil(Math.random()*100) % 2) ? 0 : canvas.width,
        randomRange(0, canvas.height),
        50
    );
    asteroid.vel.reset(3,0);
    asteroid.vel.rotate(randomRange(0,360));
    asteroids.push(asteroid);

}

setInterval(draw, 1000/35);

// canvas.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );


function draw() {

    c.clearRect(0,0,canvas.width, canvas.height);

    // Asteroids
    for(var i = 0; i< asteroids.length; i++) {

        var asteroid = asteroids[i];

        if(!asteroid.enabled) continue;

        if (asteroid.hitTest(ship.pos.x, ship.pos.y)) {
            asteroids.splice(0, asteroids.length)
            if (window.confirm("YOU LOSE")) {
                window.location.reload();
            }
            break;
        }

        for (var ii=0; ii<bullets.length;ii++) {
            var bullet = bullets[ii];
            if(asteroid.hitTest(bullet.pos.x, bullet.pos.y)) {
                // asteroid.enabled = false;
                bullet.enabled = false;
                bullets.splice(ii, 1);
                if(asteroid.radius<15)
                {
                    asteroid.enabled = false;
                    spareAsteroids.push(asteroid);

                } else {

                    asteroid.radius = asteroid.radius/2;

                    var newasteroid = makeNewAsteroid(asteroid.pos.x, asteroid.pos.y, asteroid.radius);
                    newasteroid.vel.copyFrom(asteroid.vel)

                    newasteroid.vel.rotate(20);
                    asteroid.vel.rotate(-20);
                }
                break;
            }
        }

        asteroid.update(canvas);
        asteroid.draw(c);
    }

    // Bullets
    for (var i=0; i<bullets.length;i++) {
        bullet = bullets[i];

        if(!bullet.enabled) continue;
        bullet.update();
        bullet.draw(c);
    }

        // Ship
    if(thrusting) ship.thrust();
    if(rotateLeft) ship.rotateLeft();
    if(rotateRight) ship.rotateRight();
    ship.update();
    with(ship.pos) {
        if(x<0) x = canvas.width;
        else if(x>canvas.width) x = 0;
        if(y<0) y = canvas.height;
        else if (y>canvas.height) y = 0;
    }
    ship.draw(c, thrusting);

}

function onKeyDown(e) {
    if (e.keyCode == 38) thrusting = true;
    if (e.keyCode == 37) rotateLeft = true;
    if (e.keyCode == 39) rotateRight = true;
    if (e.keyCode == 32) {
        var bullet = new Bullet(ship.pos.x, ship.pos.y, ship.angle*Math.PI/180, ship.vel);
        bullets.push(bullet);
    }

}
function onKeyUp(e) {
    if (e.keyCode == 38) thrusting = false;
    if (e.keyCode == 37) rotateLeft = false;
    if (e.keyCode == 39) rotateRight = false;
}

// function onMouseMove(event) {

//  if(event.offsetX){
//      mouseX = event.offsetX;
//      mouseY = event.offsetY;
//  } else {
//      // for browsers that don't support offsetX and offsetY (Fx)
//      mouseX = event.pageX - event.target.offsetLeft;
//      mouseY = event.pageY - event.target.offsetTop;
//  }

// }
function makeNewAsteroid(x,y,radius) {
    var newasteroid;

    if(spareAsteroids.length>0) {
        newasteroid = spareAsteroids.pop();
        newasteroid.pos.reset(x,y);
        newasteroid.radius = radius;

        newasteroid.enabled = true;
    } else {
        newasteroid = new MovingCircle(x,y,radius);
        asteroids.push(newasteroid);
    }


    return newasteroid;
}
function setupCanvas() {

    canvas = document.createElement( 'canvas' );
    c = canvas.getContext( '2d' );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild( canvas );

    c.strokeStyle = "#ffffff";
    c.lineWidth = 2;
}

function randomRange(min, max) {
    return ((Math.random()*(max-min)) + min);
}
