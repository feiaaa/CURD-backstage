import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';

// var notes='';
class BreadcrumbCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  // 分段面包屑的位置，字段 start
  getbreadcrumbPath(str, lvl) {
    let path = '#/';
    const arr = str.replace(/\?/, '/').split('/');
    if (lvl === 1) {
      path = arr[1];
    } else {
      path = arr[2];
    }
    return path;
  }
  getbreadcrumbName(str, lvl) {
    let names = '当前页面';
    const arr = str.replace(/\?/, '/').split('/');
    if (lvl === 1) {
      switch (arr[1]) {
        case 'articleList':
          names = '文章列表';
          break;
        case 'word':
          names = '题库和单词管理';
          break;

        default:
          names = '一级菜单';
          break;
      }
    } else {
      switch (arr[2]) {
        case 'wordList':
          names = '单词列表';
          break;
        case 'questionList':
          names = '题目';
          break;
        default:
          names = '二级菜单';
          break;
      }
    }
    return names;
  }
  // 分段面包屑的位置，字段 end
  render() {
    const routes = [
      {
        path:'1级',
        breadcrumbName:'1级',
        // path: this.getbreadcrumbPath(location.hash, 1),
        // breadcrumbName: this.getbreadcrumbName(location.hash, 1),
      }, {
        path:'2级',
        breadcrumbName:'2级',
        // path: this.getbreadcrumbPath(location.hash, 2),
        // breadcrumbName: this.getbreadcrumbName(location.hash, 2),
      }];
    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      // return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
      return last ? <span>{route.breadcrumbName}</span> : <span>{route.breadcrumbName}</span>;
    }
    // if(routes[1].path.indexOf('bannerIndex')!==-1)
    // {
    //   notes='建议上传宽度xxx px,高度xxx px的图片（类型:jpg、png），以免拉伸造成变形';
    // }
    // else {
    //   notes='';
    // }
    return (
      <div>
        当前位置：
        <Breadcrumb itemRender={itemRender} routes={routes} />
        {/*<label style={{color:'gray'}}>{notes}</label>*/}
      </div>
    );
  }
}

export default BreadcrumbCustom;
