const floorWaypointFinder = {
  distanceToWaypointCalculator(waypoint, startPoint, endPoint) {
    const originalX = this.calculateSlope([startPoint, endPoint]);
    let intersectPoint;
    if (originalX === 0) {
      intersectPoint = { x: startPoint.x, y: waypoint.y };
    } else if (originalX === Infinity) {
      intersectPoint = { x: waypoint.x, y: startPoint.y };
    } else {
      const originalB = this.calculateIntercept(originalX, startPoint);
      const perpendicularX = -1 / originalX;
      const perpendicularB = this.calculateIntercept(perpendicularX, waypoint);
      intersectPoint = this.intersectionOfTwoPoints(originalX, perpendicularX, originalB, perpendicularB);
    }
    let distance = this.nodeDistance(waypoint, intersectPoint);
    if ((intersectPoint.x >= startPoint.x && intersectPoint.x >= endPoint.x)
    || (intersectPoint.x <= startPoint.x && intersectPoint.x <= endPoint.x)
    || (intersectPoint.y >= startPoint.y && intersectPoint.y >= endPoint.y)
    || (intersectPoint.y <= startPoint.y && intersectPoint.y <= endPoint.y)
    ) {
      distance += Math.min(this.nodeDistance(waypoint, startPoint), this.nodeDistance(waypoint, endPoint));
    }
    return distance;
  },
  calculateSlope(line) {
    const deltaY = line[1].y - line[0].y;
    const deltaX = line[1].x - line[0].x;
    return deltaX !== 0 ? deltaY / deltaX : Infinity;
  },
  calculateIntercept(slope, point) {
    return point.y - slope * point.x;
  },
  intersectionOfTwoPoints(slope1, slope2, intercept1, intercept2) {
    const deltaX = slope1 - slope2;
    const deltaB = intercept2 - intercept1;
    const intersectX = deltaB / deltaX;
    const intersectY = slope1 * intersectX + intercept1;
    return { x: intersectX, y: intersectY };
  },
  nodeDistance(firstNode, secondNode) {
    const deltaXSquared = (secondNode.x - firstNode.x) ** 2;
    const deltaYSquared = (secondNode.y - firstNode.y) ** 2;
    return Math.sqrt(deltaXSquared + deltaYSquared);
  }
};

export default floorWaypointFinder;
