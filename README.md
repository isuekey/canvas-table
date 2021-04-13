# 简介 #

## 目的 ##

一个简单的通过canvas绘制表格的功能。
结合最近学习的SICP，梳理一些概念。
节点的描述使用Flutter的理念，DOM树的方式书写
这是一个简单的table，不支持嵌套table

## 功能 ##

  * 固定表头
  * 固定左侧列，
  * 固定右侧列
  * 选中行
  * 表格高度，最小高度，最大高度，
  * 表格宽度，最小宽度，最大宽度，
  * 单元格宽度，最小宽度，最大宽度
  * 单元格内选中文案
  * 单元格内内容点击事件
  * 因为我们可能会使用symbol，所以计划仅支持现代浏览器

# 调试 #
  * http-server .
  * localhost:8080?/index.html

# 规划 #

  * 发布工具包，使包vue-canvas-table能够利用此工具包。
  * 通过vueJS2.0对象定义canvas-table内容
  * 绘制简单表格
  * 增加表格单元格控制
  * 增加表格控制
  * 滚动、拖拽事件增加到组件内

## 准备环境 ##

### 基本准备 ###

  * mkdir canvas-table; cd canvas-table;
  * yarn init .
  * git init .

### 工具准备 ###

  * webpack
  * typescript
  * mocha + chai

## 思路 ##
  * 单元不应该错位。所以表格里的内容，可以横平竖直的，内容层。
    * 计算 rows, cols 相关属性
  * 因为有colspan, rowspan内容，所以需要增加一层覆盖层。
    * 计算 cell 相关属性
  * 因为有固定列，所以需要增加一层。
  * 固定单元也可能有span，所以再更加一层覆盖层。
  * 考虑单元格不能重叠，所以在覆盖层需要使用碰撞检测（再说吧，感觉不重要。搞错了，就调整下数据设置）。
  * 还有一层控制层，处理滚动拖拽。
  * 
  
# 框架 #

## 数据约定 ##
  * containerId 从document中找到容器
  * frameData 表格的框架信息
  * drawData 表格的信息

### frameData 表格的框架信息 ###

```
style={
};
cell = {
  style,
  fixed:['left', 'right'],
  col:1, row:1, 
  label: '描述', 
  display:'inline/flex',
  type:[Symbol.for('array'),Symbol.for('string'),Symbol.for('anchor'), Symbol.for('icon'), Symbol.for('index')], 
  arrayProperty:'对应数据的array属性',
  labelProperty:'对应数据的显示属性',
  anchorProperty:'对应数据的链接属性',
  iconProperty:'对应数据的图标属性'
};
cell:固定内容 = {
  col:1, row:1, 
  label: '描述', 
  display:'inline/flex',
  type:[Symbol.for('string'),Symbol.for('anchor'), Symbol.for('icon')], 
  anchorProperty:'对应数据的链接属性', // 存在type:anchor时使用
  iconProperty:'对应数据的图标属性',// 存在type:icon时使用
};
cell:序号 = {
  col:1, row:1, 
  label: '描述', 
  display:'inline/flex',
  type:[Symbol.for('index'),Symbol.for('anchor'), Symbol.for('icon')], // 存在type:index
  anchorProperty:'对应数据的链接属性', // 存在type:anchor时使用
  iconProperty:'对应数据的图标属性',// 存在type:icon时使用
};
cell:动态内容 = {
  col:1, row:1, 
  label: '描述', 
  display:'inline/flex',
  type:[Symbol.for('string'),Symbol.for('anchor'), Symbol.for('icon')], 
  labelProperty:'对应数据的显示属性', //优先生效
  anchorProperty:'对应数据的链接属性', // 存在type:anchor时使用
  iconProperty:'对应数据的图标属性', // 存在type:icon时使用
};
cell:数组内容 = {
  col:1, row:1, 
  label: '描述', 
  display:'inline/flex',
  type:[Symbol.for('array'),Symbol.for('string'),Symbol.for('anchor'), Symbol.for('icon')], // 存在array, 
  arrayProperty:'对应数据的array属性', // 存在array, 
  labelProperty:'子元素对应数据的显示属性', // 优先生效
  anchorProperty:'子元素对应数据的链接属性', // 存在type:anchor时使用
  iconProperty:'子元素对应数据的图标属性', // 存在type:icon时使用
};
row = {
  children:[cell],
};
frameData = {
  header:[row],
  left:[row],
  body:[row],
  right:[row],
  footer:[row],
};
data={
  ...someProperties
};
tableData = {
  header:[data],
  left:[data],
  body:[data],
  right:[data],
  footer:[data],
};
```

### drawData 表格的数据信息 ###

## API描述 ##

  * constructor
  * drawFrame

# 表头 #

# 主体数据 #

# 表尾 #

# 控制操作 #

