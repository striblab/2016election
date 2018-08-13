const gulp = require('gulp');
const archiePipe = require('archieml-pipe').default;
const gulpPublish = require('./gulp-publish');
const configUtil = require('./config.js');
const ejs = require('gulp-ejs');
const _ = require('lodash');

let { config, error } = configUtil.getConfig();

gulp.task('archie', (cb) => {
    archiePipe(config.archie);
    cb();
});
