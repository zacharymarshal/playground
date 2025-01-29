const vscale = 8;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vscale, height / vscale);
}

let paddleY = 0;
function draw() {
  background(0);
  video.loadPixels();
  const lastColumn = [];
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const idx = (video.width - x - 1 + y * video.width) * 4;
      const r = video.pixels[idx + 0];
      const g = video.pixels[idx + 1];
      const b = video.pixels[idx + 2];

      const avg = (r + g + b) / 3;
      const width = map(avg, 0, 255, 0, vscale);

      const threshold = 127;

      if (avg < threshold) {
        fill(0);
      } else {
        fill(255);
      }

      // fill(avg);
      noStroke();
      // rectMode(CENTER);
      // rect(x * vscale, y * vscale, width, width);
      ellipseMode(CENTER);
      ellipse(
        x * vscale + vscale / 2 + 4,
        y * vscale + vscale / 2 + 1,
        width,
        width,
      );

      const isLastColumn = x === video.width - 1;
      if (isLastColumn) {
        lastColumn[y] = avg < threshold ? 0 : 255;
      }
    }
  }

  // draw pong paddle on the right side
  const paddleWidth = 40;
  const paddleHeight = height / 6;
  const paddleX = width - 20;

  // break the lastColumn into 6 even sections
  const numValuesPerSection = lastColumn.length / 6;
  const sections = [];
  for (let i = 0; i < 6; i++) {
    const start = i * numValuesPerSection;
    const end = (i + 1) * numValuesPerSection;
    const section = lastColumn.slice(start, end);
    const sum = section.reduce((acc, val) => acc + val, 0);
    sections.push(sum);
  }

  const sectionWithLowestValue = sections.indexOf(Math.min(...sections));
  console.log(sectionWithLowestValue);
  const sectionHeight = height / 6;
  const targetY = sectionWithLowestValue * sectionHeight;

  const paddleSpeed = 5;
  if (paddleY < targetY) {
    paddleY += paddleSpeed;
  } else if (paddleY > targetY) {
    paddleY -= paddleSpeed;
  }

  paddleY = constrain(paddleY || 0, 0, height - paddleHeight);

  fill(45, 255, 45);
  rect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function keyPressed() {
  if (key === "s") {
    noLoop();
  }
}
