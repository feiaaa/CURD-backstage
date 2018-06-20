'use strict';

const qs = require('qs');

// 引入 mock js

 // const mockjs = require('http://mockjs.com/dist/mock.js');
const mockjs = require('mockjs');

module.exports = {
  'GET /api/article' (req, res) {
    const page = qs.parse(req.query);

    const data = mockjs.mock({
      'data|100': [{
        'id|+1': 1,
        'articleName': '@cname',
        'articleTime': '@date',
        'articleType': '@INT(1,5)',
        'urlAddress': '@url'
      }],
      page: {
        total: 100,
        current: 1
      }
    });
    console.log(res,'res inmock')
    res.json({
      success: true,
      data: data.data,
      page: data.page
    });
  },
};
