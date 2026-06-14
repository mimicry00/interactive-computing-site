let vines = [];
let num = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  background(255, 12);
  
  for(let i=0; i<vines.length; i++) {
    let c = vines[i];
    if(c.isOut()) {
      vines.splice(i, 1);
    } else {
      c.update();
      c.display();
    }
  }
  
}

function mousePressed() {
  for(let i=0; i<num; i++) {
    vines.push(new Vine(mouseX, mouseY, random(-1, 1), random(-1, 1)));
  }
}

class Vine {

  constructor(_x, _y, _dx, _dy) {
    this.x = _x;
    this.y = _y;
    this.dx = _dx;
    this.dy = _dy;
    this.d = 20;

    this.pX = this.x;
    this.pY = this.y;
  }
  
  display() {
    // stroke(100, 50, 50);
    // fill(255);
    // ellipse(this.x, this.y, this.d, this.d);    

    noFill();
    stroke(10, 80, 225);
    strokeWeight(this.d);
    line(this.x, this.y, this.pX, this.pY);
  }
  
  update() {
    this.pX = this.x;
    this.pY = this.y;

    this.d *= random(.995, .999);
    this.dx += random(-0.5, 0.5);
    this.dy += random(-0.5, 0.5);
    
    this.x += this.dx;
    this.y += this.dy;

  }
  
  isOut() {
    if(this.x<0 || this.x>width || this.y<0 || this.y>height) {
      return true;
    } else {
      return false;
    }
  }
}