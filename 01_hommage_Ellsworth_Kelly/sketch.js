let rad1 = 0,
	rad2 = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background('#1A659E');
	noStroke();

	for (let x = 0; x < width + 1000; x += 220) {
		for (let y = 0; y < height + 1000; y += 220) {
			push();
			translate(x, y);
			rotate(rad2);
			fill('#F23B0B');
			beginShape();
			vertex(135, 43);
			bezierVertex(129, 59, 116, 86, 102, 99);
			bezierVertex(94, 105, 60, 115, 42, 120);
			bezierVertex(37, 114, 24, 101, 19, 94);
			bezierVertex(14, 86, 6, 70, 2, 64);
			bezierVertex(-1, 70, -11, 85, -16, 94);
			bezierVertex(-22, 102, -32, 115, -37, 120);
			bezierVertex(-46, 120, -69, 119, -87, 115);
			bezierVertex(-104, 110, -126, 99, -134, 94);
			bezierVertex(-135, 78, -134, 41, -126, 12);
			bezierVertex(-118, -16, -89, -67, -75, -90);
			bezierVertex(-67, -94, -47, -105, -33, -110);
			bezierVertex(-20, -114, -3, -119, 13, -121);
			bezierVertex(30, -110, 70, -82, 91, -50);
			bezierVertex(115, -14, 129, 25, 135, 43);
			endShape();
			pop();

		}
	}

	for (let x = 0; x < width + 1000; x += 190) {
		for (let y = 0; y < height + 1000; y += 190) {
			push();
			translate(x, y);
			rotate(rad1);
			fill('#F7D104');
			beginShape();
			vertex(-10, -60);
			vertex(-60, -110);
			vertex(-105, -35);
			vertex(-60, -5);
			vertex(-100, +30);
			vertex(-50, +105);
			vertex(+5, +45);
			vertex(+40, +95);
			vertex(+95, +30);
			vertex(+40, -10);
			vertex(+105, -60);
			vertex(+30, -105);
			vertex(-10, -60);
			endShape();
			pop();
		}
	}

	rad1 += PI / 360;
	rad2 -= PI / 180;
}