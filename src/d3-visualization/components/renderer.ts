class Renderer {
  onGraphChange: any = null;
  onTick: any = null;
  constructor(opts: any) {
    Object.assign(this, opts == null ? {} : opts);
    if (this.onGraphChange === null) {
      this.onGraphChange = function () {};
    }
    if (this.onTick === null) {
      this.onTick = function () {};
    }
  }
}

export { Renderer };
