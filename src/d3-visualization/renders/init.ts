import { Renderer } from "../components/renderer";
const noop = function () {};

const nodeRingStrokeSize = 8;

const nodeOutline = new Renderer({
  onGraphChange(selection: any, viz: any) {
    const circles = selection
      .selectAll("circle.outline")
      .data((node: any) => [node]);

    circles.enter().append("circle").classed("outline", true).attr({
      cx: 0,
      cy: 0,
    });

    circles.attr({
      r(node: any) {
        return node.radius;
      },
      fill(node: any) {
        return viz.style.forNode(node).get("color");
      },
      stroke(node: any) {
        return viz.style.forNode(node).get("border-color");
      },
      "stroke-width"(node: any) {
        return viz.style.forNode(node).get("border-width");
      },
    });

    return circles.exit().remove();
  },
  onTick: noop,
});

const nodeCaption = new Renderer({
  onGraphChange(selection: any, viz: any) {
    const text = selection
      .selectAll("text.caption")
      .data((node: any) => node.caption);

    text
      .enter()
      .append("text")
      // .classed('caption', true)
      .attr({ "text-anchor": "middle" })
      .attr({ "pointer-events": "none" });

    text
      .text((line: any) => line.text)
      .attr("x", 0)
      .attr("y", (line: any) => line.baseline)
      .attr("font-size", (line: any) =>
        viz.style.forNode(line.node).get("font-size")
      )
      .attr({
        fill(line: any) {
          return viz.style.forNode(line.node).get("text-color-internal");
        },
      });

    return text.exit().remove();
  },

  onTick: noop,
});

const nodeIcon = new Renderer({
  onGraphChange(selection: any, viz: any) {
    const text = selection.selectAll("text").data((node: any) => node.caption);

    text
      .enter()
      .append("text")
      .attr({ "text-anchor": "middle" })
      .attr({ "pointer-events": "none" })
      .attr({ "font-family": "streamline" });

    text
      .text((line: any) => viz.style.forNode(line.node).get("icon-code"))
      .attr("dy", (line: any) => line.node.radius / 16)
      .attr("font-size", (line: any) => line.node.radius)
      .attr({
        fill(line: any) {
          return viz.style.forNode(line.node).get("text-color-internal");
        },
      });

    return text.exit().remove();
  },

  onTick: noop,
});

const nodeRing = new Renderer({
  onGraphChange(selection: any) {
    const circles = selection
      .selectAll("circle.ring")
      .data((node: any) => [node]);
    circles
      .enter()
      .insert("circle", ".outline")
      .classed("ring", true)
      .attr({
        cx: 0,
        cy: 0,
        "stroke-width": `${nodeRingStrokeSize}px`,
      });

    circles.attr({
      r(node: any) {
        return node.radius + 4;
      },
    });

    return circles.exit().remove();
  },

  onTick: noop,
});

const arrowPath = new Renderer({
  name: "arrowPath",
  onGraphChange(selection: any, viz: any) {
    const paths = selection.selectAll("path.outline").data((rel: any) => [rel]);

    paths.enter().append("path").classed("outline", true);

    paths
      .attr("fill", (rel: any) => viz.style.forRelationship(rel).get("color"))
      .attr("stroke", "none");

    return paths.exit().remove();
  },

  onTick(selection: any) {
    return selection
      .selectAll("path")
      .attr("d", (d: any) => d.arrow.outline(d.shortCaptionLength));
  },
});

const relationshipType = new Renderer({
  name: "relationshipType",
  onGraphChange(selection: any, viz: any) {
    const texts = selection.selectAll("text").data((rel: any) => [rel]);

    texts
      .enter()
      .append("text")
      .attr({ "text-anchor": "middle" })
      .attr({ "pointer-events": "none" });

    texts
      .attr("font-size", (rel: any) =>
        viz.style.forRelationship(rel).get("font-size")
      )
      .attr("fill", (rel: any) =>
        viz.style.forRelationship(rel).get(`text-color-${rel.captionLayout}`)
      );

    return texts.exit().remove();
  },

  onTick(selection: any, viz: any) {
    return selection
      .selectAll("text")
      .attr("x", (rel: any) => rel.arrow.midShaftPoint.x)
      .attr(
        "y",
        (rel: any) =>
          rel.arrow.midShaftPoint.y +
          parseFloat(viz.style.forRelationship(rel).get("font-size")) / 2 -
          1
      )
      .attr("transform", (rel: any) => {
        if (rel.naturalAngle < 90 || rel.naturalAngle > 270) {
          return `rotate(180 ${rel.arrow.midShaftPoint.x} ${rel.arrow.midShaftPoint.y})`;
        } else {
          return null;
        }
      })
      .text((rel: any) => rel.shortCaption);
  },
});

const relationshipOverlay = new Renderer({
  name: "relationshipOverlay",
  onGraphChange(selection: any) {
    const rects = selection.selectAll("path.overlay").data((rel: any) => [rel]);

    rects.enter().append("path").classed("overlay", true);

    return rects.exit().remove();
  },

  onTick(selection: any) {
    const band = 16;

    return selection
      .selectAll("path.overlay")
      .attr("d", (d: any) => d.arrow.overlay(band));
  },
});

const node = [];
node.push(nodeOutline);
node.push(nodeIcon);
node.push(nodeCaption);
node.push(nodeRing);

const relationship = [];
relationship.push(arrowPath);
relationship.push(relationshipType);
relationship.push(relationshipOverlay);

export { node, relationship };
