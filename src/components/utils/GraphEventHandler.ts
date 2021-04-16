import { mapNodes, mapRelationships, getGraphStats } from "./mapper";

export class GraphEventHandler {
  getNodeNeighbours: any;
  graph: any;
  graphView: any;
  onGraphModelChange: any;
  onItemMouseOver: any;
  onItemSelected: any;
  selectedItem: any;
  constructor(
    graph: any,
    graphView: any,
    getNodeNeighbours: any,
    onItemMouseOver: any,
    onItemSelected: any,
    onGraphModelChange: any
  ) {
    this.graph = graph;
    this.graphView = graphView;
    this.getNodeNeighbours = getNodeNeighbours;
    this.selectedItem = null;
    this.onItemMouseOver = onItemMouseOver;
    this.onItemSelected = onItemSelected;
    this.onGraphModelChange = onGraphModelChange;
  }

  graphModelChanged() {
    this.onGraphModelChange(getGraphStats(this.graph));
  }

  selectItem(item: any) {
    if (this.selectedItem) {
      this.selectedItem.selected = false;
    }
    this.selectedItem = item;
    item.selected = true;
    this.graphView.update();
  }

  deselectItem() {
    if (this.selectedItem) {
      this.selectedItem.selected = false;
      this.selectedItem = null;
    }
    this.onItemSelected({
      type: "canvas",
      item: {
        nodeCount: this.graph.nodes().length,
        relationshipCount: this.graph.relationships().length,
      },
    });
    this.graphView.update();
  }

  nodeClose(d: any) {
    this.graph.removeConnectedRelationships(d);
    this.graph.removeNode(d);
    this.deselectItem();
    this.graphView.update();
    this.graphModelChanged();
  }

  nodeClicked(d: any) {
    if (!d) {
      return;
    }
    d.fixed = true;
    if (!d.selected) {
      this.selectItem(d);
      this.onItemSelected({
        type: "node",
        item: { id: d.id, labels: d.labels, properties: d.propertyList },
      });
    } else {
      this.deselectItem();
    }
  }

  nodeUnlock(d: any) {
    if (!d) {
      return;
    }
    d.fixed = false;
    this.deselectItem();
  }

  nodeDblClicked(d: any) {
    if (d.expanded) {
      this.nodeCollapse(d);
      return;
    }
    d.expanded = true;
    const graph = this.graph;
    const graphView = this.graphView;
    const graphModelChanged = this.graphModelChanged.bind(this);
    this.getNodeNeighbours(
      d,
      this.graph.findNodeNeighbourIds(d.id),
      (err: any, { nodes, relationships }: any) => {
        if (err) return;
        graph.addExpandedNodes(d, mapNodes(nodes));
        graph.addRelationships(mapRelationships(relationships, graph));
        graphView.update();
        graphModelChanged();
      }
    );
  }

  nodeCollapse(d: any) {
    d.expanded = false;
    this.graph.collapseNode(d);
    this.graphView.update();
    this.graphModelChanged();
  }

  onNodeMouseOver(node: any) {
    if (!node.contextMenu) {
      this.onItemMouseOver({
        type: "node",
        item: {
          id: node.id,
          labels: node.labels,
          properties: node.propertyList,
        },
      });
    }
  }

  onMenuMouseOver(itemWithMenu: any) {
    this.onItemMouseOver({
      type: "context-menu-item",
      item: {
        label: itemWithMenu.contextMenu.label,
        content: itemWithMenu.contextMenu.menuContent,
        selection: itemWithMenu.contextMenu.menuSelection,
      },
    });
  }

  onRelationshipMouseOver(relationship: any) {
    this.onItemMouseOver({
      type: "relationship",
      item: {
        id: relationship.id,
        type: relationship.type,
        properties: relationship.propertyList,
      },
    });
  }

  onRelationshipClicked(relationship: any) {
    if (!relationship.selected) {
      this.selectItem(relationship);
      this.onItemSelected({
        type: "relationship",
        item: {
          id: relationship.id,
          type: relationship.type,
          properties: relationship.propertyList,
        },
      });
    } else {
      this.deselectItem();
    }
  }

  onCanvasClicked() {
    this.deselectItem();
  }

  onItemMouseOut() {
    this.onItemMouseOver({
      type: "canvas",
      item: {
        nodeCount: this.graph.nodes().length,
        relationshipCount: this.graph.relationships().length,
      },
    });
  }

  bindEventHandlers() {
    this.graphView
      .on("nodeMouseOver", this.onNodeMouseOver.bind(this))
      .on("nodeMouseOut", this.onItemMouseOut.bind(this))
      .on("menuMouseOver", this.onMenuMouseOver.bind(this))
      .on("menuMouseOut", this.onItemMouseOut.bind(this))
      .on("relMouseOver", this.onRelationshipMouseOver.bind(this))
      .on("relMouseOut", this.onItemMouseOut.bind(this))
      .on("relationshipClicked", this.onRelationshipClicked.bind(this))
      .on("canvasClicked", this.onCanvasClicked.bind(this))
      .on("nodeClose", this.nodeClose.bind(this))
      .on("nodeClicked", this.nodeClicked.bind(this))
      .on("nodeDblClicked", this.nodeDblClicked.bind(this))
      .on("nodeUnlock", this.nodeUnlock.bind(this));
    this.onItemMouseOut();
  }
}
