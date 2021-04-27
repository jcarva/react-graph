import React, { Component } from "react";
import { GraphComponent } from "./Graph";

// TODO: Update to function component
class GraphContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      nodesIdMap: {},
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.nodes !== nextProps.nodes) {
      const nodesIdMap = {};
      nextProps.nodes.forEach((x: any) => (nodesIdMap[x.id] = x));
      this.setState({ nodesIdMap });
    }
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
