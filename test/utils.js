
const { assert, expect, should } = require('chai');
const { random } = require('../test.index.js');

describe('uuid v4', () => {
  const times = 409600;
  describe('randomIndex', ()=>{
    it(`重复${times}，应该符合0<=idx<256`, ()=>{
      const outer = new Array(times).fill(0).map(ele => {
        return random.randomIndex();
      }).filter(ele => ele >= 256);
      return expect(outer).to.be.empty;
    });
    // 概率检测。一次没有中255的概率255/256，400次中的概率 1-(255/256)^1600
    // (1-1/256)^1600= 0.0019
    it(`重复${times}，应该会有255`, ()=>{
      const outer = new Array(times).fill(0).map(ele => {
        return random.randomIndex();
      }).filter(ele => ele == 255);
      return expect(outer).to.not.be.empty;
    });
    it(`获得64位相应16进制字符串`, ()=>{
      const hexString = random.randomHex(32);
      // console.log('64 hexString', hexString);
      return expect(hexString).to.have.lengthOf(32);
    });
  });
});
