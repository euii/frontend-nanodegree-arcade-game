
// Enemies our player must avoid
var Enemy = function(speed,row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var yRow = [60,140,230];
    this.x = 0;
    this.y = yRow[row];
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log("Enemy update"+dt);
    if (this.x > 500) this.x = -100;
    this.x += dt*this.speed;
    // console.log("Enemy update"+this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // console.log("Enemy render");

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.initPosition = function () {
    this.x = 0;
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.height = 400;
    this.width = 400;
    this.x = 200;
    this.y = 400;
    this.UDStep = 83;
    this.LRStep = 100;
    this.spriteList = ["images/char-boy.png","images/char-horn-girl.png"];
    this.spriteIndex = 0;
    this.roleList = ["vincible","invincible"];//when vincible player could be killed, when invincible CAN'T BE KILLED.
    this.role = this.roleList[this.spriteIndex];
    this.roleTime = 0;
    this.win = false;
};

Player.prototype.update = function() {
    var now = Date.now();
    if (now - this.roleTime > 3000) {
        this.spriteIndex = 0;
    }
    this.role = this.roleList[this.spriteIndex];

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.spriteList[this.spriteIndex]), this.x, this.y);
};

Player.prototype.handleInput = function(e) {

    if (e === "up" && this.y >= this.UDStep) {
        this.y -=  this.UDStep;
    }else if (e === "down" && this.y < this.height ) {
        this.y +=  this.UDStep;
    }else if (e === "left" && this.x >= this.LRStep) {
        this.x -= this.LRStep;
    }else if (e === "right" && this.x < this.width) {
        this.x += this.LRStep;
    }

    console.log("key down:"+e);
    console.log("y:"+this.y);
    console.log("x:"+this.x);
}

Player.prototype.initPosition = function () {
    this.x = 200;
    this.y = 400;
}

var Gem = function (color,positionIndex) {
    this.position = [[-100,-100],
        [20,100],[120,100],[220,100],[320,100],[420,100],
        [20,185],[120,185],[220,185],[320,185],[420,185],
        [20,270],[120,270],[220,270],[320,270],[420,270]];
    this.positionIndex = positionIndex;
    this.spriteList = ['images/Gem-Blue.png','images/Gem-Orange.png'];
    this.spriteIndex = color;
    this.colorList = ["blue","red"];
    this.x = -100;
    this.y = -100;
    this.color = this.colorList[color]
}

Gem.prototype.render = function () {

    this.x = this.position[this.positionIndex][0];
    this.y = this.position[this.positionIndex][1];
    ctx.drawImage(Resources.get(this.spriteList[this.spriteIndex]),this.x,this.y,60,101);
}

Gem.prototype.update = function (positionIndex) {
    this.x = this.position[this.positionIndex][positionIndex];
    this.y = this.position[this.positionIndex][positionIndex];
}

Gem.prototype.disappear = function () {
    this.positionIndex = 0;
}

var Victory = function () {
    this.winText = "YOU WIN";
    this.sprite = "images/Star.png"
}

Victory.prototype.render = function (player) {
    if (player.win) {
        ctx.font = "36pt impact";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.fillText(this.winText,250,350);
        ctx.strokeText(this.winText,250,350);
        ctx.drawImage(Resources.get(this.sprite),200,300);
    }

}

// /**
//  * Generate a random number
//  * @param min
//  * @param max
//  * @returns {number}
//  */
// var random = function (min,max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
for (var i = 0 ; i < 6; i ++){
    if (i < 3) {
        allEnemies.push(new Enemy(random(100,200),i));
    }else{
        allEnemies.push(new Enemy(random(300,700),random(0,2)));
    }
}

var player = new Player();

//Gem
var allGems = new Array();
allGems.push(new Gem(0,random(6,15))); //blue gem third or fourth row
allGems.push(new Gem(1,random(1,5))); //orange gem the second row


//victory
var victory = new Victory();



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
