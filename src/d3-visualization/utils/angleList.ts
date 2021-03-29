export default class AngleList {
  list: any;
  constructor(list: any) {
    this.list = list;
  }

  getAngle(index: any) {
    return this.list[index].angle;
  }

  fixed(index: any) {
    return this.list[index].fixed;
  }

  totalLength() {
    return this.list.length;
  }

  length(run: any) {
    if (run.start < run.end) {
      return run.end - run.start;
    } else {
      return run.end + this.list.length - run.start;
    }
  }

  angle(run: any) {
    if (run.start < run.end) {
      return this.list[run.end].angle - this.list[run.start].angle;
    } else {
      return 360 - (this.list[run.start].angle - this.list[run.end].angle);
    }
  }

  wrapIndex(index: any) {
    if (index === -1) {
      return this.list.length - 1;
    } else if (index >= this.list.length) {
      return index - this.list.length;
    } else {
      return index;
    }
  }
}
