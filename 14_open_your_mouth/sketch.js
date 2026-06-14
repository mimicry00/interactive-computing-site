let faceMesh;
let video;
let faces = [];
let options = {
	maxFaces: 1,
	refineLandmarks: false,
	flipHorizontal: false
};

let lipsExterior = [
	267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185, 40, 39, 37, 0,
];

let lipsInterior = [
	13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82,
];

let bubbles = [];
let convW

function preload() {
	faceMesh = ml5.faceMesh(options);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();

	faceMesh.detectStart(video, gotFaces);

}

function draw() {
	background(0);
	// image(video, 0, 0);

	for (let i = 0; i < faces.length; i++) {
		let face = faces[i];
		let box = face.box;
		let lips = face.lips;

		convW = box.width * height / box.height;

		// for (let j = 0; j < face.keypoints.length; j++) {
		//   let keypoint = face.keypoints[j];
		//   // fill(0, 255, 0);
		//   // noStroke();
		//   // circle(keypoint.x, keypoint.y, 5);
		// }

		noStroke();
		fill(255, 0, 0);
		// strokeWeight(2);
		beginShape();
		for (let j = 0; j < lipsExterior.length; j++) {
			let index = lipsExterior[j];
			let keypoint = face.keypoints[index];
			let converted = boxConversion(keypoint, box, convW);
			vertex(converted.x, converted.y);
		}
		endShape(CLOSE);

		fill(0);
		beginShape();
		for (let j = 0; j < lipsInterior.length; j++) {
			let index = lipsInterior[j];
			let keypoint = face.keypoints[index];
			let converted = boxConversion(keypoint, box, convW);
			vertex(converted.x, converted.y);
		}
		endShape(CLOSE);

		//box
		// noFill();
		// stroke(0, 255, 0);
		// strokeWeight(2);
		// rect(box.xMin, box.yMin, box.width, box.height);

		//lips center value
		// fill(0, 255, 0);
		// noStroke();
		// ellipse(face.keypoints[13].x, face.keypoints[13].y, 10);
		// ellipse(face.keypoints[14].x, face.keypoints[14].y, 10);
		// ellipse(face.keypoints[78].x, face.keypoints[78].y, 10);
		// ellipse(face.keypoints[308].x, face.keypoints[308].y, 10);

		let a = face.keypoints[13];
		let b = face.keypoints[14];
		let c = face.keypoints[78];
		let d = face.keypoints[308];
		let distance1 = dist(a.x, a.y, b.x, b.y);
		let distance2 = dist(c.x, c.y, d.x, d.y);
		let ratio = distance1 / distance2;
		if (ratio > 0.1 && random(1) < 0.25) {
			let lipCenter = {x: lips.centerX, y: lips.centerY};
			let conv = boxConversion(lipCenter, box, convW);
			bubbles.push(new Bubble(conv.x, conv.y));
		}

	}

	for (let i = 0; i < bubbles.length; i++) {
		let bubble = bubbles[i];
		bubble.display();
		bubble.update();
		if (bubble.isOut()) bubbles.splice(i, 1);
	}
}

function boxConversion(p, box, cW) {
	let extraD = (width - cW) / 2;
	let cx = map(p.x, box.xMin, box.xMax, 0, cW) + extraD;
	let cy = map(p.y, box.yMin, box.yMax, 0, height);
	return {x:cx, y:cy};
}

class Bubble {

	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
		this.dx = random(-1, 1);
		this.dy = random(-1, 1);
		this.d = random(50, 150);
		this.c = color(random(255), random(255), random(255), 120);
	}

	display() {
		fill(this.c, 80);
		noStroke();
		ellipse(this.x, this.y, this.d, this.d);
	}

	update() {
		this.d *= random(.995, .999);
		this.dx += random(-1, 1);
		this.dy += random(-0.2);

		this.x += this.dx;
		this.y += this.dy;
	}

	isOut() {
		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			return true;
		} else {
			return false;
		}
	}
}

function gotFaces(results) {
	faces = results;
	// console.log(results);
}

function convertToCanvas(pt) {
	let x = map(pt.x, 0, video.width, 0, width);
	let y = map(pt.y, 0, video.height, 0, (width * video.height) / video.width);
	return createVector(x, y);
}