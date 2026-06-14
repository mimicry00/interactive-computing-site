
let cols, rows;
let gap = 30;
let sD=20, tD=100;

let duration = 60;

let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#00bfa5', '#ff4081', '#7c4dff'];

let chRs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  initGrid();
}

function initGrid() {
  chRs = [];
  let base = min(width, height);
  cols = floor(base / tD) - 1;
  rows = cols;

  let paddingLX = (width  - (cols*tD + (cols-1)*gap)) / 2;
  let paddingLY = (height - (rows*tD + (rows-1)*gap)) / 2;
  let paddingSX = (width  - (cols*sD + (cols-1)*gap)) / 2;
  let paddingSY = (height - (rows*sD + (rows-1)*gap)) / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let tx = i*(tD + gap) + tD/2 + paddingLX;
      let ty = j*(tD + gap) + tD/2 + paddingLY;
      let sx = i*(sD + gap) + sD/2 + paddingSX;
      let sy = j*(sD + gap) + sD/2 + paddingSY;
      chRs.push(new ColorDrop(sx, sy, tx, ty));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}

function draw() {
  background('#333745');

  // let stepS = sD + gap;
  // let offX = (sD/2 + (width  - (cols*sD + (cols-1)*gap)) / 2) % stepS;
  // let offY = (sD/2 + (height - (rows*sD + (rows-1)*gap)) / 2) % stepS;
  // fill(240);
  // for (let x = offX; x < width  + stepS; x += stepS)
  //   for (let y = offY; y < height + stepS; y += stepS)
  //     circle(x, y, sD);


  for (let chR of chRs) chR.update();
  chRs.sort((a, b) => a.d - b.d);
  for (let chR of chRs) chR.show();
}

class ColorDrop {
  constructor(sx, sy, tx, ty) {
    this.startX = sx;
    this.startY = sy;
    this.targetX = tx;
    this.targetY = ty;
    this.x = this.startX;
    this.y = this.startY;
    this.startD = sD;
    this.targetD = tD;
    this.d = this.startD;
    this.startR = this.d / 2;
    this.targetR = 0;
    this.rd = this.startR;
    this.startColor = color(80);
    this.targetColor = color(255);
    // this.targetColor.setAlpha(200);
    this.currentColor = this.startColor;
    this.offset = floor(random(duration * 2));
  }

  show() {
    fill(this.currentColor);
    rect(this.x, this.y, this.d, this.d, this.rd, this.rd, this.rd, this.rd);
  }

  update() {
    let t = (frameCount + this.offset) % (duration * 2);
    if (t > 0 && t <= duration) {
      let n = norm(t, 1, duration);
      let easing = easeInExpo(n);
      this.x = lerp(this.startX, this.targetX, easing);
      this.y = lerp(this.startY, this.targetY, easing);
      this.d = lerp(this.startD, this.targetD, easing);
      this.rd = lerp(this.startR, this.targetR, easing);
      this.currentColor = lerpColor(this.startColor, this.targetColor, easing);
    } else if (t > duration && t < duration * 2) {
      let n = norm(t, duration, duration * 2);
      let easing = easeInExpo(n);
      this.x = lerp(this.targetX, this.startX, easing);
      this.y = lerp(this.targetY, this.startY, easing);
      this.d = lerp(this.targetD, this.startD, easing);
      this.rd = lerp(this.targetR, this.startR, easing);
      this.currentColor = lerpColor(this.targetColor, this.startColor, easing);
    } else {
      this.x = this.startX;
      this.y = this.startY;
      this.d = this.startD;
      this.rd = this.startR;
      this.currentColor = color(80);
      this.targetColor = color(255);
      // this.targetColor.setAlpha(200);
    }
  }
}

function easeInExpo(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}
