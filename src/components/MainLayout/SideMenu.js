import React from 'react';
import { Menu,Button,Icon } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;
function SideMenu({location}) {



  return (
    <div>
      {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
        {/*<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
      {/*</Button>*/}
      {/*//要改成es6*/}
    <Menu
      selectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
      defaultOpenKeys={['/articleList']}
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
