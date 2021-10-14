var game;

var boidsAmount = 1000;
var boids = [];
var target;

window.onload = function() {	
	game = new Phaser.Game(640, 640, Phaser.AUTO, "");
     game.state.add("Simulate", simulate);
     game.state.start("Simulate");
}

var simulate = function(game){};
simulate.prototype = {
     preload: function(){
          game.load.image("boid", "boid.png");
          game.load.image("target", "target.png");     
     },
     create: function(){
          target = game.add.sprite(game.width / 2, game.height / 2, "target");
          target.anchor.set(0.5);
          for(var i = 0; i < boidsAmount; i++){
               var randomPoint = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
               boids[i] = game.add.sprite(randomPoint.x, randomPoint.y, "boid")
               boids[i].anchor.set(0.5);
               boids[i].speed = game.rnd.between(50, 150);
               boids[i].force = game.rnd.between(5, 25);
               game.physics.enable(boids[i], Phaser.Physics.ARCADE);
               boids[i].body.allowRotation = false;    
          }
     },
     update: function(){
          for(var i = 0; i < boidsAmount; i++){
               // direction vector is the straight direction from the boid to the target
               var direction = new Phaser.Point(target.x, target.y);
               // now we subtract the current boid position
               direction.subtract(boids[i].x, boids[i].y);
               // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
               direction.normalize();
               // time to set magnitude (length) to boid speed
               direction.setMagnitude(boids[i].speed);
               // now we subtract the current boid velocity
               direction.subtract(boids[i].body.velocity.x, boids[i].body.velocity.y);
               // normalizing again
               direction.normalize();
               // finally we set the magnitude to boid force, which should be WAY lower than its velocity
               direction.setMagnitude(boids[i].force); 
               // Now we add boid direction to current boid velocity
               boids[i].body.velocity.add(direction.x, direction.y);
               // we normalize the velocity
               boids[i].body.velocity.normalize();
               // we set the magnitue to boid speed
               boids[i].body.velocity.setMagnitude(boids[i].speed);
               boids[i].angle = 180 + Phaser.Math.radToDeg(Phaser.Point.angle(boids[i].position, new Phaser.Point(boids[i].x + boids[i].body.velocity.x, boids[i].y + boids[i].body.velocity.y)));
               if(boids[i].position.distance(target.position) < 2){
                    target.x = game.rnd.between(10, game.width - 10);
                    target.y = game.rnd.between(10, game.height - 10);
               }
          }                    
     }     
}