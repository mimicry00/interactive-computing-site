let off = 0.004;
let interval = 4;

let ballsize = 600;
let particles = [];
let maxLife = 60;
let hue;

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  background(0);
  colorMode(HSB);

  hue = random(360);

  for(let i=0; i< 18000; i++) {
    while(1) {
      let x = random(-ballsize/2, ballsize/2);
      let y = random(-ballsize/2, ballsize/2);
      let d = dist(0, 0, x, y);
      if(d<ballsize/2) {
        let p = createVector(x, y);
        particles.push(new Particle(p));
        break;
      }
    }
  }
}

function draw() {
  // blendMode(BLEND);
  for(let p of particles) {
    p.update();
    p.show();
    if(p.isDone()) particles.splice(particles.indexOf(p), 1);
  }
}

class Particle {
  constructor(p) {
    this.prev = p;
    this.pos = p;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.life = maxLife;
    this.alpha = 1;
    this.brs = 10;
    this.wt = 1;
  }

  update() {
    this.prev = createVector(this.pos.x, this.pos.y);
    
    let rad = map(noise(this.pos.x*off, this.pos.y*off), 0, 1, 0, TAU);
    let flow = p5.Vector.fromAngle(rad, 40);
    this.acc.add(flow);
    this.vel.add(this.acc).normalize().mult(2);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.life --;
    this.alpha = map(this.life, 0, maxLife, 0, 1);
    this.brs = map(this.life, 0, maxLife, 60, 10);
    this.wt = map(this.life, 0, maxLife, 0.1, 1);
  }

  show() {
    push();
    translate(width/2, height/2);
    stroke(hue, 60, this.brs, this.alpha);
    strokeWeight(this.wt);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);    
    pop();

  }

  isDone() {
    return this.life<0 ? true : false;
  }
}