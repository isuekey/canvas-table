
import * as utils from './utils/index.js';

const canvasTableMap = {};
const canvasSize = new Promise((resolve, reject) => {
  return resolve({
    width:window.innerWidth,
    height:window.innerHeight
  });
});
const initTable = (canvasTable={}) =>{
  const uuid = utils.uuidv4.uuid();
  canvasTable.container = document.querySelector("#"+canvasTable.canvasId);
  if(!canvasTable.container){
    throw('没有找到相应的元素:' + canvasTable.canvasId);
  }
  canvasTable.canvas = canvasSize.then((size) => {
    canvasTable.size = size;
    const nodeOptions = {
      ...size, id:uuid,
    };
    const canvas = document.createElement('canvas', nodeOptions);
    canvasTable.container.appendChild(canvas);
    return canvas;
  });
};
const handleSymbol = Symbol('handle');
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
  handleDrawFrame(frameData={}) {
    return this.canvas;
  };
  drawFrame(frameData={}){
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
