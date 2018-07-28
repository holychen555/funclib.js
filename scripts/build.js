const fn = require('funclib');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf');

const root = path.dirname(__dirname);
const fnJs = path.join(root, 'assets/funclib.js');
const fnMinJs = path.join(root, 'assets/funclib.min.js');
const rdmeDist = path.join(root, 'assets/README.md');
const rdmeSrc = path.join(root, 'README.md');

fn.progress.start({title: 'Building FunclibJs'});

[rdmeDist, fnJs, fnMinJs].forEach(f => fn.rm(f));
fn.cp(rdmeSrc, rdmeDist);

webpack(config.funclibJsConf, function (err, stats) {
  if (err) throw (err);
  fn.progress.stop(() => {
    fn.log('', {part: 'pre', title: 'Building FunclibJs'});
    process.stdout.write(stats.toString({
      colors: true, modules: false,
      children: false, chunks: false, chunkModules: false
    }) + '\n');
    fn.log('', {part: 'end'});
    buidFunclibJs();
  });
});

function buidFunclibJs() {
  fn.progress.start({title: 'Building FunclibMinJs', width: 37});
  webpack(config.funclibMinJsConf, function (err, stats) {
    if (err) throw (err);
    fn.progress.stop(() => {
      fn.log('', {part: 'pre', title: 'Building FunclibMinJs'});
      process.stdout.write(stats.toString({
        colors: true, modules: false,
        children: false, chunks: false, chunkModules: false
      }) + '\n');
      fn.log('', {part: 'end'});
      buildIndexJs();
    });
  });
}

function buildIndexJs() {
  fn.progress.start({title: 'Building IndexJs', width: 42});
  webpack(config.indexJsConf, function (err, stats) {
    if (err) throw (err);
    fn.progress.stop(() => {
      fn.log('', {part: 'pre', title: 'Building IndexJs'});
      process.stdout.write(stats.toString({
        colors: true, modules: false,
        children: false, chunks: false, chunkModules: false
      }) + '\n');
      fn.log('', {part: 'end'});
    });
  });
}
