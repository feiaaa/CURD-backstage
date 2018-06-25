import React,{Component} from 'react';
import { Menu,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,

    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick= (e) => {
    //console.log(e,'e');

  }
  render() {
    //console.log(window.location.pathname,"window.location.pathname");
    return (
      <div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        {/*//要改成es6*/}
        <Menu
          selectedKeys={[window.location.pathname]}
          mode="inline"
          theme="dark"
          defaultOpenKeys={['/articleList']}
          onClick={this.handleClick.bind(this)}
          inlineCollapsed={this.state.collapsed}
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
}
export default connect(stat => stat)(SideMenu);
