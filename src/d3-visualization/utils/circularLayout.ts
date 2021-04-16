export default function circularLayout(nodes: any[], center: any, radius: any) {
  const unlocatedNodes = [];
  for (const node of Array.from(nodes)) {
    if (!(node.x != null && node.y != null)) {
      unlocatedNodes.push(node);
    }
  }
  return (() => {
    const result = [];
    for (let i = 0; i < unlocatedNodes.length; i++) {
      const n = unlocatedNodes[i];
      n.x =
        center.x + radius * Math.sin((2 * Math.PI * i) / unlocatedNodes.length);
      result.push(
        (n.y =
          center.y +
          radius * Math.cos((2 * Math.PI * i) / unlocatedNodes.length))
      );
    }
    return result;
  })();
}
