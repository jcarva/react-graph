import React, { Component } from "react";
import {
  createGraph,
  getGraphStats,
  mapNodes,
  mapRelationships,
} from "./utils/mapper";
import { GraphEventHandler } from "./utils/GraphEventHandler";
import { ZoomControls } from "./organisms/zoom-controls/ZoomControls";
import { StyledSvgWrapper } from "./organisms/styled";
import GraphView from "../d3-visualization/components/graphView";
import "../d3-visualization";

export class GraphComponent extends Component<any, any> {
  graph: any;
  graphEH: any;
  graphView: any;
  svgElement: any;
  state = {
    zoomInLimitReached: true,
    zoomOutLimitReached: false,
  };

  graphInit(el: any) {
    this.svgElement = el;
  }

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

  componentDidMount() {
    if (this.svgElement != null) {
      this.initGraphView();
      this.graph && this.props.setGraph && this.props.setGraph(this.graph);
    }
  }

  initGraphView() {
    if (!this.graphView) {
      const measureSize = () => {
        return {
          width: this.svgElement ? this.svgElement.offsetWidth : "50%",
          height: this.svgElement.parentNode.offsetHeight,
        };
      };
      this.graph = createGraph(this.props.nodes, this.props.relationships);
      this.graphView = new GraphView(
        this.svgElement,
        measureSize,
        this.graph,
        this.props.graphStyle
      );
      this.graphEH = new GraphEventHandler(
        this.graph,
        this.graphView,
        this.props.getNodeNeighbours,
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

  componentDidUpdate(prevProps: any) {
    if (prevProps.styleVersion !== this.props.styleVersion) {
      this.graphView.update();
    }
    if (this.props.fullscreen !== prevProps.fullscreen) {
      this.graphView.resize();
    }
    if (prevProps.nodes !== this.props.nodes) {
      this.graph.resetNodes();
      this.graph.addNodes(mapNodes(this.props.nodes));
    }
    if (prevProps.relationships !== this.props.relationships) {
      this.graph.resetRelationships();
      this.graph.addRelationships(
        mapRelationships(this.props.relationships, this.graph)
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

        // eslint-disable-next-line array-callback-return
        mapNodes(removedNodes).map((removedNode: any) => {
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

  render() {
    return (
      <StyledSvgWrapper>
        <svg className="react-graph" ref={this.graphInit.bind(this)} />
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
