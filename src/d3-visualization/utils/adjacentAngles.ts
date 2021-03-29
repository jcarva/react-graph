export default class AdjacentAngles {
  findRuns(AngleList: any, minSeparation: any) {
    let p = 0;
    let start = 0;
    let end = 0;
    const runs: any = [];
    const minStart = function () {
      if (runs.length === 0) {
        return 0;
      } else {
        return runs[0].start;
      }
    };

    const scanForDensePair = function () {
      start = p;
      end = AngleList.wrapIndex(p + 1);
      if (end === minStart()) {
        return "done";
      } else {
        p = end;
        if (tooDense(start, end)) {
          return extendEnd;
        } else {
          return scanForDensePair;
        }
      }
    };

    const extendEnd = function () {
      if (p === minStart()) {
        return "done";
      } else if (tooDense(start, AngleList.wrapIndex(p + 1))) {
        end = AngleList.wrapIndex(p + 1);
        p = end;
        return extendEnd;
      } else {
        p = start;
        return extendStart;
      }
    };

    const extendStart = function () {
      const candidateStart = AngleList.wrapIndex(p - 1);
      if (tooDense(candidateStart, end) && candidateStart !== end) {
        start = candidateStart;
        p = start;
        return extendStart;
      } else {
        runs.push({
          start,
          end,
        });
        p = end;
        return scanForDensePair;
      }
    };

    const tooDense = function (start: any, end: any) {
      const run = {
        start,
        end,
      };
      return AngleList.angle(run) < AngleList.length(run) * minSeparation;
    };

    let stepCount = 0;
    let step = scanForDensePair;
    // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'true' since the... Remove this comment to see the full error message
    while (step !== "done") {
      if (stepCount++ > AngleList.totalLength() * 10) {
        console.log(
          "Warning: failed to layout arrows",
          (() => {
            const result = [];
            for (const key of Object.keys(AngleList.list || {})) {
              const value = AngleList.list[key];
              result.push(`${key}: ${value.angle}`);
            }
            return result;
          })().join("\n"),
          minSeparation
        );
        break;
      }
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type '() => ...... Remove this comment to see the full error message
      step = step();
    }

    return runs;
  }
}
