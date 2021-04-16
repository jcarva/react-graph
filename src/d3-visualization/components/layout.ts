// @ts-ignore
import * as d3 from "d3";
import collision from "./collision";
import circularLayout from "../utils/circularLayout";
import cloneArray from "../utils/arrays";

const layout = {
  force: () => {
    return {
      init: (render: any) => {
        const forceLayout: any = {};

        const linkDistance = 45;

        const d3force = d3.layout
          .force()
          .linkDistance(
            (relationship: any) =>
              relationship.source.radius +
              relationship.target.radius +
              linkDistance
          )
          .charge(-1000);

        const newStatsBucket = function () {
          const bucket = {
            layoutTime: 0,
            layoutSteps: 0,
          };
          return bucket;
        };

        let currentStats = newStatsBucket();

        forceLayout.collectStats = function () {
          const latestStats = currentStats;
          currentStats = newStatsBucket();
          return latestStats;
        };

        const accelerateLayout = function () {
          let maxStepsPerTick = 100;
          const maxAnimationFramesPerSecond = 60;
          const maxComputeTime = 1000 / maxAnimationFramesPerSecond;
          const now =
            window.performance && window.performance.now
              ? () => window.performance.now()
              : () => Date.now();

          const d3Tick = d3force.tick;
          return (d3force.tick = function () {
            const startTick = now();
            let step = maxStepsPerTick;
            while (step-- && now() - startTick < maxComputeTime) {
              const startCalcs = now();
              currentStats.layoutSteps++;

              collision.avoidOverlap(d3force.nodes());

              if (d3Tick()) {
                maxStepsPerTick = 2;
                return true;
              }
              currentStats.layoutTime += now() - startCalcs;
            }
            render();
            return false;
          } as any);
        };

        accelerateLayout();

        const oneRelationshipPerPairOfNodes = (graph: any) =>
          Array.from(graph.groupedRelationships()).map(
            (pair: any) => pair.relationships[0]
          );

        forceLayout.update = function (graph: any, size: any) {
          const nodes = cloneArray(graph.nodes());
          const relationships = oneRelationshipPerPairOfNodes(graph);

          const radius = (nodes.length * linkDistance) / (Math.PI * 2);
          const center = {
            x: size[0] / 2,
            y: size[1] / 2,
          };
          circularLayout(nodes, center, radius);

          return d3force.nodes(nodes).links(relationships).size(size).start();
        };

        forceLayout.drag = d3force.drag;
        return forceLayout;
      },
    };
  },
};

export default layout;
