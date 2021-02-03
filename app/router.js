'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user_data', controller.home.index);
  router.post('/user_gears', controller.home.index);
};
