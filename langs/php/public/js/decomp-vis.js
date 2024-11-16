class Wait {
  completed = false;
  constructor(startTime, duration, onDone) {
    this.duration = duration;
    this.onDone = onDone;
    this.startTime = startTime;
  }

  update(ts) {
    if (this.completed) {
      return true;
    }

    if (ts - this.startTime >= this.duration) {
      this.completed = true;
      this.onDone();
      return true;
    }

    return false;
  }
}

const animate = (...anims) => {
  let currentAnimationIdx = 0;

  const next = () => {
    console.log("next called");
    currentAnimationIdx++;
  };

  return () => {
    console.log("currentAnimationIdx", currentAnimationIdx);
    anims.forEach((anim, idx) => {
      if (idx <= currentAnimationIdx) {
        anim(next);
      }
    });
  };
};

const drawLine = (p, x1, y1, x2, y2) => {
  p.stroke(0);
  p.strokeWeight(2);
  p.noFill();

  const len = p.dist(x1, y1, x2, y2);
  const numSegments = p.constrain(len / 30, 2, 6);

  p.beginShape();

  p.vertex(x1, y1);
  p.curveVertex(x1, y1);

  for (let i = 1; i < numSegments; i++) {
    const t = i / numSegments;
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);

    const offsetX = p.random(-1, 1);
    const offsetY = p.random(-1, 1);

    p.curveVertex(x + offsetX, y + offsetY);
  }

  p.curveVertex(x2, y2);
  p.vertex(x2, y2);

  p.endShape();
};

const drawCircle = (p, x, y, radius, fill = false) => {
  p.fill("green");
  p.stroke(0);
  p.strokeWeight(2);
  const points = 10;
  p.beginShape();
  for (let i = 0; i < points; i++) {
    const angle = p.map(i, 0, points, 0, p.TWO_PI);
    const offsetX = p.random(-1, 1);
    const offsetY = p.random(-1, 1);
    const px = x + radius * p.cos(angle) + offsetX;
    const py = y + radius * p.sin(angle) + offsetY;
    p.curveVertex(px, py);
  }
  p.endShape(p.CLOSE);
};

const drawMarkerLine = (p, x, y, length) => {
  p.stroke(0);
  p.strokeWeight(2);
  p.line(x - length / 2, y, x + length / 2, y);
};

const drawMarkerCircle = (p, x, y, radius) => {
  drawCircle(p, x, y, radius, true);
};

const drawMarkerLabel = (p, x, y, text) => {
  p.textFont("Schoolbell");
  p.textSize(21);
  p.fill(0);
  p.noStroke();
  p.textAlign(p.LEFT, p.CENTER);
  p.text(text, x + 16, y + 3);
};

const drawArrow = (p, position, target) => {
  const size = 10;
  const randomness = 1.5;

  const angle = p.atan2(position.y - target.y, position.x - target.x);
  const angleOffset = p.PI / 5;

  const angle1 = angle + angleOffset;
  const angle2 = angle - angleOffset;

  const x1 =
    target.x + size * p.cos(angle1) + p.random(-randomness, randomness);
  const y1 =
    target.y + size * p.sin(angle1) + p.random(-randomness, randomness);

  const x2 =
    target.x + size * p.cos(angle2) + p.random(-randomness, randomness);
  const y2 =
    target.y + size * p.sin(angle2) + p.random(-randomness, randomness);

  p.stroke(0);
  p.strokeWeight(2);
  p.line(target.x, target.y, x1, y1);
  p.line(target.x, target.y, x2, y2);
};

const drawOpenNumberLine = (p, points) => {
  drawLine(p, points.x1, points.y1, points.x2, points.y2);

  drawArrow(
    p,
    { x: points.x1, y: points.y1 },
    { x: points.x1, y: points.y1 - 1 },
  );
  drawArrow(
    p,
    { x: points.x2, y: points.y2 },
    { x: points.x2, y: points.y2 + 1 },
  );
};

const drawArc = (p, jumpProgress, x, y1, y2, label = "") => {
  const randomness = 1;
  const segments = 30;
  const arcWidth = 60;

  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  p.beginShape();

  for (let i = 0; i < Math.min(31, segments * jumpProgress); i++) {
    t = i / segments;

    const ny = p.lerp(y1, y2, t);

    const offset = Math.sin(t * Math.PI) * arcWidth;
    const nx = x - offset + p.random(-randomness, randomness);
    const wobblyY = ny + p.random(-randomness, randomness);

    p.vertex(nx, wobblyY);
  }

  p.endShape();

  if (label) {
    p.textFont("Schoolbell");
    p.textSize(21);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(label, x - arcWidth - 24, (y1 + y2) / 2);
  }
};

const drawJump = (p, jumpProgress, x, y1, y2, label = "", onDone = null) => {
  drawArc(p, jumpProgress, x - 12, y1, y2 - 8, label);
  if (jumpProgress >= 1) {
    drawArrow(p, { x: x - 18, y: y2 - 14 }, { x: x - 8, y: y2 - 4 });
  }
};

