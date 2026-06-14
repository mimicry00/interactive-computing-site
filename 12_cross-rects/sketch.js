let colors = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c', '#f4f1de', '#e07a5f', '#3d405b', '#81b29a', '#f2cc8f'];

let w = 200;
let steps = 0;
let incr = w * 0.04;
let dir = 1;

let crossRects = [];
let cols, rows;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

	cols = ceil(width / w) + 1;
	rows = ceil(height / w) + 1;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * w;
			crossRects.push(new CrossRects(x, y, w));
		}
	}

}

function draw() {
	background(255);

	for (let cr of crossRects) {
		cr.show();
		cr.update();
	}

	steps += incr * dir;
	if (steps < 0 || steps > 2*w) {
		dir *= (-1);
	}

}

function easeInCubic(x) {
  return x * x * x;
}

class CrossRects {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.centerWidth = w;
		this.rightWidth = 0;
		this.leftWidth = 0;
		this.bottomCol = random(colors);
		this.centerCol = random(colors);
		this.rightCol = random(colors);
		this.leftCol = random(colors);
	}

	show() {
		push();
		translate(this.x, this.y);

		rectMode(CENTER);
		fill(this.bottomCol);
		rect(0, 0, this.w);

		rectMode(CORNER);
		fill(this.leftCol);
		rect(-this.w / 2, -this.w / 2, this.leftWidth);

		fill(this.rightCol);
		rect(this.w / 2, this.w / 2, this.rightWidth);

		rectMode(CENTER);
		fill(this.centerCol);
		rect(0, 0, this.centerWidth);

		pop();
	}

	update() {
		// this.centerWidth = steps;
		// this.rightWidth = map(steps, -this.w, this.w, 0, -this.w);
		// this.leftWidth = map(steps, -this.w, this.w, 0, this.w);

		
		let n = norm(steps/2, 0, w);
		let st = easeInCubic(n) * dir * w;
		this.centerWidth = st;
		this.rightWidth = map(st, -this.w, this.w, 0, -this.w);
		this.leftWidth = map(st, -this.w, this.w, 0, this.w);


	}
}