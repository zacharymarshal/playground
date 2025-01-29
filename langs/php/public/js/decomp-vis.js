const animate = (...anims) => {
  let currentAnimationIdx = 0;

  const next = () => {
    currentAnimationIdx++;
  };

  return () => {
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
  const randomness = 0.9;
  const distance = p.dist(x, y1, x, y2);
  let segments = 30;
  if (distance < 100) {
    segments = 10;
  }
  console.log(distance, segments);
  const arcWidth = 60;

  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  p.beginShape();

  for (let i = 0; i < Math.min(31, segments * jumpProgress); i++) {
    const t = i / segments;

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

const decomposeViz = (p) => {
  const width = 350;
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
    {
      minuend: 43,
      subtrahend: 7,
      difference: 36,
      markers: [{ value: 43 }, { value: 40 }, { value: 36 }],
      jumps: [
        { from: 0, to: 1, label: "- 3" },
        { from: 1, to: 2, label: "- 4" },
      ],
    },
  ];

  const problemIdx = new URLSearchParams(window.location.search).get("p") || 0;
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
    a = animate(...anims);
  };

  p.draw = () => {
    p.clear();

    drawOpenNumberLine(p, {
      x1: width / 2,
      y1: padding,
      x2: width / 2,
      y2: height - padding,
    });

    a();
  };
};

new p5(decomposeViz, "vis");
