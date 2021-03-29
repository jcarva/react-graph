export default class LoopArrow {
  midShaftPoint: any;
  outline: any;
  overlay: any;
  shaftLength: any;
  constructor(
    nodeRadius: any,
    straightLength: any,
    spreadDegrees: any,
    shaftWidth: any,
    headWidth: any,
    headLength: any,
    captionHeight: any
  ) {
    const spread = (spreadDegrees * Math.PI) / 180;
    const r1 = nodeRadius;
    const r2 = nodeRadius + headLength;
    const r3 = nodeRadius + straightLength;
    const loopRadius = r3 * Math.tan(spread / 2);
    const shaftRadius = shaftWidth / 2;
    this.shaftLength = loopRadius * 3 + shaftWidth;

    class Point {
      x: any;
      y: any;
      constructor(x: any, y: any) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return `${this.x} ${this.y}`;
      }
    }

    const normalPoint = function (sweep: any, radius: any, displacement: any) {
      const localLoopRadius = radius * Math.tan(spread / 2);
      const cy = radius / Math.cos(spread / 2);
      return new Point(
        (localLoopRadius + displacement) * Math.sin(sweep),
        cy + (localLoopRadius + displacement) * Math.cos(sweep)
      );
    };
    this.midShaftPoint = normalPoint(
      0,
      r3,
      shaftRadius + captionHeight / 2 + 2
    );
    const startPoint = (radius: any, displacement: any) =>
      normalPoint((Math.PI + spread) / 2, radius, displacement);
    const endPoint = (radius: any, displacement: any) =>
      normalPoint(-(Math.PI + spread) / 2, radius, displacement);

    this.outline = function () {
      const inner = loopRadius - shaftRadius;
      const outer = loopRadius + shaftRadius;
      return [
        "M",
        startPoint(r1, shaftRadius),
        "L",
        startPoint(r3, shaftRadius),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, shaftRadius),
        "L",
        endPoint(r2, shaftRadius),
        "L",
        endPoint(r2, -headWidth / 2),
        "L",
        endPoint(r1, 0),
        "L",
        endPoint(r2, headWidth / 2),
        "L",
        endPoint(r2, -shaftRadius),
        "L",
        endPoint(r3, -shaftRadius),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -shaftRadius),
        "L",
        startPoint(r1, -shaftRadius),
        "Z",
      ].join(" ");
    };

    this.overlay = function (minWidth: any) {
      const displacement = Math.max(minWidth / 2, shaftRadius);
      const inner = loopRadius - displacement;
      const outer = loopRadius + displacement;
      return [
        "M",
        startPoint(r1, displacement),
        "L",
        startPoint(r3, displacement),
        "A",
        outer,
        outer,
        0,
        1,
        1,
        endPoint(r3, displacement),
        "L",
        endPoint(r2, displacement),
        "L",
        endPoint(r2, -displacement),
        "L",
        endPoint(r3, -displacement),
        "A",
        inner,
        inner,
        0,
        1,
        0,
        startPoint(r3, -displacement),
        "L",
        startPoint(r1, -displacement),
        "Z",
      ].join(" ");
    };
  }
}
