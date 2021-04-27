import d3 from "d3";

export default function clickHandler() {
  const cc = function (selection: any) {
    // euclidean distance
    const dist = (a: any, b: any) =>
      a && b // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
        ? Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2))
        : 1;
    let down: any;
    const tolerance = 5;
    let wait: any = null;
    selection.on("mousedown", () => {
      ((d3.event as Event).target as any).__data__.fixed = true;
      down = d3.mouse(document.body);
      return (d3.event as Event).stopPropagation();
    });

    return selection.on("mouseup", () => {
      if (dist(down, d3.mouse(document.body)) > tolerance) {
      } else {
        if (wait) {
          window.clearTimeout(wait);
          wait = null;
          return event.dblclick((d3.event as any).target.__data__);
        } else {
          event.click((d3.event as any).target.__data__);
          return (wait = window.setTimeout(
            ((_e) => () => (wait = null))(d3.event),
            250
          ));
        }
      }
    });
  };

  const event = d3.dispatch("click", "dblclick");
  return d3.rebind(cc, event, "on");
}
