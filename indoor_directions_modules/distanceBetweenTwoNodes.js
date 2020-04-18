const distanceBetweenTwoNodes = {
  /**
   * Distance between two points (assumes points are in two dimensions).
   * @param {String} firstNode - First point of line formed by two points.
   * @param {String} secondNode - Second point of line formed by two points.
   */
  nodeDistance(firstNode, secondNode) {
    const deltaXSquared = (secondNode.x - firstNode.x) ** 2;
    const deltaYSquared = (secondNode.y - firstNode.y) ** 2;
    return Math.sqrt(deltaXSquared + deltaYSquared);
  }
};

export default distanceBetweenTwoNodes;
