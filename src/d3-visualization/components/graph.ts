class Graph {
  _nodes: any;
  _relationships: any[];
  expandedNodeMap: any;
  nodeMap: any;
  relationshipMap: any;
  constructor() {
    this.addNodes = this.addNodes.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.removeConnectedRelationships = this.removeConnectedRelationships.bind(
      this
    );
    this.addRelationships = this.addRelationships.bind(this);
    this.addInternalRelationships = this.addInternalRelationships.bind(this);
    this.pruneInternalRelationships = this.pruneInternalRelationships.bind(
      this
    );
    this.findNode = this.findNode.bind(this);
    this.findNodeNeighbourIds = this.findNodeNeighbourIds.bind(this);
    this.findRelationship = this.findRelationship.bind(this);
    this.findAllRelationshipToNode = this.findAllRelationshipToNode.bind(this);
    this.nodeMap = {};
    this.expandedNodeMap = {};
    this._nodes = [];
    this.relationshipMap = {};
    this._relationships = [];
  }

  nodes() {
    return this._nodes;
  }

  relationships() {
    return this._relationships;
  }

  groupedRelationships() {
    const groups: any = {};
    for (const relationship of Array.from(this._relationships)) {
      let nodePair: any = new NodePair(
        relationship.source,
        relationship.target
      );
      nodePair = groups[nodePair] != null ? groups[nodePair] : nodePair;
      nodePair.relationships.push(relationship);
      groups[nodePair] = nodePair;
    }
    return (() => {
      const result = [];
      for (const ignored in groups) {
        const pair = groups[ignored];
        result.push(pair);
      }
      return result;
    })();
  }

  addNodes(nodes: any[]) {
    for (const node of Array.from(nodes)) {
      if (this.findNode(node.id) == null) {
        this.nodeMap[node.id] = node;
        this._nodes.push(node);
      }
    }
    return this;
  }

  addExpandedNodes = (node: any, nodes: any[]) => {
    for (const eNode of Array.from(nodes)) {
      if (this.findNode(eNode.id) == null) {
        this.nodeMap[eNode.id] = eNode;
        this._nodes.push(eNode);
        this.expandedNodeMap[node.id] = this.expandedNodeMap[node.id]
          ? [...new Set(this.expandedNodeMap[node.id].concat([eNode.id]))]
          : [eNode.id];
      }
    }
  };

  removeNode(node: any) {
    if (this.findNode(node.id) != null) {
      delete this.nodeMap[node.id];
      this._nodes.splice(this._nodes.indexOf(node), 1);
    }
    return this;
  }

  removeRelationship(relationship: any) {
    if (this.findRelationship(relationship.id) != null) {
      delete this.relationshipMap[relationship.id];
      this._relationships.splice(this._relationships.indexOf(relationship), 1);
    }
    return this;
  }

  reset() {
    this.nodeMap = {};
    this.expandedNodeMap = {};
    this._nodes = [];
    this.relationshipMap = {};
    this._relationships = [];

    return this;
  }

  resetNodes() {
    this.expandedNodeMap = {};

    this.nodeMap = {};
    this._nodes = [];

    return this;
  }

  resetRelationships() {
    this.expandedNodeMap = {};

    this.relationshipMap = {};
    this._relationships = [];

    return this;
  }

  collapseNode = (node: any) => {
    if (!this.expandedNodeMap[node.id]) {
      return;
    }
    this.expandedNodeMap[node.id].forEach((id: any) => {
      const eNode = this.nodeMap[id];
      this.collapseNode(eNode);
      this.removeConnectedRelationships(eNode);
      this.removeNode(eNode);
    });
    this.expandedNodeMap[node.id] = [];
  };

  updateNode(node: any) {
    if (this.findNode(node.id) != null) {
      this.removeNode(node);
      node.expanded = false;
      node.minified = true;
      this.addNodes([node]);
    }
    return this;
  }

  removeConnectedRelationships(node: any) {
    for (const r of Array.from(this.findAllRelationshipToNode(node))) {
      this.updateNode(r.source);
      this.updateNode(r.target);
      this._relationships.splice(this._relationships.indexOf(r), 1);
      delete this.relationshipMap[r.id];
    }
    return this;
  }

  addRelationships(relationships: any[]) {
    for (const relationship of Array.from(relationships)) {
      const existingRelationship = this.findRelationship(relationship.id);
      if (existingRelationship != null) {
        existingRelationship.internal = false;
      } else {
        relationship.internal = false;
        this.relationshipMap[relationship.id] = relationship;
        this._relationships.push(relationship);
      }
    }
    return this;
  }

  addInternalRelationships(relationships: any[]) {
    for (const relationship of Array.from(relationships)) {
      relationship.internal = true;
      if (this.findRelationship(relationship.id) == null) {
        this.relationshipMap[relationship.id] = relationship;
        this._relationships.push(relationship);
      }
    }
    return this;
  }

  pruneInternalRelationships() {
    const relationships = this._relationships.filter(
      (relationship: any) => !relationship.internal
    );
    this.relationshipMap = {};
    this._relationships = [];
    return this.addRelationships(relationships);
  }

  findNode(id: any) {
    return this.nodeMap[id];
  }

  findNodeNeighbourIds(id: any) {
    return this._relationships
      .filter(
        (relationship: any) =>
          relationship.source.id === id || relationship.target.id === id
      )
      .map((relationship: any) => {
        if (relationship.target.id === id) {
          return relationship.source.id;
        }
        return relationship.target.id;
      });
  }

  findRelationship(id: any) {
    return this.relationshipMap[id];
  }

  findAllRelationshipToNode(node: any) {
    return this._relationships.filter(
      (relationship: any) =>
        relationship.source.id === node.id || relationship.target.id === node.id
    );
  }

  resetGraph() {
    this.nodeMap = {};
    this._nodes = [];
    this.relationshipMap = {};
    return (this._relationships = []);
  }
}

class NodePair {
  nodeA: any;
  nodeB: any;
  relationships: any;
  constructor(node1: any, node2: any) {
    this.relationships = [];
    if (node1.id < node2.id) {
      this.nodeA = node1;
      this.nodeB = node2;
    } else {
      this.nodeA = node2;
      this.nodeB = node1;
    }
  }

  isLoop() {
    return this.nodeA === this.nodeB;
  }

  toString() {
    return `${this.nodeA.id}:${this.nodeB.id}`;
  }
}

export { Graph };
