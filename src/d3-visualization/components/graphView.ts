import viz from "./visualization";
import layout from "./layout";

class GraphView {
  callbacks: any;
  graph: any;
  style: any;
  viz: any;
  constructor(element: any, measureSize: any, graph: any, style: any) {
    this.graph = graph;
    this.style = style;
    const forceLayout = layout.force();
    this.viz = viz(element, measureSize, this.graph, forceLayout, this.style);
    this.callbacks = {};
    const { callbacks } = this;
    this.viz.trigger = (() => (event: any, ...args: any[]) =>
      Array.from(callbacks[event] || []).map((callback: any) =>
        callback.apply(null, args)
      ))();
  }

  on(event: any, callback: any) {
    (this.callbacks[event] != null
      ? this.callbacks[event]
      : (this.callbacks[event] = [])
    ).push(callback);
    return this;
  }

  layout(value: any) {
    if (!arguments.length) {
      return this.layout;
    }
    this.layout = value;
    return this;
  }

  grass(value: any) {
    if (!arguments.length) {
      return this.style.toSheet();
    }
    this.style.importGrass(value);
    return this;
  }

  update() {
    this.viz.update();
    return this;
  }

  resize() {
    this.viz.resize();
    return this;
  }

  boundingBox() {
    return this.viz.boundingBox();
  }

  collectStats() {
    return this.viz.collectStats();
  }

  zoomIn(elem: any) {
    return this.viz.zoomInClick(elem);
  }

  zoomOut(elem: any) {
    return this.viz.zoomOutClick(elem);
  }
}

export { GraphView };
