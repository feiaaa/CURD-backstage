import React from 'react';
import { Menu,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import styles from './MainLayout.less';
const SubMenu = Menu.SubMenu;

function SideMenu({location}) {
  console.log(location,'location in sub');
  // var collapsed = false;
  //
  // function toggleCollapsed(){
  //   //this.collasped=!this.collasped;
  //   //console.log(this.collasped,'this collasped',collasped,'collasped')
  // }
  return (
    <div className={styles.sideBar}>

    <Menu
      selectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
      defaultOpenKeys={['/articleList','/word']}
    >

      <Menu.Item key="/articleList">
        <Link to="/articleList"><Icon type="file-text"/>文章列表</Link>
      </Menu.Item>

      <SubMenu key="/word" title={<span><Icon type="laptop" /><span>题库和单词管理</span></span>}>
      <Menu.Item key="/word/wordList"><Link to="/word/wordList"><Icon type="book" />单词列表</Link></Menu.Item>
      {/*<Menu.Item key="/word/questionList"><Link to="/word/questionList"><Icon type="database" />题目列表</Link></Menu.Item>*/}
      </SubMenu>
      {/*<Menu.Item key="/setting">
        <Link to="/setting"><Icon type="setting" />设置</Link>
      </Menu.Item>*/}


    </Menu>
    </div>
  );
}
export default SideMenu;
