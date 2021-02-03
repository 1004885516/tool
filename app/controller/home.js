'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
  }

  async index() {

    const { ctx, service, reqBody } = this;
    
    const data = await service.readFile.userData(reqBody);
    
    ctx.body = data;
  }

  async userGears() {

    const { ctx, service, reqBody } = this;
    
    const data = await service.readFile.userGears(reqBody);
    
    ctx.body = data;
  }

}

module.exports = HomeController;
