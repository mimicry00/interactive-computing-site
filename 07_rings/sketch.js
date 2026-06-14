let colors = ['#d7e0fd', '#00010a', '#8d9bc0', '#424852', '#fb4d3d', '#df2935', '#fdca40'];

let numOfArcs = 8;
let wd = 400;

let rings = [];
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  cols = ceil(width/wd) + 1;
  rows = ceil(height/wd) + 1;

  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      let x = i*wd;
      let y = j*wd;
      rings.push(new Ring(x, y, wd));
    }
  }
}

function draw() {
  background(230);

  for(let ring of rings) {
    ring.show();
    ring.update();
  }
}

class Ring {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.rSeed = random(1, 10000);
    this.rad = 0;
  }

  show() {
    randomSeed(this.rSeed);
    for (let n = numOfArcs; n > 0; n--) {
      let seed = random(1, 10000);
      randomSeed(seed);

      push();
      translate(this.x, this.y);
      rotate(random(PI * 2) + this.rad);
      fill(random(colors));
      let d = n * (this.w / numOfArcs);
      let endAngle = random(PI * 3 / 2, PI * 2);
      arc(0, 0, d, d, 0, endAngle)
      pop();
    }
  }

  update() {
    this.rad += PI/180;
  }
}
