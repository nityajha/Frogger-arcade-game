var canvas_y = 80;
var canvas_x = 100;
var canvas_top_overlay = 50;
var canvas_bottom_underlay = 20;

var player_y_min = 0 * canvas_y + canvas_top_overlay;
var player_y_max = 5 * canvas_y - canvas_bottom_underlay;
var player_x_min = 0;
var player_x_max = 4 * canvas_x;

var player_sprite = 'images/char-boy.png';

var start_loc_x = canvas_x * 2;
var start_loc_y = canvas_y * 5 - canvas_bottom_underlay;

var bug = 'images/enemy-bug.png';

var npcMinSpd = 150;
var npcMaxSpd = 500;

var catalyst = function(x, y, img) {
    this.x = x;
    this.y = y;
    this.sprite = img;
};
catalyst.prototype.render = function() {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y);
}
var player = function(x, y) {
    catalyst.call(this, x, y, player_sprite);
};
player.prototype = Object.create(Catalyst.prototype);
player.prototype.constructor = Player;
player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'up' && this.y > player_y_min) this.y = this.y - canvas_y;
    else if (keyCode == 'down' && this.y < player_y_max) this.y = this.y + canvas_y;
    else if (keyCode == 'left' && this.x > player_x_min) this.x = this.x - canvas_x;
    else if (keyCode == 'right' && this.x < player_x_max) this.x = this.x + canvas_x;
};
player.prototype.update = function() {
if (this.y <= canvas_top_overlay) {
        this.x = start_loc_x;
        this.y = start_loc_y;
        this.sprite = player_sprite;
    }
};
var enemy = function(x, y) {
    catalyst.call(this, x, y, 'images/enemy-bug.png');
    this.speed = getRandomInt(npcMinSpd, npcMaxSpd);
};
enemy.prototype = object.create(catalyst.prototype);
enemy.prototype.constructor = enemy;
enemy.prototype.update = function(dt) {
if (this.x > canvas_x * 5) {
        this.x = canvas_x * -1;
        this.y = canvas_y * getRandomInt(1, 4) - var canvas_bottom_underlay;
        this.speed = getRandomInt(npcMinSpd, npcMaxSpd);
    }
this.x = this.x + this.speed * dt;
if (player.x >= this.x - 50 && player.x <= this.x + 50) {
        if (player.y >= this.y - 50 && player.y <= this.y + 50) {
            player.x = start_loc_x;
            player.y = start_loc_y;
        }
    }
};
var player = new Player(start_loc_x, start_loc_y);

var allEnemies = [];
for (var i = 0; i < npcSpawn; i++){
    allEnemies.push(new Enemy(canvas_x * -1, canvas_y * getRandomInt(1, 4) - canvas_bottom_underlay));
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});