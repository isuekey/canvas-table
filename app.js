// 这里需要这样写，不然很多东西不支持了
import * as CanvasTable from './dist/canvas-table.esm.js';

const canvasTable = new CanvasTable.table.CanvasTable('canvas-table');
const frameData = {
  header:[{
    children:[
      { label:'索引', type:[Symbol.for('index')] },
      { label:'姓名', type:[Symbol.for('string')], labelProperty:'name', },
      { label:'手机号', type:[], labelProperty:'phone' },
      { label:'操作', type:[] },
    ],
  }],
  body:[{
    children:[
      { type:[Symbol.for('index')] },
      { type:[Symbol.for('string')], labelProperty:'name', },
      { type:[], labelProperty:'phone' },
      { label:'操作', type:[] },
    ],
  }],
  style:{
    fillStyle:'white', fill:true,
    border:true,
    borderColor:'green',
    borderWidth:'2',
  },
};
const tableData = {
  body:[
    { id:1, name:'郑廉洁', phone:'12345678901', },
    { id:2, name:'方闲', phone:'12345678902', },
  ],
};
canvasTable.drawFrame(frameData);
canvasTable.drawData(tableData);
