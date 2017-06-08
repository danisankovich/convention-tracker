var babel = require("babel-core");
var fs = require('fs');
var path = require('path');

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

var dirs = fs.readdirSync('./babelSrc');
dirs.forEach(function(dir) {
  if (!fs.existsSync(path.join('dist', dir))) fs.mkdirSync(path.join('dist', dir));
  var files = fs.readdirSync(path.join('./babelSrc', dir));
  files.forEach(function(file) {
    var code = fs.readFileSync(path.join('./babelSrc', dir, file), 'utf-8');
    var result = babel.transform(code, { "presets": ["babel-polyfill", "react", "es2015", "stage-0"], plugins: ["babel-plugin-transform-runtime"] });
    fs.writeFileSync(path.join('dist', dir, file), result.code)
  });
});

var code = fs.readFileSync('./app.js', 'utf-8');
var result = babel.transform(code, { "presets": ["babel-polyfill", "react", "es2015", "stage-0"], plugins: ["babel-plugin-transform-runtime"] });
fs.writeFileSync('./main.js', result.code)
