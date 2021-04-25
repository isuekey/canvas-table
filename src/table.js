
import * as utils from './utils/index.js';
console.log('utils', utils);
const canvasTableMap = {};
const canvasSize = async (canvas={}) => {
  return {
    width:canvas.clientWidth || window.innerWidth,
    height:canvas.clientHeight || window.innerHeight
  };
};
const initTable = (canvasTable={}) =>{
  const uuid = utils.uuidv4.uuid();
  canvasTable.container = document.querySelector("#"+canvasTable.canvasId);
  if(!canvasTable.container){
    throw('没有找到相应的元素:' + canvasTable.canvasId);
  }
  const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = canvasTable.container;
  console.log('canvas table container', offsetHeight, offsetLeft, offsetTop, offsetWidth);
  const canvas = document.createElement('canvas');
  canvas.id = uuid;
  canvasTable[Symbol.for('uuid')] = uuid;
  const canvasStyle = "width:100%;height:100%";
  canvas.style = canvasStyle;
  canvasTable.container.appendChild(canvas);
  canvasTable.canvas = canvasSize(canvas).then((size) => {
    canvas.width= size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');
    canvasTable[contextSymbol] = ctx;
    return canvas;
  });
};
const handleSymbol = Symbol('handle');
const contextSymbol = Symbol('context');
class CanvasTable {
  constructor(canvasId) {
    if(canvasTableMap[canvasId]) {
      return canvasTableMap[canvasId];
    };
    this.canvasId = canvasId;
    initTable(this);
    canvasTableMap[canvasId] = this;
    this[handleSymbol] = Promise.resolve('ok');
    return this;
  }
  prepareDraw(frameData=this.frameData, rect) {
  }
  handleDrawFrame(frameData=this.frameData) {
    const style = frameData.style;
    const ctx = this[contextSymbol];
    this.canvas.then((canvas) => {
      const canvasRect = utils.rect.Rect.fromAxisWidthHeight(0, 0, canvas.width, canvas.height);
      const contentRect = canvasRect.drawStyle(ctx, style);
      const prepared = this.prepareDraw(frameData, Rect.fromAxisWidthHeight(...contentRect));
    });
    return this.canvas;
  };
  drawFrame(frameData={style:{}}){
    this.frameData = frameData;
    this[handleSymbol] = this[handleSymbol].then(()=> {
      return this.handleDrawFrame(frameData);
    }).then(()=>{
      if(this.tableData) {
        return this.handleDrawTable(this.tableData);
      };
      return 'drawFrame';
    }).catch(err=>{
      console.log('draw table frame err', err);
    });
  };
  handleDrawTable(tableData={}) {
    return this.canvas;
  };
  drawData(tableData={}){
    this.tableData = tableData;
    this[handleSymbol] = this[handleSymbol].then(()=> {
      return this.handleDrawTable(tableData);
    }).catch(err => {
      console.log('draw table data err', err);
    });
  };
};

export {
  CanvasTable
};
