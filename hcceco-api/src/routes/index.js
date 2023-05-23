const express = require('express');
const authRoute = require('./auth.route');
const defaultRoute = require('./default.route');
const config = require('../../config/config');
const docsRoute = require('./docs.route');
const locationRoute = require('./location.route');
const mainStream = require('./mainstream.route');
const subStream = require('./subStream.route');
const colStream = require('./colStream.route');





const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/', route: defaultRoute },
  { path: '/location', route: locationRoute },
  { path: '/mainStream', route: mainStream },
  { path: '/subStream', route:subStream },
  { path: '/colStream', route:colStream },




  

  // {
  //   path: '/examMode',
  //   route: examModeRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
