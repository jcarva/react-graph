/* global DOMParser */

import d3 from "d3";
(d3.selection as any).enter.prototype.appendSVG = function (SVGString: any) {
  return this.select(function () {
    // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    return this.appendChild(
      document.importNode(
        new DOMParser().parseFromString(SVGString, "application/xml")
          .documentElement.firstChild as ChildNode,
        true
      )
    );
  });
};
