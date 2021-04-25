
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

const offsetSize = (rect=[], left=0, top=0, right=0, bottom=0) =>{
  const [l=0, t=0, w=0, h=0] = rect;
  return [l+left, t + top, w - right - left, h - bottom - top];
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
  get rect() {
    return [...this.point, this.getWidth(), this.getHeight()];
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
    const rect = this.rect;
    ctx.clearRect(...rect);
    let contentRect = rect;
    if(style.fill) {
      ctx.fillStyle = style.fillStyle;
      ctx.fillRect(...rect);
      contentRect = rect;
    }
    if(style.border) {
      const bw = style.borderWidth/2;
      const borderRect = offsetSize(rect, bw, bw, bw, bw);
      ctx.strokeStyle = style.borderColor;
      ctx.lineWidth = style.borderWidth;
      ctx.strokeRect(...borderRect);
      contentRect = borderRect;
    }
    return offsetSize(contentRect, 0, 0, 0, 0);
  }
  static offsetSize = offsetSize;
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
