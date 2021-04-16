/* global btoa */

export const deduplicateNodes = (nodes: any) => {
  return nodes.reduce(
    (all: any, curr: any) => {
      if (all.taken.indexOf(curr.id) > -1) {
        return all;
      } else {
        all.nodes.push(curr);
        all.taken.push(curr.id);
        return all;
      }
    },
    { nodes: [], taken: [] }
  ).nodes;
};

export const deepEquals = (x: any, y: any): any => {
  if (x && y && typeof x === "object" && typeof y === "object") {
    if (Object.keys(x).length !== Object.keys(y).length) return false;
    return Object.keys(x).every((key) => deepEquals(x[key], y[key]));
  }
  if (typeof x === "function" && typeof y === "function") {
    return x.toString() === y.toString();
  }
  return x === y;
};

export const flatten = (arr: any) =>
  arr.reduce(
    (a: any, b: any) => a.concat(Array.isArray(b) ? flatten(b) : b),
    []
  );

export const stringifyMod = (
  value: any,
  modFn: any = null,
  pretty: any = false,
  skipOpeningIndentation = false
): any => {
  const prettyLevel = !pretty ? false : pretty === true ? 1 : parseInt(pretty);
  const nextPrettyLevel = prettyLevel ? prettyLevel + 1 : false;
  const newLine = prettyLevel ? "\n" : "";
  const indentation =
    prettyLevel && !skipOpeningIndentation ? Array(prettyLevel).join("  ") : "";
  const nextIndentation =
    nextPrettyLevel && !skipOpeningIndentation
      ? Array(nextPrettyLevel).join("  ")
      : "";
  const endIndentation = prettyLevel ? Array(prettyLevel).join("  ") : "";
  const propSpacing = prettyLevel ? " " : "";
  const toString = Object.prototype.toString;
  const isArray =
    Array.isArray ||
    function (a) {
      return toString.call(a) === "[object Array]";
    };
  const escMap: any = {
    '"': '\\"',
    "\\": "\\",
    "\b": "\b",
    "\f": "\f",
    "\n": "\n",
    "\r": "\r",
    "\t": "\t",
  };
  const escFunc = function (m: any) {
    return (
      escMap[m] || `\\u${(m.charCodeAt(0) + 0x10000).toString(16).substr(1)}`
    );
  };
  const escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
  if (modFn) {
    const modVal = modFn && modFn(value);
    if (typeof modVal !== "undefined") return indentation + modVal;
  }
  if (value == null) return `${indentation}null`;
  if (typeof value === "number") {
    return indentation + (isFinite(value) ? value.toString() : "null");
  }
  if (typeof value === "boolean") return `${indentation}${value.toString()}`;
  if (typeof value === "object") {
    if (typeof value.toJSON === "function") {
      return stringifyMod(value.toJSON(), modFn, nextPrettyLevel);
    } else if (isArray(value)) {
      let hasValues = false;
      let res = "";
      for (let i = 0; i < value.length; i++) {
        hasValues = true;
        res +=
          (i ? "," : "") +
          newLine +
          stringifyMod(value[i], modFn, nextPrettyLevel);
      }
      return `${indentation}[${res}${
        hasValues ? newLine + endIndentation : ""
      }]`;
    } else if (toString.call(value) === "[object Object]") {
      const tmp = [];
      for (const k in value) {
        if (value.hasOwnProperty(k)) {
          tmp.push(
            `${nextIndentation}${JSON.stringify(
              k
            )}:${propSpacing}${stringifyMod(
              value[k],
              modFn,
              nextPrettyLevel,
              true
            )}`
          );
        }
      }
      return `${indentation}{${newLine}${tmp.join(
        `,${newLine}`
      )}${newLine}${endIndentation}}`;
    }
  }
  return `${indentation}"${value.toString().replace(escRE, escFunc)}"`;
};

export const optionalToString = (v: any) =>
  ![null, undefined].includes(v) && typeof v.toString === "function"
    ? v.toString()
    : v;

export const toKeyString = (str: any) => btoa(encodeURIComponent(str));

/* grass utils */

export const selectorStringToArray = (selector: any) => {
  // Negative lookbehind simulation since js support is very limited.
  // We want to match all . that are not preceded by \\
  // Instead we reverse and look
  // for . that are not followed by \\ (negative lookahead)
  const reverseSelector = selector.split("").reverse().join("");
  const re = /(.+?)(?!\.\\)(?:\.|$)/g;
  const out = [];
  let m;
  while ((m = re.exec(reverseSelector)) !== null) {
    const res = m[1].split("").reverse().join("");
    out.push(res);
  }

  return out
    .filter((r) => r)
    .reverse()
    .map((r) => r.replace(/\\./g, "."));
};

export const selectorArrayToString = (selectors: any) => {
  const escaped = selectors.map((r: any) => r.replace(/\./g, "\\."));
  return escaped.join(".");
};

/* numberToUSLocale */
export const numberToUSLocale = (
  value: null | undefined | number | string
): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const n = typeof value === "number" ? value : parseInt(value, 10);
  if (isNaN(n)) {
    return n.toString();
  }

  return n.toLocaleString("en-US");
};