const drawAnimatedJump = (
  p,
  progress,
  x,
  y1,
  y2,
  label = "",
  onDone = () => {},
) => {
  const arcWidth = 60;
  const randomness = 1;
  const segments = 30;

  const ny = p.lerp(y1, y2, progress);

  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  p.beginShape();

  for (let i = 0; i <= segments; i++) {
    let t = i / segments;

    let ny = p.lerp(y1, y2, t);

    let offset = Math.sin(t * Math.PI) * arcWidth;
    let nx = x - offset + p.random(-randomness, randomness);
    let wobblyY = ny + p.random(-randomness, randomness);

    p.vertex(nx, wobblyY);
  }

  p.endShape();

  if (label) {
    p.textFont("Schoolbell");
    p.textSize(21);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(label, x - arcWidth - 24, (y1 + y2) / 2);
  }

  if (progress >= 1) {
    onDone();
  }
};

const decomposeViz = (p) => {
  const width = 800;
  const height = 800;
  const padding = 50;

  const problems = [
    {
      minuend: 32,
      subtrahend: 18,
      difference: 14,
      markers: [{ value: 32 }, { value: 22 }, { value: 20 }, { value: 14 }],
      jumps: [
        { from: 0, to: 1, label: "- 10" },
        { from: 1, to: 2, label: "- 2" },
        { from: 2, to: 3, label: "- 6" },
      ],
    },
    {
      minuend: 43,
      subtrahend: 27,
      difference: 16,
      markers: [{ value: 43 }, { value: 23 }, { value: 20 }, { value: 16 }],
      jumps: [
        { from: 0, to: 1, label: "- 20" },
        { from: 1, to: 2, label: "- 3" },
        { from: 2, to: 3, label: "- 4" },
      ],
    },
  ];

  const problemIdx = window.location.hash.slice(1);
  const problem = problems[problemIdx];

  const subtrahend = problem.subtrahend;
  const minuend = problem.minuend;
  const difference = problem.difference;

  const numberLine = problem;
  numberLine.markers.forEach((marker, i) => {
    const y = p.map(
      marker.value,
      minuend,
      difference,
      padding * 2,
      height - padding * 2,
    );
    marker.y = y;
    marker.x = width / 2;
  });

  const lineLength = height - padding * 2;
  const fps = 12;
  const anims = [];
  let a;

  p.setup = () => {
    p.createCanvas(width, height);
    p.smooth();
    p.frameRate(fps);

    numberLine.markers.forEach((marker, idx) => {
      let done1;
      anims.push(function a(next) {
        drawMarkerLine(p, marker.x, marker.y, 20);
        if (!done1) {
          done1 = true;
          setTimeout(next, 1000);
        }
      });
      let done;
      anims.push(function b(next) {
        if (idx === 0 || idx === numberLine.markers.length - 1) {
          drawMarkerCircle(p, marker.x, marker.y, 6);
        }
        drawMarkerLabel(p, marker.x, marker.y, marker.value);
        if (!done) {
          done = true;
          setTimeout(next, 1000);
        }
      });
      let done2;
      let jumpProgress = 0;
      anims.push(function b(next) {
        const jump = numberLine.jumps.find((jump) => jump.from === idx);
        if (!jump) {
          return;
        }
        const to = numberLine.markers[jump.to];
        drawJump(p, jumpProgress, width / 2 - 4, marker.y, to.y, jump.label);
        if (jumpProgress < 1) {
          jumpProgress += 0.1;
        }
        drawMarkerLine(p, to.x, to.y, 20);
        if (!done2) {
          done2 = true;
          setTimeout(next, 1000);
        }
      });
    });
    console.log(anims);
    a = animate(...anims);
  };

  p.draw = () => {
    p.clear();

    // draw the problem minuend - subtrahend = difference
    p.textFont("Schoolbell");
    p.textSize(32);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${minuend} - ${subtrahend} =`, width / 2, 20);

    drawOpenNumberLine(p, {
      x1: width / 2,
      y1: padding,
      x2: width / 2,
      y2: height - padding,
    });

    a();

    // numberLine.markers.forEach((marker, idx) => {
    //   drawMarkerLine(p, marker.x, marker.y, 20);
    //   if (idx === 0 || idx === numberLine.markers.length - 1) {
    //     drawMarkerCircle(p, marker.x, marker.y, 6);
    //   }
    //   drawMarkerLabel(p, marker.x, marker.y, marker.value);
    // });

    // numberLine.jumps.forEach((jump) => {
    //   const from = numberLine.markers[jump.from];
    //   const to = numberLine.markers[jump.to];
    //   drawJump(p, width / 2 - 4, from.y, to.y, jump.label);
    // });
  };
};

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

    let gap = (endX - startX) / (numPoints - 1);
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

    if (progress < p.PI) {
      progress += 0.15;
    }

    let currentRandomness = p.map(progress, 0, p.PI, 0.1, arcRandomness);
    currentRandomness = p.constrain(currentRandomness, 0, arcRandomness);

    drawWobblyArc(
      midPoint,
      y - arcHeight,
      Math.abs(startPoint - endPoint),
      arcHeight * 2,
      p.TWO_PI,
      p.TWO_PI - progress,
      currentRandomness,
    );
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

new p5(decomposeViz, "vis");
