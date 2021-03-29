export default function cloneArray(original: any) {
  const clone = new Array(original.length);
  for (let idx = 0; idx < original.length; idx++) {
    const node = original[idx];
    clone[idx] = node;
  }
  return clone;
}
