let font;
let numbers = [];

function preload() {
  font = loadFont("fonts/Schoolbell-Regular.ttf");
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("falling-numbers");

  frameRate(60);
  textFont(font);
  textAlign(CENTER, CENTER);
  noStroke();

  for (let i = 0; i < 50; i++) {
    const n = new FallingNumber();
    n.y = random(height);
    n.x = random(width);
    numbers.push(n);
  }
}

function draw() {
  background("#ffffff");

  if (frameCount % 10 === 0) {
    numbers.push(new FallingNumber());
  }

  numbers.sort((a, b) => b.z - a.z);

  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].update();
    numbers[i].draw();

    if (numbers[i].offScreen()) {
      numbers.splice(i, 1);
    }
  }
}

const characters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "x",
  "÷",
  "=",
];

class StaticNumber {
  constructor() {
    this.value = random(characters);
    this.x = random(width);
    this.y = random(height);
    this.z = random(0.1, 1);
    this.angle = random(-30, 30);
    this.size = map(this.z, 0.1, 1, 18, 26);
    this.color = map(this.z, 0.1, 1, 200, 0);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    fill(this.color);
    textSize(this.size);
    text(this.value, 0, 0);
    pop();
  }
}

class FallingNumber {
  constructor() {
    this.value = random(characters);
    this.x = random(width);
    this.y = -50;
    this.z = random(0.1, 2);
    this.size = map(this.z, 0.1, 1, 18, 26);
    this.speed = map(this.z, 0.1, 1, 1, 1.25);
    this.angle = random(-60, 60);
    this.rotationSpeed = random(-0.01, 0.01);
    this.color = map(this.z, 0.1, 1, 250, 175);
  }

  update() {
    this.y += this.speed;
    this.angle += this.rotationSpeed;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    fill(this.color);
    textSize(this.size);
    text(this.value, 0, 0);
    pop();
  }

  offScreen() {
    return this.y > height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
