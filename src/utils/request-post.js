import axios from 'axios';
import settle from 'axios/lib/core/settle';
import querystring from 'query-string';
import { target } from '../utils/config.js';

// 请求超时时间
const REQUEST_TIMEOUT = 5000;
const REQUEST_HEADERS = {};

const instance = axios.create({
  baseURL: target,
  timeout: REQUEST_TIMEOUT,
  headers: REQUEST_HEADERS,
});

let cacheMap = new Map();

const wrapperAdapter = (adapter) => {
  return (config) => {
    let cache = config.cache || false;
    if (cache && cacheMap.has(config.url)) {
      return new Promise((resolve, reject) => {
        settle(resolve, reject, cacheMap.get(config.url));
      });
    }
    return adapter(config);
  };
};

// 请求拦截
instance.interceptors.request.use(config => {
  if (!/^http/.test(config.url)) {
    config.url = target + config.url;
  }

  if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
    config.data = querystring.stringify(config.data);
  }

  // 包装请求处理方法在请求之前查看缓存
  config.adapter = wrapperAdapter(config.adapter);

  // Do something before request is sent
  //console.log(config,"请求拦截");
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(response => {
  if (response.config.cache) {
    // 使用缓存 根据请求地址 忽略参数
    let cacheKey = response.config.url;
    cacheMap.set(cacheKey, response);
  }
  //console.log(response,"响应拦截");
  return response;
}, error => {
  // Do something with response error
  return Promise.reject(error);
});

export default {
  post (...options) {
    return instance.post(...options);
  },
  get (...options) {
    return instance.get(...options);
  },
};
