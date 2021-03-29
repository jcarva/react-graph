import d3 from "d3";

const measureUsingCanvas = function (text: any, font: any) {
  const canvasSelection = d3
    .select("canvas#textMeasurementCanvas") // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    .data([this]);
  canvasSelection
    .enter()
    .append("canvas")
    .attr("id", "textMeasurementCanvas")
    .style("display", "none");

  const canvas = canvasSelection.node() as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = font;
  return context.measureText(text).width;
};

const cache = function () {
  const cacheSize = 10000;
  const map: any = {};
  const list: any = [];
  return (key: any, calc: any) => {
    const cached = map[key];
    if (cached) {
      return cached;
    } else {
      const result = calc();
      if (list.length > cacheSize) {
        delete map[list.splice(0, 1)];
        list.push(key);
      }
      return (map[key] = result);
    }
  };
};

export default function (text: any, fontFamily: any, fontSize: any) {
  const font = `normal normal normal ${fontSize}px/normal ${fontFamily}`;
  return cache()(text + font, () => measureUsingCanvas(text, font));
}
