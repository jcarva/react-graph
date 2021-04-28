class Relationship {
  id: any;
  propertyList: any;
  propertyMap: any;
  source: any;
  target: any;
  type: any;
  isNode = false;
  isRelationship = true;
  constructor(id: any, source: any, target: any, type: any, properties: any) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.type = type;
    this.propertyMap = properties;
    this.propertyList = (() => {
      const result = [];
      for (const key of Object.keys(this.propertyMap || {})) {
        const value = this.propertyMap[key];
        result.push({ key, value });
      }
      return result;
    })();
  }

  toJSON() {
    return this.propertyMap;
  }

  isLoop() {
    return this.source === this.target;
  }
}

export { Relationship };
