import distanceBetweenTwoNodes from './distanceBetweenTwoNodes';

const floorWaypointFinder = {
  /**
   * The calculator to determine which exit point is the closest for the multi-floor pathfinder.
   * The main steps are as follows:
   * 1. Get the intersection between the line formed by start point to finish point (coordinates are
   * very close by even on different floors due to building structure).
   * 2. Get the distance between the current exit point being analyzed and the intersection point.
   * 3. Get the distance between the intersection point and the line formed by start point and
   * finish point (this distance is 0 if the intersection falls between the mentioned start point
   * and finish point).
   *
   * @param {Object} waypoint - The current exit noide being analyzed.
   * @param {Object} startPoint - The start node of a multi-floor directions specification.
   * @param {Object} finishPoint - The finish node of a multi-floor directions specification.
   */
  distanceToWaypointCalculator(waypoint, startPoint, endPoint) {
    const originalX = this.calculateSlope([startPoint, endPoint]);
    let intersectPoint;
    // If the lines are horizontal and vertical, cannot find the intersect by systems of
    // equations.
    if (originalX === 0) {
      intersectPoint = { x: waypoint.x, y: startPoint.y };
    } else if (originalX === Infinity) {
      intersectPoint = { x: startPoint.x, y: waypoint.y };
    } else {
      const originalB = this.calculateIntercept(originalX, startPoint);
      const perpendicularX = -1 / originalX;
      const perpendicularB = this.calculateIntercept(perpendicularX, waypoint);
      intersectPoint = this.intersectionOfTwoPoints(originalX, perpendicularX, originalB, perpendicularB);
    }
    let distance = distanceBetweenTwoNodes.nodeDistance(waypoint, intersectPoint);
    // To determine if the waypoint is not in between start point and finish point, simply determine if it's
    // outside the x boundaries or the y boundaries (a straight line formation guarantees that these
    // conditions satisfies being "outside the line").
    if ((intersectPoint.x > startPoint.x && intersectPoint.x > endPoint.x)
    || (intersectPoint.x < startPoint.x && intersectPoint.x < endPoint.x)
    || (intersectPoint.y > startPoint.y && intersectPoint.y > endPoint.y)
    || (intersectPoint.y < startPoint.y && intersectPoint.y < endPoint.y)
    ) {
      distance += Math.min(
        distanceBetweenTwoNodes.nodeDistance(intersectPoint, startPoint),
        distanceBetweenTwoNodes.nodeDistance(intersectPoint, endPoint)
      );
    }
    return distance;
  },
  /**
   * Find the slope of the line by the deltaY/deltaX method.
   * @param {Object} line - Represents a line by carrying two points in an array (which are objects with
   * x and y coordinates).
   */
  calculateSlope(line) {
    const deltaY = line[1].y - line[0].y;
    const deltaX = line[1].x - line[0].x;
    return deltaX !== 0 ? deltaY / deltaX : Infinity;
  },
  /**
   * Find the y-intercept of a line with knowledge of the line's slope and a point of the line.
   * @param {Number} slope - Represents the existing slope of a line.
   * @param {Object} point - Represents the point used to assist in the calculation of
   * the y-intercept.
   */
  calculateIntercept(slope, point) {
    return point.y - slope * point.x;
  },
  /**
  * Find the intersection of two points by systems of equations. Uses the comparison method
  * (e.g. y = x+1, y = 2x+3, solve x+1 = 2x+3 to find x, plugin x to find y).
  * @param {Number} slope1 - Slope of first line.
  * @param {Object} slope2 - Slope of second line.
  * @param {Object} intercept1 - y-intercept of first line.
  * @param {Object} intercept2 - y-intercept of second line.
  */
  intersectionOfTwoPoints(slope1, slope2, intercept1, intercept2) {
    const deltaX = slope1 - slope2;
    const deltaB = intercept2 - intercept1;
    const intersectX = deltaB / deltaX;
    const intersectY = slope1 * intersectX + intercept1;
    return { x: intersectX, y: intersectY };
  }
};

export default floorWaypointFinder;
