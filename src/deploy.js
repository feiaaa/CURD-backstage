// deploy.js
// const fs = require('fs-extra');
// const routes = require('routes.js')
const fs = require('fs');
const routes = [
  'login',
  'articleList',
  'word/wordList',
  'word/questionList'
]
const path = require('path')
routes.forEach((route) => {
  fs.copyFileSync('src/index.html', path.join('dist/',route, 'index.html'))
})
