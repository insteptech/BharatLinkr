const express = require('express');
const authRoute = require('./auth.route');
const defaultRoute = require('./default.route');
const config = require('../../config/config');
const docsRoute = require('./docs.route');
const locationRoute = require('./location.route');
const mainStream = require('./mainstream.route');
const subStream = require('./subStream.route');
const colStream = require('./colStream.route');
const masterFilter = require('./masterFilter.route');
const course = require('./course.route');
const exam = require('./exam.route');
const college = require('./college.route');
const corporate =require('./corporate.route');
const organisation =require('./organisation.route');
const profession =require('./profession.route');




const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/', route: defaultRoute },
  { path: '/location', route: locationRoute },
  { path: '/mainStream', route: mainStream },
  { path: '/subStream', route:subStream },
  { path: '/colStream', route:colStream },
  {path: '/masterFilter', route:masterFilter},
  {path: '/Course', route:course},
  {path: '/Exam', route:exam},
  {path: '/college', route:college},
  {path: '/corporate', route:corporate},
  {path: '/organisation', route:organisation},
  {path: '/profession', route:profession}










  

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
