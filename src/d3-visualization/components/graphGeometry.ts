import PairwiseArcsRelationshipRouting from '../utils/pairwiseArcsRelationshipRouting'
import measureText from '../utils/textMeasurement'

class GraphGeometry {
  relationshipRouting: any;
  style: any;
  constructor(style: any) {
    this.style = style;
    this.relationshipRouting = new PairwiseArcsRelationshipRouting(this.style)
  }

  formatNodeCaptions(nodes: any[]) {
    return Array.from(nodes).map(
      node => (node.caption = fitCaptionIntoCircle(node, this.style))
    )
  }

  formatRelationshipCaptions(relationships: any[]) {
    return (() => {
      const result = [];
      for (const relationship of Array.from(relationships)) {
        const template = this.style.forRelationship(relationship).get('caption')
        result.push(
          (relationship.caption = this.style.interpolate(
            template,
            relationship
          ))
        )
      }
      return result
    })()
  }

  setNodeRadii(nodes: any[]) {
    return Array.from(nodes).map(
      node =>
        (node.radius = parseFloat(this.style.forNode(node).get('diameter')) / 2)
    )
  }

  onGraphChange(graph: any) {
    this.setNodeRadii(graph.nodes());
    this.formatNodeCaptions(graph.nodes());
    this.formatRelationshipCaptions(graph.relationships());
    return this.relationshipRouting.measureRelationshipCaptions(
      graph.relationships()
    )
  }

  onTick(graph: any) {
    return this.relationshipRouting.layoutRelationships(graph)
  }
}

const square = (distance: any) => distance * distance;

const addShortenedNextWord = (line: any, word: any, measure: any) => {
  const result = [];
  while (!(word.length <= 2)) {
    word = `${word.substr(0, word.length - 2)}\u2026`;
    if (measure(word) < line.remainingWidth) {
      line.text += ` ${word}`;
      break
    } else {
      result.push(undefined)
    }
  }
  return result
};

const noEmptyLines = function(lines: any[]) {
  for (const line of Array.from(lines)) {
    if (line.text.length === 0) {
      return false
    }
  }
  return true
};

const fitCaptionIntoCircle = function(node: any, style: any) {
  const template = style.forNode(node).get('caption')
  const captionText = style.interpolate(template, node)
  const fontFamily = 'sans-serif'
  const fontSize = parseFloat(style.forNode(node).get('font-size'))
  const lineHeight = fontSize
  const measure = (text: any) => measureText(text, fontFamily, fontSize)

  const words = captionText.split(' ')

  const emptyLine = function(lineCount: any, iLine: any) {
    let baseline = (1 + iLine - lineCount / 2) * lineHeight
    if (style.forNode(node).get('icon-code')) {
      baseline = baseline + node.radius / 3
    }
    const containingHeight =
      iLine < lineCount / 2 ? baseline - lineHeight : baseline
    const lineWidth =
      Math.sqrt(square(node.radius) - square(containingHeight)) * 2
    return {
      node,
      text: '',
      baseline,
      remainingWidth: lineWidth
    }
  }

  const fitOnFixedNumberOfLines = function(lineCount: any): [any, number] {
    const lines = []
    let iWord = 0
    for (
      let iLine = 0, end = lineCount - 1, asc = end >= 0;
      asc ? iLine <= end : iLine >= end;
      asc ? iLine++ : iLine--
    ) {
      const line = emptyLine(lineCount, iLine)
      while (
        iWord < words.length &&
        measure(` ${words[iWord]}`) < line.remainingWidth
      ) {
        line.text += ` ${words[iWord]}`
        line.remainingWidth -= measure(` ${words[iWord]}`)
        iWord++
      }
      lines.push(line)
    }
    if (iWord < words.length) {
      addShortenedNextWord(lines[lineCount - 1], words[iWord], measure)
    }
    return [lines, iWord]
  };

  let consumedWords = 0
  const maxLines = (node.radius * 2) / fontSize;

  let lines = [emptyLine(1, 0)];
  for (
    let lineCount = 1, end = maxLines, asc = end >= 1;
    asc ? lineCount <= end : lineCount >= end;
    asc ? lineCount++ : lineCount--
  ) {
    const [candidateLines, candidateWords] = Array.from(
      fitOnFixedNumberOfLines(lineCount)
    );
    if (noEmptyLines(candidateLines)) {
      [lines, consumedWords] = Array.from([candidateLines, candidateWords])
    }
    if (consumedWords >= words.length) {
      return lines
    }
  }
  return lines
};

export { GraphGeometry };
