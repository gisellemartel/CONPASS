const pointToLine = {
  pointToLineCalculator(point, line) {
    // Typical formula for a line is y = ax+b.
    // Point to line requires it to be in form x(x1)+y(y1)+b=0.
    const x = this.calculateSlope(line);
    const y = 1;
    const b = this.calculateIntercept(x, line[0]);

    const lineDistance = Math.sqrt(x ** 2 + y ** 2);

    // Formula pulled from here: https://www.onlinemath4all.com/perpendicular-distance-calculator.html
    return lineDistance !== 0 ? Math.abs((x * point.x + y * point.y + b) / Math.sqrt(x ** 2 + y ** 2)) : 0;
  },
  calculateSlope(line) {
    const deltaY = line[1].y - line[0].y;
    const deltaX = line[1].x - line[0].x;
    return deltaX !== 0 ? deltaY / deltaX : 0;
  },
  calculateIntercept(slope, point) {
    return point.y - slope * point.x;
  }
};

export default pointToLine;
