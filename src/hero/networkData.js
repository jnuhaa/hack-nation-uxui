export function createNetworkData(centerX, centerY) {
  const nodeLabels = ["mentors", "VCs", "top talents", "$$$", "real problems"];
  const nodes = [{ id: "center", x: centerX, y: centerY, label: "You", level: 0 }];
  const edges = [];

  nodeLabels.forEach((label, i) => {
    const angle = (i / nodeLabels.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 128;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    nodes.push({ id: `primary-${i}`, x, y, label, level: 1 });
    edges.push({ from: "center", to: `primary-${i}` });

    for (let j = 0; j < 4; j++) {
      const subAngle = angle + (j - 1.5) * 0.4;
      const subRadius = 66;
      const subX = x + Math.cos(subAngle) * subRadius;
      const subY = y + Math.sin(subAngle) * subRadius;

      nodes.push({ id: `secondary-${i}-${j}`, x: subX, y: subY, level: 2 });
      edges.push({ from: `primary-${i}`, to: `secondary-${i}-${j}` });

      for (let k = 0; k < 2; k++) {
        const tertAngle = subAngle + (k - 0.5) * 0.6;
        const tertRadius = 36;
        const tertX = subX + Math.cos(tertAngle) * tertRadius;
        const tertY = subY + Math.sin(tertAngle) * tertRadius;

        nodes.push({ id: `tertiary-${i}-${j}-${k}`, x: tertX, y: tertY, level: 3 });
        edges.push({ from: `secondary-${i}-${j}`, to: `tertiary-${i}-${j}-${k}` });
      }
    }
  });

  return { nodes, edges };
}

export function generateRocketWireframe(centerX, centerY) {
  const points = [];
  const cx = centerX;
  const cy = centerY + 6;
  const tilt = -0.62;

  const addRotatedPoint = (x, y) => {
    const rx = x * Math.cos(tilt) - y * Math.sin(tilt);
    const ry = x * Math.sin(tilt) + y * Math.cos(tilt);
    points.push({ x: cx + rx, y: cy + ry });
  };

  const sampleSegment = (ax, ay, bx, by, count) => {
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : i / (count - 1);
      addRotatedPoint(ax + (bx - ax) * t, ay + (by - ay) * t);
    }
  };

  const sampleArc = (cx0, cy0, r, start, end, count) => {
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : i / (count - 1);
      const a = start + (end - start) * t;
      addRotatedPoint(cx0 + Math.cos(a) * r, cy0 + Math.sin(a) * r);
    }
  };

  // Body outline trace (icon-like).
  sampleArc(0, -70, 17, Math.PI * 1.05, Math.PI * 1.95, 10);
  sampleSegment(-16, -65, -21, 8, 9);
  sampleSegment(-21, 8, -16, 66, 7);
  sampleArc(0, 70, 16, Math.PI * 0.95, Math.PI * 0.05, 10);
  sampleSegment(16, 66, 20, 4, 7);
  sampleSegment(20, 4, 14, -66, 8);

  // Nose tip + cap.
  sampleSegment(0, -96, 0, -116, 5);
  sampleSegment(-10, -84, 10, -84, 5);

  // Left triangular wing.
  sampleSegment(-18, 14, -46, 32, 8);
  sampleSegment(-46, 32, -16, 40, 8);
  sampleSegment(-16, 40, -18, 14, 5);

  // Right triangular wing (mirrored to ensure both sides are visible).
  sampleSegment(18, 14, 46, 32, 8);
  sampleSegment(46, 32, 16, 40, 8);
  sampleSegment(16, 40, 18, 14, 5);

  // Engine (double ring / nozzle).
  sampleArc(0, 82, 12.5, Math.PI * 0.05, Math.PI * 0.95, 10);
  sampleArc(0, 82, 7.5, Math.PI * 0.08, Math.PI * 0.92, 8);
  sampleSegment(-11, 78, -6, 92, 4);
  sampleSegment(11, 78, 6, 92, 4);

  // Window ring + center point for strong readability.
  sampleArc(2, -18, 9.5, 0, Math.PI * 2, 16);
  addRotatedPoint(2, -18);

  // Three exhaust streaks.
  sampleSegment(-10, 98, -18, 126, 5);
  sampleSegment(-1, 102, -10, 132, 5);
  sampleSegment(8, 106, -2, 138, 5);

  return points;
}
