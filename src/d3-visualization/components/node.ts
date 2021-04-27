class Node {
  id: any;
  labels: any;
  propertyList: any;
  propertyMap: any;
  isNode = true;
  isRelationship = false;

  constructor(id: any, labels: any, properties: any) {
    this.id = id;
    this.labels = labels;
    this.propertyMap = properties;
    this.propertyList = (() => {
      const result = [];
      for (const key of Object.keys(properties || {})) {
        const value = properties[key];
        result.push({ key, value });
      }
      return result;
    })();
  }

  toJSON() {
    return this.propertyMap;
  }

  relationshipCount(graph: any) {
    const node = this;
    const rels = [];
    for (const relationship of Array.from(graph.relationships())) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      if (relationship.source === node || relationship.target === node) {
        rels.push(relationship);
      }
    }
    return rels.length;
  }
}

export { Node };
