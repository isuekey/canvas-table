
const pointsSymbol = Symbol('points');
class Vector {
  constructor(...vs) {
    const points = [...vs];
    points.forEach((ele, idx) => {
      this[idx] = ele;
    });
    this[pointsSymbol] = points;
    const length = points.length;
    this[Symbol.iterator] = function* () {
      let idx = 0;
      while (idx < length) {
        yield points[idx];
        idx++;
      }
    };
  };
  get length() {
    return this[pointsSymbol].length;
  }
  addByVector(vector) {
    if(this.length != vector.length) {
      const error = new RangeError();
      error.message = `vector and this length is not same`;
      throw(error);
    }
    const newVectorBase = this[pointsSymbol].map((ele, idx) => {
      return ele + vector[idx];
    });
    return new Vector(...newVectorBase);
  }
  subByVector(vector) {
    if(this.length != vector.length) {
      const error = new RangeError();
      error.message = `vector and this length is not same`;
      throw(error);
    }
    const newVectorBase = this[pointsSymbol].map((ele, idx) => {
      return ele - vector[idx];
    });
    return new Vector(...newVectorBase);
  }
};
const pointSymbol = Symbol('point');
const xedgeSymbol = Symbol('xedge');
const yedgeSymbol = Symbol('yedge');
class Rect {
  constructor(point, xedge, yedge) {
    this[pointSymbol] = point;
    this[xedgeSymbol] = xedge;
    this[yedgeSymbol] = yedge;
  }
  get center() {
  }
  get point() {
    return this[pointSymbol];
  }
  get xedge() {
    return this[xedgeSymbol];
  }
  get yedge() {
    return this[yedgeSymbol];
  }
  getWidth() {
    if(this.width) return this.width;
    if(!this.point || !this.xedge) return this.width;
    const [x,y] = this.xedge.subByVector(this.point);
    this.width = Math.sqrt(x * x + y * y);
    return this.width;
  }
  getHeight() {
    if(this.height) return this.height;
    if(!this.point || !this.yedge) return this.height;
    const [x, y] = this.yedge.subByVector(this.point);
    this.height = Math.sqrt(x * x + y * y);
    return this.height;
  }
  drawStyle(ctx, style={}) {
    const rect = [...this.point, this.getWidth(), this.getHeight()];
    ctx.clearRect(...rect);
    if(style.fill) {
      ctx.fillStyle = style.fillStyle;
      ctx.fillRect(...rect);
    }
    if(style.border) {
      ctx.strokeStyle = style.borderColor;
      ctx.lineWidth = style.borderWidth;
      ctx.strokeRect(...rect);
    }
  }
  scaleByPx(px) {
  }
};

Rect.fromAxisWidthHeight = (x, y, width, height) => {
  const point = new Vector(x, y);
  const xedge = new Vector(x+width, y);
  const yedge = new Vector(x, y+height);
  return new Rect(point, xedge, yedge);
};

export {
  Rect,
  Vector
};
