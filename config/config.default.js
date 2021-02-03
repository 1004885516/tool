/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612337627526_584';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      // host: '172.31.10.249',  // 测试服
      host: 'cn-zz-bgp-2.sakurafrp.com',  // 正式服
      // 端口号
      // port: '3306',  // 测试服
      port: '51888',  // 正式服
      // 用户名
      user: 'root',
      // 密码
      // password: 'yeahmobi',   // 测试服
      password: 'amz-mb26-cx006game-8-8',   // 线上
      // 数据库名
      database: 'Yeahmobi_rummyup',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
