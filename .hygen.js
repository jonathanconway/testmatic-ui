//.hygen.js
module.exports = {
  templates: `${__dirname}/_templates`,
  helpers: {
    relative: (from, to) => path.relative(from, to),
    src: ()=> process.argv.pop()
  }
}