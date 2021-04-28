import { selectorStringToArray, selectorArrayToString } from "./utils";

const initGraphStyle = () => {
  const defaultStyle = {
    node: {
      diameter: "50px",
      color: "#A5ABB6",
      "border-color": "#9AA1AC",
      "border-width": "2px",
      "text-color-internal": "#FFFFFF",
      "font-size": "10px",
    },
    relationship: {
      color: "#A5ABB6",
      "shaft-width": "1px",
      "font-size": "8px",
      padding: "3px",
      "text-color-external": "#000000",
      "text-color-internal": "#FFFFFF",
      caption: "<type>",
    },
  };

  const defaultSizes = [
    {
      diameter: "10px",
    },
    {
      diameter: "20px",
    },
    {
      diameter: "35px",
    },
    {
      diameter: "50px",
    },
    {
      diameter: "65px",
    },
    {
      diameter: "80px",
    },
  ];

  const defaultIconCodes = [
    {
      "icon-code": "a",
    },
    {
      "icon-code": '"',
    },
    {
      "icon-code": "z",
    },
    {
      "icon-code": "_",
    },
    {
      "icon-code": "/",
    },
    {
      "icon-code": ">",
    },
    {
      "icon-code": "k",
    },
  ];

  const defaultArrayWidths = [
    {
      "shaft-width": "1px",
    },
    {
      "shaft-width": "2px",
    },
    {
      "shaft-width": "3px",
    },
    {
      "shaft-width": "5px",
    },
    {
      "shaft-width": "8px",
    },
    {
      "shaft-width": "13px",
    },
    {
      "shaft-width": "25px",
    },
    {
      "shaft-width": "38px",
    },
  ];

  const defaultColors = [
    {
      color: "#A5ABB6",
      "border-color": "#9AA1AC",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#604A0E",
      "border-color": "#423204",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#8A2BE2",
      "border-color": "#4B0082",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#C990C0",
      "border-color": "#b261a5",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#F79767",
      "border-color": "#f36924",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#57C7E3",
      "border-color": "#23b3d7",
      "text-color-internal": "#2A2C34",
    },
    {
      color: "#F16667",
      "border-color": "#eb2728",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#D9C8AE",
      "border-color": "#c0a378",
      "text-color-internal": "#2A2C34",
    },
    {
      color: "#8DCC93",
      "border-color": "#5db665",
      "text-color-internal": "#2A2C34",
    },
    {
      color: "#ECB5C9",
      "border-color": "#da7298",
      "text-color-internal": "#2A2C34",
    },
    {
      color: "#4C8EDA",
      "border-color": "#2870c2",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#FFC454",
      "border-color": "#d7a013",
      "text-color-internal": "#2A2C34",
    },
    {
      color: "#DA7194",
      "border-color": "#cc3c6c",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#569480",
      "border-color": "#447666",
      "text-color-internal": "#FFFFFF",
    },
    {
      color: "#404040",
      "border-color": "#080808",
      "text-color-internal": "#FFFFFF",
    },
  ];

  const Selector = (function () {
    function Selector(this: any, tag1: any, classes1: any) {
      this.tag = tag1;
      this.classes = classes1 != null ? classes1 : [];
    }

    Selector.prototype.toString = function () {
      return selectorArrayToString([this.tag].concat(this.classes));
    };

    return Selector;
  })();

  const StyleRule = (function () {
    function StyleRule(this: any, selector1: any, props1: any) {
      this.selector = selector1;
      this.props = props1;
    }

    StyleRule.prototype.matches = function (selector: any) {
      if (this.selector.tag !== selector.tag) {
        return false;
      }
      for (let i = 0; i < this.selector.classes.length; i++) {
        const classs = this.selector.classes[i];
        if (classs != null && selector.classes.indexOf(classs) === -1) {
          return false;
        }
      }
      return true;
    };

    StyleRule.prototype.matchesExact = function (selector: any) {
      return (
        this.matches(selector) &&
        this.selector.classes.length === selector.classes.length
      );
    };

    return StyleRule;
  })();

  const StyleElement = (function () {
    function StyleElement(this: any, selector: any) {
      this.selector = selector;
      this.props = {};
    }

    StyleElement.prototype.applyRules = function (rules: any) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.matches(this.selector)) {
          this.props = { ...this.props, ...rule.props };
          this.props.caption = this.props.caption || this.props.defaultCaption;
        }
      }
      return this;
    };

    StyleElement.prototype.get = function (attr: any) {
      return this.props[attr] || "";
    };

    return StyleElement;
  })();

  const GraphStyle = (function () {
    function GraphStyle(this: any) {
      this.rules = [];
      try {
        this.loadRules();
      } catch (_error) {
        // e = _error
      }
    }

    const parseSelector = function (key: any) {
      const tokens = selectorStringToArray(key);
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      return new Selector(tokens[0], tokens.slice(1));
    };

    const selector = function (item: any) {
      if (item.isNode) {
        return nodeSelector(item);
      } else if (item.isRelationship) {
        return relationshipSelector(item);
      }
    };

    const nodeSelector = function (node: any = {}) {
      const classes = node.labels != null ? node.labels : [];
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      return new Selector("node", classes);
    };

    const relationshipSelector = function (rel: any = {}) {
      const classes = rel.type != null ? [rel.type] : [];
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      return new Selector("relationship", classes);
    };

    const findRule = function (selector: any, rules: any) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.matchesExact(selector)) {
          return rule;
        }
      }
    };

    const findAvailableDefaultColor = function (rules: any) {
      const usedColors = rules
        .filter((rule: any) => {
          return rule.props.color != null;
        })
        .map((rule: any) => {
          return rule.props.color;
        });
      const index =
        usedColors.length - 1 > defaultColors.length - 1
          ? 0
          : usedColors.length - 1;
      return defaultColors[index];
    };

    const getDefaultNodeCaption = function (item: any) {
      if (
        !item ||
        // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
        !(item.propertyList != null ? item.propertyList.length : 0) > 0
      ) {
        return {
          defaultCaption: "<id>",
        };
      }
      const captionPrioOrder = [
        /^name$/i,
        /^title$/i,
        /^label$/i,
        /name$/i,
        /description$/i,
        /^.+/,
      ];
      let defaultCaption = captionPrioOrder.reduceRight((leading, current) => {
        const hits = item.propertyList.filter((prop: any) =>
          current.test(prop.key)
        );
        if (hits.length) {
          return `{${hits[0].key}}`;
        } else {
          return leading;
        }
      }, "");
      defaultCaption || (defaultCaption = "<id>");
      return {
        caption: defaultCaption,
      };
    };

    GraphStyle.prototype.calculateStyle = function (selector: any) {
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      return new StyleElement(selector).applyRules(this.rules);
    };

    GraphStyle.prototype.forEntity = function (item: any) {
      return this.calculateStyle(selector(item));
    };

    GraphStyle.prototype.setDefaultNodeStyling = function (
      selector: any,
      item: any
    ) {
      let defaultColor = true;
      let defaultCaption = true;
      for (let i = 0; i < this.rules.length; i++) {
        const rule = this.rules[i];
        if (rule.selector.classes.length > 0 && rule.matches(selector)) {
          if (rule.props.hasOwnProperty("color")) {
            defaultColor = false;
          }
          if (rule.props.hasOwnProperty("caption")) {
            defaultCaption = false;
          }
        }
      }
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      const minimalSelector = new Selector(
        selector.tag,
        selector.classes.sort().slice(0, 1)
      );
      if (defaultColor) {
        this.changeForSelector(
          minimalSelector,
          findAvailableDefaultColor(this.rules)
        );
      }
      if (defaultCaption) {
        return this.changeForSelector(
          minimalSelector,
          getDefaultNodeCaption(item)
        );
      }
    };

    GraphStyle.prototype.changeForSelector = function (
      selector: any,
      props: any
    ) {
      let rule = findRule(selector, this.rules);
      if (rule == null) {
        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        rule = new StyleRule(selector, props);
        this.rules.push(rule);
      }
      rule.props = { ...rule.props, ...props };
      return rule;
    };

    GraphStyle.prototype.destroyRule = function (rule: any) {
      const idx = this.rules.indexOf(rule);
      if (idx != null) {
        this.rules.splice(idx, 1);
      }
    };

    GraphStyle.prototype.importGrass = function (string: any) {
      try {
        const rules = this.parse(string);
        return this.loadRules(rules);
      } catch (_error) {
        // e = _error
      }
    };

    GraphStyle.prototype.parse = function (string: any) {
      const chars = string.split("");
      let insideString = false;
      let insideProps = false;
      let keyword = "";
      let props = "";
      const rules: any = {};
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        let skipThis = true;
        switch (c) {
          case "{":
            if (!insideString) {
              insideProps = true;
            } else {
              skipThis = false;
            }
            break;
          case "}":
            if (!insideString) {
              insideProps = false;
              rules[keyword] = props;
              keyword = "";
              props = "";
            } else {
              skipThis = false;
            }
            break;
          case "'":
            // @ts-expect-error ts-migrate(2447) FIXME: The '^=' operator is not allowed for boolean types... Remove this comment to see the full error message
            insideString ^= true;
            break;
          default:
            skipThis = false;
        }
        if (skipThis) {
          continue;
        }
        if (insideProps) {
          props += c;
        } else {
          if (!c.match(/[\s\n]/)) {
            keyword += c;
          }
        }
      }
      for (const k in rules) {
        const v = rules[k];
        rules[k] = {};
        v.split(";").forEach((prop: any) => {
          const [key, val] = prop.split(":");
          if (key && val) {
            rules[k][key.trim()] = val.trim();
          }
        });
      }
      return rules;
    };

    GraphStyle.prototype.resetToDefault = function () {
      this.loadRules();
      return true;
    };

    GraphStyle.prototype.toSheet = function () {
      const sheet: any = {};
      this.rules.forEach((rule: any) => {
        sheet[rule.selector.toString()] = rule.props;
      });
      return sheet;
    };

    GraphStyle.prototype.toString = function () {
      let str = "";
      this.rules.forEach((r: any) => {
        str += `${r.selector.toString()} {\n`;
        for (const k in r.props) {
          let v = r.props[k];
          if (k === "caption") {
            v = `'${v}'`;
          }
          str += `  ${k}: ${v};\n`;
        }
        str += "}\n\n";
      });
      return str;
    };

    GraphStyle.prototype.loadRules = function (data: any) {
      const localData = typeof data === "object" ? data : defaultStyle;
      this.rules.length = 0;
      for (const key in localData) {
        const props = localData[key];
        // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        this.rules.push(new StyleRule(parseSelector(key), props));
      }
      return this;
    };

    GraphStyle.prototype.defaultSizes = function () {
      return defaultSizes;
    };

    GraphStyle.prototype.defaultIconCodes = function () {
      return defaultIconCodes;
    };

    GraphStyle.prototype.defaultArrayWidths = function () {
      return defaultArrayWidths;
    };

    GraphStyle.prototype.defaultColors = function () {
      return defaultColors;
    };

    GraphStyle.prototype.interpolate = function (str: any, item: any) {
      let ips = str.replace(/\{([^{}]*)\}/g, (_a: any, b: any) => {
        const r = item.propertyMap[b];
        if (typeof r === "object") {
          return r.join(", ");
        }
        if (typeof r === "string" || typeof r === "number") {
          return r;
        }
        return "";
      });
      if (ips.length < 1 && str === "{type}" && item.isRelationship) {
        ips = "<type>";
      }
      if (ips.length < 1 && str === "{id}" && item.isNode) {
        ips = "<id>";
      }
      return ips.replace(/^<(id|type)>$/, (_a: any, b: any) => {
        const r = item[b];
        if (typeof r === "string" || typeof r === "number") {
          return r;
        }
        return "";
      });
    };

    GraphStyle.prototype.forNode = function (node: any = {}) {
      const selector = nodeSelector(node);
      if ((node.labels != null ? node.labels.length : 0) > 0) {
        this.setDefaultNodeStyling(selector, node);
      }
      return this.calculateStyle(selector);
    };

    GraphStyle.prototype.forRelationship = function (rel: any) {
      const selector = relationshipSelector(rel);
      return this.calculateStyle(selector);
    };

    return GraphStyle;
  })();
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  return new GraphStyle();
};

const createStyleGetter = (type: string, graphStyle: any) => {
  if (type === "node") {
    return (text: string) => {
      const styleForItem = graphStyle.forNode({
        labels: [text],
      });

      return {
        backgroundColor: styleForItem.get("color"),
        color: styleForItem.get("text-color-internal"),
      };
    };
  }

  if (type === "relationship") {
    return (text: string) => {
      const styleForItem = graphStyle.forRelationship({
        type: text,
      });

      return {
        backgroundColor: styleForItem.get("color"),
        color: styleForItem.get("text-color-internal"),
      };
    };
  }
  throw new Error(`Unsupported argument: ${type}`);
};

const createNodeStyleGetter = (graphStyle: any) => {
  return createStyleGetter("node", graphStyle);
};

const createRelationshipStyleGetter = (graphStyle: any) => {
  return createStyleGetter("relationship", graphStyle);
};

export { initGraphStyle, createNodeStyleGetter, createRelationshipStyleGetter };
