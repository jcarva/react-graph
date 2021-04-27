import React, { Component } from "react";
import { GraphComponent } from "./Graph";
import { deduplicateNodes } from "./utils/utils";

class GraphContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    const nodesIdMap = {};
    // @ts-ignore
    this.props.nodes.map((x: any) => {
      if (!nodesIdMap[x.id]) nodesIdMap[x.id] = x;
    });
    const relationships = this.props.relationships;
    const nodes = deduplicateNodes(this.props.nodes);

    this.state = {
      nodes,
      relationships,
      nodesIdMap: nodesIdMap,
    };
  }

  componentWillReceiveProps() {
    const nodesIdMap = {};
    this.props.nodes.map((x: any) => {
      if (!nodesIdMap[x.id]) nodesIdMap[x.id] = x;
    });
    const nodes = deduplicateNodes(this.props.nodes);
    const relationships = this.props.relationships;
    console.log("nodesIdMap: ", { nodes, relationships, nodesIdMap });
    this.setState({ nodes, relationships, nodesIdMap });
  }

  // TODO: Optimize by filtering using currentNeighbourIds
  // @ts-ignore
  getNeighbours = (
    currentNode: any,
    _currentNeighbourIds = [],
    callback: any
  ) => {
    const { id } = currentNode;
    const relationshipsWithNeighbours = this.props.relationships.filter(
      (rel: { startNodeId: any; endNodeId: any }) =>
        rel.startNodeId === id || rel.endNodeId === id
    );

    // @ts-ignore
    const neighboursList: any[] = [];
    relationshipsWithNeighbours.map(
      (rel: { startNodeId: string | number; endNodeId: string | number }) => {
        // @ts-ignore
        if (rel.startNodeId === id) {
          // @ts-ignore
          neighboursList.push(this.state.nodesIdMap[id]);
          // @ts-ignore
          neighboursList.push(this.state.nodesIdMap[rel.endNodeId]);
        }

        // @ts-ignore
        if (rel.endNodeId === id) {
          // @ts-ignore
          neighboursList.push(this.state.nodesIdMap[id]);
          // @ts-ignore
          neighboursList.push(this.state.nodesIdMap[rel.startNodeId]);
        }
      }
    );

    callback(null, {
      nodes: neighboursList,
      relationships: relationshipsWithNeighbours,
    });
  };

  render() {
    return (
      <GraphComponent
        fullscreen={this.props.fullscreen}
        nodes={this.props.initialState.nodes}
        relationships={this.props.initialState.relationships}
        getNodeNeighbours={this.getNeighbours}
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
