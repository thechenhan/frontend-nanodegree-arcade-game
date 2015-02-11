//Pre-save the matrix postion to array coordinateX and coordinateY.
var coordinateX = [0, 101, 202, 303, 404, 505, 606, 707, 808];
var coordinateY = [0, 83, 83*2, 83*3, 83*4, 83*5, 83*6, 83*7, 83*8, 83*9];
//hardLevel defines the amount of the bugs and the max possible speed.
var hardLevel = 0;
//The initial lives of the player.
var initialLife = 5;
//This is the map size.
var mapSizeX = 4;
var mapSizeY = 5;
//Random place the gem in the river.
var gemPositionX = coordinateX[Math.floor(Math.random() * 5)], 
    gemPostionY = 0;


/**
 *  Define the Enemy class that our player must avoid
 */
var Enemy = function() {
    //The start position of x
    this.x = -101;
    //The random place of start position of y
    this.y = coordinateY[Math.floor(Math.random() * 4) + 1];
    //Enemy speed depends on the hardlevel of the game
    this.speed = 101 * Math.random() * hardLevel;
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
}


/**
 * Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    if (this.x >= coordinateX[mapSizeX]) {
         //If the bug moves out of the scene, set to the inital position 
        this.x = - 101;
    } else {
        //The bug is still in the scene, move it along x direction
        this.x = this.x + dt * this.speed;
    }
}

/**
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Define the Player class
 */
var Player = function (x, y) {
    //x and y define the positon of the player
    this.x = coordinateX[x];
    this.y = coordinateY[y];
    //define the img of the player
    this.sprite = 'images/char-boy.png';
    //intialize the life and score
    this.life = initialLife;
    this.score = 0;
}

/**
 * update the position based on users input
 */
Player.prototype.update = function() {
    //make sure the player will not move off the scene
    if (this.ctlKey === 'left' && this.x != 0) {
        this.x = this.x - 101;
    } else if (this.ctlKey === 'right' && this.x != mapSizeX * 101) {
        this.x = this.x + 101;
    } else if (this.ctlKey === 'up' && this.y != 0) {
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != mapSizeY * 83) {
        this.y = this.y + 83;
    }
    //release the control key variable.
    this.ctlKey = '';
};

/**
 * draw the player on the scene and updated the score and check the life
 */
Player.prototype.render = function() {
    //draw the new position of the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //update the score
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("Socre: " + this.score, 350, 580);

    //check the lives of the player
    if (this.life <= 0) {
        $("#message").text("Game over, you got a score of " + this.score + " !");
        $("#start-game").show();
        $("#how-to-play").show();
        $("#continue-game").hide();
    }
};

/**
 *if the player lose one life, the player's position will be reset
 */
Player.prototype.reset = function() {
    this.x = coordinateX[mapSizeX / 2];
    this.y = coordinateY[mapSizeY];

    //update the new postion of gem
    gemPositionX = coordinateX[Math.floor(Math.random() * 5)]
};

/**
 *When the play loses his life, this method will be called
 */
Player.prototype.die = function() {
    //reduce the lives
    this.life = this.life - 1;
    
    //pause the game
    pause = true;
    $("#continue-game").show();
};

/**
 *check if the play picks up the gem
 */
Player.prototype.checkWin = function() {
    if (this.x === gemPositionX && this.y === 0){
        //reach the position of gem
        //update the score
        this.score =  this.score + hardLevel - 2;
        this.reset();
        $("#message").text("Good! Score increases to " + this.score +" !");
        //increase the hardness and the amount of the enemy
        hardLevel = hardLevel + 1;
        allEnemies.push(new Enemy());
    }
};

/**
 *get the control input
 */
Player.prototype.handleInput = function(key) {
    this.ctlKey = key;
};

//instantiate all of the enemy objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for( var i = 0; i < hardLevel; i++ ) {
    allEnemies.push(new Enemy());
}

//instantiate the player object.
// Place the player object in a variable called player
var player = new Player( mapSizeX / 2, mapSizeY );

// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});