'use strict';


const xlsx = require('xlsx');
const Service = require('egg').Service;
const typeData = require('../common/ChargeType');
class ReadFile extends Service {

  async userData (reqBody) {

    const { userId, time } = reqBody;

    const dbName = `Charge_${time}`;

    const query = {
        where: { UserId: userId },
        orders: [['ID','desc']], // 排序方式
    }

    const userData = await this.app.mysql.select(dbName, query);
    
    const data = JSON.parse(JSON.stringify(userData));
    const dataArr = [];
    data.forEach(item => {
        const obj = {};
        obj['时间'] = item.CreateTime;
        obj['ID'] = item.UserId;
        obj['获取方式'] = typeData[item['ChgType']];
        obj['金额'] = item['ChgType'] < 100 ? '-' + item['CoinNum'] : '+' + item['CoinNum'];
        obj['剩余金币'] = item.Balance
        dataArr.push(obj)
    });

    let ss = xlsx.utils.json_to_sheet(dataArr); //通过工具将json转表对象
    let keys = Object.keys(ss).sort();
    let ref = keys[1]+':'+keys[keys.length - 1]; //这个是定义一个字符串 也就是表的范围[A1:C5] 

    let workbook = { //定义操作文档
        SheetNames:['nodejs-sheetname'], //定义表明
        Sheets:{
            // 'nodejs-sheetname':Object.assign({},ss,{'!ref':ref}) //表对象[注意表明]
            'nodejs-sheetname':Object.assign({},ss)
        },
    }

    const result = await xlsx.writeFile(workbook, `./${userId}-user-${time}.xls`)
    return result;
  }
  async userGears (reqBody) {

    const { userId, time } = reqBody;

    const dbName = `PlayerRecord_${time}`;

    const query = {
        where: { UserId: userId },
        orders: [['ID','desc']], // 排序方式
    }

    const userData = await this.app.mysql.select(dbName, query);
    const data = JSON.parse(JSON.stringify(userData));
    const dataArr = [];
    data.forEach(item => {
        const obj = {};
        obj['时间'] = item.CreateTime;
        obj['玩法'] = item.GameName;
        obj['场次'] = item.RoomLevel;
        obj['档位'] = item.PlayerRank;
        obj['与真人输赢'] = item.WinPlayer;
        obj['与机器人输赢'] = item.WinRobot;
        dataArr.push(obj)
    });

    let ss = xlsx.utils.json_to_sheet(dataArr); //通过工具将json转表对象

    let workbook = { 
        SheetNames:['nodejs-sheetname'],
        Sheets:{
            'nodejs-sheetname':Object.assign({},ss)
        },
    }

    const result = await xlsx.writeFile(workbook, `./${userId}-gears-${time}.xls`)
    return result;
  }
}

module.exports = ReadFile;