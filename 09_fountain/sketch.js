let charballs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(4);
  line(width/2-20, height/2, width/2+20, height/2); 

  for (let i=0; i<charballs.length; i++) {
    charballs[i].update();
    charballs[i].display();
    if(charballs[i].isDone()) charballs.splice(i, 1);
  }
}

function keyPressed() {
  charballs.push(new CharBall(width/2, height/2, key));
}

class CharBall {

  constructor(_x, _y, _c) {
    this.x = _x;
    this.y = _y;
    this.ch = _c;
    this.vx = random(-8, 8);
    this.vy = random(-10, -20);
    this.g = 1;
		this.angle = 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    fill(255);
    textSize(48);
    textAlign(CENTER);
    text(this.ch, 0, 0);
    pop();
  }

  update() {
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;
    this.angle += 8;
  }
  
  isDone() {
    if(this.y>height) return(true);
    else return(false);    
  }
}