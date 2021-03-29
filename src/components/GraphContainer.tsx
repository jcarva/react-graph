import React, { Component } from "react";
import { GraphComponent } from "./Graph";
import { deduplicateNodes } from "./utils/utils";

class GraphContainer extends Component<any, any> {
  totalNodesHash: any;
  constructor(props: any) {
    super(props);
    this.totalNodesHash = {};
    // @ts-ignore
    this.props.nodes.map((x: any) => {
      if (!this.totalNodesHash[x.id]) this.totalNodesHash[x.id] = x;
    });
    const relationships = this.props.relationships;
    const nodes = deduplicateNodes(this.props.nodes);

    this.state = {
      nodes,
      relationships,
    };
  }

  // TODO: Optimize by filtering using currentNeighbourIds
  // @ts-ignore
  getNeighbours(currentNode: any, currentNeighbourIds = [], callback: any) {
    const { id } = currentNode;
    const relationshipsWithNeighbours = this.props.relationships.filter(
      (rel: { startNodeId: any; endNodeId: any }) =>
        rel.startNodeId == id || rel.endNodeId == id
    );

    // @ts-ignore
    const neighboursList: any[] = [];
    relationshipsWithNeighbours.map(
      (rel: { startNodeId: string | number; endNodeId: string | number }) => {
        // @ts-ignore
        if (rel.startNodeId == id) {
          // @ts-ignore
          neighboursList.push(this.totalNodesHash[id]);
          // @ts-ignore
          neighboursList.push(this.totalNodesHash[rel.endNodeId]);
        }

        // @ts-ignore
        if (rel.endNodeId == id) {
          // @ts-ignore
          neighboursList.push(this.totalNodesHash[id]);
          // @ts-ignore
          neighboursList.push(this.totalNodesHash[rel.startNodeId]);
        }
      }
    );

    callback(null, {
      nodes: neighboursList,
      relationships: relationshipsWithNeighbours,
    });
  }

  render() {
    return (
      <GraphComponent
        fullscreen={this.props.fullscreen}
        nodes={this.props.initialState.nodes}
        relationships={this.props.initialState.relationships}
        getNodeNeighbours={this.getNeighbours.bind(this)}
        onItemMouseOver={this.props.onItemMouseOver}
        onItemSelect={this.props.onItemSelect}
        graphStyle={this.props.graphStyle}
        styleVersion={this.props.styleVersion}
        onGraphModelChange={this.props.onGraphModelChange}
        setGraph={this.props.setGraph}
        addedNodes={this.props.addedNodes}
        zoomMenu={this.props.zoomMenu}
      />
    );
  }
}
export { GraphContainer };

// "lib": ["es6", "dom", "dom.iterable", "esnext"],
// "allowSyntheticDefaultImports": true,
//     "allowJs": true,
//     "skipLibCheck": true,
//     "strict": true,
//     "forceConsistentCasingInFileNames": true,
//     "noFallthroughCasesInSwitch": true,
//     "resolveJsonModule": true,
//     "isolatedModules": true,
//     "noEmit": true
// "tslib": "1.10.0"
