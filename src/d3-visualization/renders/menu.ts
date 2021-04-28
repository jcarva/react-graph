import d3 from "d3";
import { Renderer } from "../components/renderer";
import icons from "./icons";

const noop = function () {};

const numberOfItemsInContextMenu = 3;

const arc = function (radius?: any, itemNumber?: any, width?: any) {
  const localWidth = width == null ? 30 : width;
  const startAngle =
    ((2 * Math.PI) / numberOfItemsInContextMenu) * (itemNumber - 1);
  const endAngle = startAngle + (2 * Math.PI) / numberOfItemsInContextMenu;
  const innerRadius = Math.max(radius + 8, 20);
  return d3.svg
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + localWidth)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(0.03);
};

const getSelectedNode = function (node: any) {
  if (node.selected) {
    return [node];
  } else {
    return [];
  }
};

const attachContextEvent = (
  event: any,
  elems: any[],
  viz: any,
  content: any,
  label: any
) =>
  (() => {
    const result = [];
    for (const elem of Array.from(elems)) {
      elem.on("mousedown.drag", () => {
        (d3.event as Event).stopPropagation();
        return null;
      });
      elem.on("mouseup", (node: any) => viz.trigger(event, node));
      elem.on("mouseover", (node: any) => {
        node.contextMenu = {
          menuSelection: event,
          menuContent: content,
          label,
        };
        return viz.trigger("menuMouseOver", node);
      });
      result.push(
        elem.on("mouseout", (node: any) => {
          delete node.contextMenu;
          return viz.trigger("menuMouseOut", node);
        })
      );
    }
    return result;
  })();

const createMenuItem = function (
  selection: any,
  viz: any,
  eventName: any,
  itemNumber: any,
  className: any,
  position: any,
  textValue: any,
  helpValue: any
) {
  const path = selection.selectAll(`path.${className}`).data(getSelectedNode);
  const iconPath = selection
    .selectAll(`.icon.${className}`)
    .data(getSelectedNode);

  const tab = path
    .enter()
    .append("path")
    .classed(className, true)
    .classed("context-menu-item", true)
    .attr({
      d(node: any) {
        // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
        return arc(node.radius, itemNumber, 1)();
      },
    });

  const rawSvgIcon = icons[textValue];
  const icon = iconPath
    .enter()
    .appendSVG(rawSvgIcon)
    .classed(className, true)
    .classed("context-menu-item", true)
    .attr({
      transform(node: any) {
        return `translate(${Math.floor(
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          arc(node.radius, itemNumber).centroid()[0] + (position[0] * 100) / 100
        )},${Math.floor(
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          arc(node.radius, itemNumber).centroid()[1] + (position[1] * 100) / 100
        )}) scale(0.7)`;
      },
      color(node: any) {
        return viz.style.forNode(node).get("text-color-internal");
      },
    });

  attachContextEvent(eventName, [tab, icon], viz, helpValue, rawSvgIcon);

  tab
    .transition()
    .duration(200)
    .attr({
      d(node: any) {
        // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
        return arc(node.radius, itemNumber)();
      },
    });

  path
    .exit()
    .transition()
    .duration(200)
    .attr({
      d(node: any) {
        // @ts-expect-error Expected 1-2 arguments, but got 0.ts(2554)
        return arc(node.radius, itemNumber, 1)();
      },
    })
    .remove();

  return iconPath.exit().remove();
};

const donutRemoveNode = new Renderer({
  onGraphChange(selection: any, viz: any) {
    return createMenuItem(
      selection,
      viz,
      "nodeClose",
      1,
      "remove_node",
      [-8, 0],
      "Remove",
      "Dismiss"
    );
  },

  onTick: noop,
});

const donutExpandNode = new Renderer({
  onGraphChange(selection: any, viz: any) {
    return createMenuItem(
      selection,
      viz,
      "nodeDblClicked",
      2,
      "expand_node",
      [-8, -10],
      "Expand / Collapse",
      "Expand / Collapse child relationships"
    );
  },

  onTick: noop,
});

const donutUnlockNode = new Renderer({
  onGraphChange(selection: any, viz: any) {
    return createMenuItem(
      selection,
      viz,
      "nodeUnlock",
      3,
      "unlock_node",
      [-10, -6],
      "Unlock",
      "Unlock the node to re-layout the stacked"
    );
  },

  onTick: noop,
});

const menu: any[] = [];

menu.push(donutExpandNode);
menu.push(donutRemoveNode);
menu.push(donutUnlockNode);

export { menu };
