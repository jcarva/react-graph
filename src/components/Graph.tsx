import React, { Component } from "react";
import {
  createGraph,
  getGraphStats,
  mapNodes,
  mapRelationships,
} from "./utils/mapper";
import { GraphEventHandler } from "./utils/GraphEventHandler";
import { GraphView } from "../d3-visualization/components/graphView";
import { StyledSvgWrapper } from "./organisms/styled";
import { ZoomControls } from "./organisms/zoom-controls/ZoomControls";
import "../d3-visualization";

class Graph extends Component<any, any> {
  graph: any;
  graphEH: any;
  graphView: any;
  svgElement: any;
  state = {
    nodesIdMap: {},
    zoomInLimitReached: true,
    zoomOutLimitReached: false,
  };

  componentDidMount() {
    if (this.svgElement != null) {
      this.initGraphView();
      this.graph && this.props.setGraph && this.props.setGraph(this.graph);
    }

    const nodesIdMap = {};
    this.props.allNodes.forEach((x: any) => (nodesIdMap[x.id] = x));
    this.setState({ nodesIdMap });
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.styleVersion !== this.props.styleVersion) {
      this.graphView.update();
    }
    // TODO: Enable on v2
    if (this.props.fullscreen !== prevProps.fullscreen) {
      this.graphView.resize();
    }
    if (prevProps.initialNodes !== this.props.initialNodes) {
      this.graph.resetNodes();
      this.graph.addNodes(mapNodes(this.props.initialNodes));
    }
    if (prevProps.initialRelationships !== this.props.initialRelationships) {
      this.graph.resetRelationships();
      this.graph.addRelationships(
        mapRelationships(this.props.initialRelationships, this.graph)
      );
    }
    if (prevProps.addedNodes !== this.props.addedNodes) {
      if (this.props.addedNodes.length > prevProps.addedNodes.length) {
        this.graph.addNodes(mapNodes(this.props.addedNodes));
        this.graphView.update();
        this.props.onGraphModelChange(getGraphStats(this.graph));
      } else if (this.props.addedNodes.length < prevProps.addedNodes.length) {
        const currentAddedNodesIds = {};
        // @ts-ignore;
        this.props.addedNodes.map((obj: any) => {
          currentAddedNodesIds[obj.id] = obj;
        });

        const removedNodes = prevProps.addedNodes.filter(
          (obj: any) => !(obj.id in currentAddedNodesIds)
        );

        mapNodes(removedNodes).forEach((removedNode: any) => {
          const node = this.graph.nodeMap[removedNode.id];
          if (node) {
            this.graph.removeConnectedRelationships(node);
            this.graph.removeNode(node);
            this.graphEH.deselectItem();
          }
        });
      }

      this.graphView.update();
      this.props.onGraphModelChange(getGraphStats(this.graph));
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.allNodes !== nextProps.allNodes) {
      const nodesIdMap = {};
      nextProps.allNodes.forEach((x: any) => (nodesIdMap[x.id] = x));
      this.setState({ nodesIdMap });
    }
  }

  initGraph(el: any) {
    this.svgElement = el;
  }

  initGraphView() {
    if (!this.graphView) {
      const measureSize = () => {
        return {
          width: this.svgElement.parentNode.offsetWidth,
          height: this.svgElement.parentNode.offsetHeight,
        };
      };
      this.graph = createGraph(
        this.props.initialNodes,
        this.props.initialRelationships
      );
      this.graphView = new GraphView(
        this.svgElement,
        measureSize,
        this.graph,
        this.props.graphStyle
      );
      this.graphEH = new GraphEventHandler(
        this.graph,
        this.graphView,
        this.getNodeNeighbours,
        this.props.onItemMouseOver,
        this.props.onItemSelect,
        this.props.onGraphModelChange
      );
      this.graphEH.bindEventHandlers();
      this.props.onGraphModelChange(getGraphStats(this.graph));
      this.graphView.resize();
      this.graphView.update();
    }
  }

  // TODO: Optimize by filtering using currentNeighbourIds
  getNodeNeighbours = (
    currentNode: any,
    _currentNeighbourIds = [],
    callback: any
  ) => {
    const { id } = currentNode;
    const relationshipsWithNeighbours = this.props.allRelationships.filter(
      (rel: { startNodeId: any; endNodeId: any }) =>
        rel.startNodeId === id || rel.endNodeId === id
    );

    const neighboursList: any[] = [];
    relationshipsWithNeighbours.map(
      (rel: { startNodeId: string | number; endNodeId: string | number }) => {
        if (rel.startNodeId === id) {
          neighboursList.push(this.state.nodesIdMap[id]);
          neighboursList.push(this.state.nodesIdMap[rel.endNodeId]);
        }
        if (rel.endNodeId === id) {
          neighboursList.push(this.state.nodesIdMap[id]);
          neighboursList.push(this.state.nodesIdMap[rel.startNodeId]);
        }
      }
    );

    callback(null, {
      nodes: neighboursList,
      relationships: relationshipsWithNeighbours,
    });
  };

  handleZoomInClick = () => {
    const limits = this.graphView.zoomIn();
    this.setState({
      zoomInLimitReached: limits.zoomInLimit,
      zoomOutLimitReached: limits.zoomOutLimit,
    });
  };

  handleZoomOutClick = () => {
    const limits = this.graphView.zoomOut();
    this.setState({
      zoomInLimitReached: limits.zoomInLimit,
      zoomOutLimitReached: limits.zoomOutLimit,
    });
  };

  render() {
    return (
      <StyledSvgWrapper>
        <svg className="react-graph" ref={this.initGraph.bind(this)} />
        <ZoomControls
          zoomMenu={this.props.zoomMenu}
          onZoomInClick={this.handleZoomInClick}
          onZoomOutClick={this.handleZoomOutClick}
          zoomInLimitReached={this.state.zoomInLimitReached}
          zoomOutLimitReached={this.state.zoomOutLimitReached}
        />
      </StyledSvgWrapper>
    );
  }
}

export { Graph };
