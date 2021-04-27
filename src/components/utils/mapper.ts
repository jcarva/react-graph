import { optionalToString } from "./utils";
import { Graph } from "../../d3-visualization/components/graph";
import { Node } from "../../d3-visualization/components/node";
import { Relationship } from "../../d3-visualization/components/relationship";

const mapProperties = (_: any) => Object.assign({}, ...stringifyValues(_));
const stringifyValues = (obj: any) =>
  Object.keys(obj).map((k) => ({ [k]: optionalToString(obj[k]) }));

export function createGraph(nodes: any, relationships: any) {
  const graph = new Graph();
  graph.addNodes(mapNodes(nodes));
  graph.addRelationships(mapRelationships(relationships, graph));
  (graph as any).display = { initialNodeDisplay: 300, nodeCount: 1 };
  return graph;
}

export function mapNodes(nodes: any) {
  return nodes.map(
    (node: any) =>
      new Node(node.id, node.labels, mapProperties(node.properties))
  );
}

export function mapRelationships(relationships: any, graph: any) {
  return relationships.map((rel: any) => {
    const source = graph.findNode(rel.startNodeId);
    const target = graph.findNode(rel.endNodeId);
    return new Relationship(
      rel.id,
      source,
      target,
      rel.type,
      mapProperties(rel.properties)
    );
  });
}

export function getGraphStats(graph: any) {
  const labelStats: any = {};
  const relTypeStats: any = {};

  graph.nodes().forEach((node: any) => {
    node.labels.forEach((label: any) => {
      if (labelStats["*"]) {
        labelStats["*"].count = labelStats["*"].count + 1;
      } else {
        labelStats["*"] = {
          count: 1,
          properties: [],
        };
      }
      if (labelStats[label]) {
        labelStats[label].count = labelStats[label].count + 1;
        labelStats[label].properties = {
          ...labelStats[label].properties,
          ...node.propertyMap,
        };
      } else {
        labelStats[label] = {
          count: 1,
          properties: node.propertyMap,
        };
      }
    });
  });

  graph.relationships().forEach((rel: any) => {
    if (relTypeStats["*"]) {
      relTypeStats["*"].count = relTypeStats["*"].count + 1;
    } else {
      relTypeStats["*"] = {
        count: 1,
        properties: [],
      };
    }
    if (relTypeStats[rel.type]) {
      relTypeStats[rel.type].count = relTypeStats[rel.type].count + 1;
      relTypeStats[rel.type].properties = {
        ...relTypeStats[rel.type].properties,
        ...rel.propertyMap,
      };
    } else {
      relTypeStats[rel.type] = {
        count: 1,
        properties: rel.propertyMap,
      };
    }
  });

  return { labels: labelStats, relTypes: relTypeStats };
}
