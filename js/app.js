var coordinateX = [0, 101, 202, 303, 404, 505, 606, 707, 808];
var coordinateY = [0, 83, 83*2, 83*3, 83*4, 83*5, 83*6, 83*7, 83*8, 83*9];
var hardLevel = 0;
var initialLife = 5;
var mapSizeX = 4;
var mapSizeY = 5;
var gemPositionX = coordinateX[Math.floor(Math.random() * 5)], 
    gemPostionY = 0;


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = coordinateY[Math.floor(Math.random() * 4) + 1];
    this.speed = 101 * Math.random() * hardLevel;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= coordinateX[mapSizeX]){
        this.x = - 101;
    } else {
        this.x = this.x + dt * this.speed;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = coordinateX[x];
    this.y = coordinateY[y];
    this.sprite = 'images/char-boy.png';
    this.life = initialLife;  //the intial life
    this.score = 0;
}

Player.prototype.update = function() {
    // body...
    if (this.ctlKey === 'left' && this.x != 0) {
        this.x = this.x - 101;
    } else if (this.ctlKey === 'right' && this.x != mapSizeX * 101) {
        this.x = this.x + 101;
    } else if (this.ctlKey === 'up' && this.y != 0) {
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != mapSizeY * 83) {
        this.y = this.y + 83;
    }
    this.ctlKey = '';
};

Player.prototype.render = function() {
    // body...
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("Socre: " + this.score, 350, 580);
    if (this.life <= 0) {
    //ctx.drawImage(Resources.get('images/gameover.png'), 0, 48, 505, 538);
    $("#message").text("Game over, you got a score of " + this.score + " !");
    $("#message").color = "red";
    $("#start-game").show();
    $("#how-to-play").show();
    $("#continue-game").hide();
    }
};


Player.prototype.reset = function() {
    this.x = coordinateX[mapSizeX / 2];
    this.y = coordinateY[mapSizeY];
    gemPositionX = coordinateX[Math.floor(Math.random() * 5)]
};

Player.prototype.die = function() {
    this.life = this.life - 1;
    pause = true;
    $("#continue-game").show();
    //this.reset();  

};

Player.prototype.checkCollection = function() {
    if ( (this.x === gemPositionX) && (this.y === 0) ){
        this.score =  this.score + hardLevel - 2;
        this.reset();
         $("#message").text("Good! Score increases to " + this.score +" !");
        hardLevel = hardLevel + 1;
        allEnemies.push(new Enemy());
    }
};

Player.prototype.handleInput = function(key) {
    // body...
    this.ctlKey = key;
};
// Now instantiate your objects.

var allEnemies = [];
for( var i = 0; i < hardLevel; i++ ) {
   allEnemies.push(new Enemy());
}

var player = new Player( mapSizeX / 2, mapSizeY );


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


