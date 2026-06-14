let particles = [];
let flowfield = [];

let scl = 20;
let cols, rows;
let t=0;

let off = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(width/scl);
  rows = floor(height/scl);

  for(let i=0; i<4000; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

}

function draw() {
  // background(255);
  // noLoop();

	flowfield = []; //****

  for(let x=0; x<cols; x++) {
    for(let y=0; y<rows; y++) {
      let n = noise(x*off, y*off, t);
      let angle = map(n, 0, 1, 0, TWO_PI*8);
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.08);

      flowfield.push(v);

      // push();
      // translate(x*scl, y*scl);
      // stroke(0, 100);
      // strokeWeight(1);
      // line(0, 0, v.x*100, v.y*100);
      // pop();
    }
  }

  t += off;


  for(let i=0; i<particles.length; i++) {
    particles[i].addForce();
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.prev = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  updatePrev() {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  addForce() {
    let xx = floor(this.pos.x/scl);
    let yy = floor(this.pos.y/scl);
    let index = xx + yy*cols;
    this.acc.add(flowfield[index]);
    this.updatePrev();
  }

  show() {
    stroke(0, 20);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }

  edges() {
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
