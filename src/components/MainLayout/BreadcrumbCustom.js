import React, { Component } from 'react';
import { Breadcrumb, Icon} from 'antd';
import styles from './MainLayout.less';
// var notes='';
class BreadcrumbCustom extends Component {
  constructor(props) {
    super(props);
    console.log(props,'propr')
    this.state = {

    };
  }
  componentDidMount() {

  }
  // 分段面包屑的位置，字段 start
  getbreadcrumbPath(str, lvl) {
    console.log(str,'str')
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
          names = '';
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
          names = '';
          break;
      }
    }
    return names;
  }
  // 分段面包屑的位置，字段 end
  render() {
    const routes = [
      {
        path: this.getbreadcrumbPath(this.props.location.pathname, 1),
        breadcrumbName: this.getbreadcrumbName(this.props.location.pathname, 1),
      }, {
        path: this.getbreadcrumbPath(this.props.location.pathname, 2),
        breadcrumbName: this.getbreadcrumbName(this.props.location.pathname, 2),
      }];
    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      console.log(route, params, routes, paths,'itemerner')
      return last ? <span>{route.breadcrumbName}</span> : <span to={paths.join('/')}>{route.breadcrumbName}</span>;// hashhistory 打开这个
      // return last ? <span>{route.breadcrumbName}</span> : <span>{route.breadcrumbName}</span>;//browserhistory打开这个
    }
    return (
      <div className={styles.flexCont}>
        <span className={styles.flexItem}> 当前位置<Icon type="right" /></span>
        <Breadcrumb className={styles.flexItem8} itemRender={itemRender} routes={routes} />
        {/*<label style={{color:'gray'}}>{notes}</label>*/}
      </div>
    );
  }
}

export default BreadcrumbCustom;
