const vis = (p) => {
  const config = {
    numberLineRandomness: 1,
    tickMarkRandomness: 0.25,
    arcRandomnessMax: 1,
    arrowRandomness: 1.5,
  };

  const jumps = [
    { start: 8, end: 6.05 },
    { start: 6, end: 4.05 },
  ];

  let currentJumpIndex = 0;
  let angleProgress = 0;
  let drawingArrow = false;
  let completedJumps = [];

  p.setup = function () {
    p.createCanvas(800, 300);
    p.smooth();
    p.frameRate(12);
  };

  p.draw = function () {
    p.background(240);
    p.clear();

    drawNumberLine(
      50,
      750,
      120,
      14,
      config.numberLineRandomness,
      config.tickMarkRandomness,
    );

    completedJumps.forEach((jump) => {
      drawStaticArc(jump);
    });

    if (currentJumpIndex < jumps.length) {
      const jump = jumps[currentJumpIndex];
      drawJumpArc(
        jump.start,
        jump.end,
        50,
        750,
        150,
        14,
        config.arcRandomnessMax,
        config.arrowRandomness,
        angleProgress,
        (progress) => {
          angleProgress = progress;
          if (progress >= p.PI) {
            drawingArrow = true;
          }
        },
      );

      if (drawingArrow) {
        let gap = (750 - 50) / (14 - 1);
        let endPointX = 50 + jump.end * gap;
        drawArrowLines(endPointX, 150 - 60, 150, 10, config.arrowRandomness);

        if (currentJumpIndex < jumps.length - 1) {
          completedJumps.push({ start: jump.start, end: jump.end });
          currentJumpIndex++;
          angleProgress = 0;
          drawingArrow = false;
        }
      }
    }
  };

  function drawNumberLine(
    startX,
    endX,
    y,
    numPoints,
    lineRandomness,
    tickMarkRandomness,
  ) {
    p.strokeWeight(2);
    p.stroke(0);
    drawWobblyLine(startX, y, endX, y, lineRandomness);

    for (let i = 0; i < numPoints; i++) {
      let x = startX + i * gap;
      drawWobblyLine(x, y - 10, x, y + 10, tickMarkRandomness);
      p.noStroke();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(i, x, y + 25);
      p.stroke(0);
    }
  }

  function drawJumpArc(
    startNum,
    endNum,
    startX,
    endX,
    y,
    numPoints,
    arcRandomness,
    arrowRandomness,
    progress,
    updateProgress,
  ) {
    let gap = (endX - startX) / (numPoints - 1);
    let startPoint = startX + startNum * gap;
    let endPoint = startX + endNum * gap;

    let midPoint = (startPoint + endPoint) / 2;
    let arcHeight = 60;

    p.noFill();
    p.stroke(200, 0, 0);
    p.strokeWeight(2);

    progress += 0.09;

    let currentRandomness = p.map(progress, 0, p.PI, 0.1, arcRandomness);
    currentRandomness = p.constrain(currentRandomness, 0, arcRandomness);

    if (progress < p.PI) {
      drawWobblyArc(
        midPoint,
        y - arcHeight,
        Math.abs(startPoint - endPoint),
        arcHeight * 2,
        p.TWO_PI,
        p.TWO_PI - progress,
        currentRandomness,
      );
    } else {
      drawWobblyArc(
        midPoint,
        y - arcHeight,
        Math.abs(startPoint - endPoint),
        arcHeight * 2,
        p.TWO_PI,
        p.PI,
        currentRandomness,
      );
    }

    updateProgress(progress);
  }

  function drawStaticArc(jump) {
    let gap = (750 - 50) / (14 - 1);
    let startPoint = 50 + jump.start * gap;
    let endPoint = 50 + jump.end * gap;

    let midPoint = (startPoint + endPoint) / 2;
    let arcHeight = 60;

    p.noFill();
    p.stroke(200, 0, 0);
    p.strokeWeight(2);
    drawWobblyArc(
      midPoint,
      150 - arcHeight,
      Math.abs(startPoint - endPoint),
      arcHeight * 2,
      p.TWO_PI,
      p.PI,
      config.arcRandomnessMax,
    );

    drawArrowLines(endPoint, 150 - arcHeight, 150, 10, config.arrowRandomness);
  }

  function drawWobblyLine(x1, y1, x2, y2, randomness) {
    let segments = 10;
    let dx = (x2 - x1) / segments;
    let dy = (y2 - y1) / segments;

    p.noFill();
    p.beginShape();
    for (let i = 0; i <= segments; i++) {
      let nx = x1 + i * dx + p.random(-randomness, randomness);
      let ny = y1 + i * dy + p.random(-randomness, randomness);
      p.vertex(nx, ny);
    }
    p.endShape();
  }

  function drawWobblyArc(x, y, w, h, start, stop, randomness) {
    let segments = 20;
    p.noFill();
    p.beginShape();
    for (let i = 0; i <= segments; i++) {
      let angle = p.map(i, 0, segments, start, stop);
      let nx = x + (w / 2) * p.cos(angle) + p.random(-randomness, randomness);
      let ny = y + (h / 2) * p.sin(angle) + p.random(-randomness, randomness);
      p.vertex(nx, ny);
    }
    p.endShape();
  }

  function drawArrowLines(x, y, targetY, size, randomness) {
    let angleOffset = p.PI / 4;

    let angle1 = p.atan2(y - targetY, 0) + angleOffset;
    let angle2 = p.atan2(y - targetY, 0) - angleOffset;

    let x1 = x + size * p.cos(angle1) + p.random(-randomness, randomness);
    let y1 = y + size * p.sin(angle1) + p.random(-randomness, randomness);

    let x2 = x + size * p.cos(angle2) + p.random(-randomness, randomness);
    let y2 = y + size * p.sin(angle2) + p.random(-randomness, randomness);

    p.strokeWeight(2);
    p.line(x, y, x1, y1);
    p.line(x, y, x2, y2);
  }
};

new p5(vis, "vis");
