import React,{Component} from 'react';
import { Menu,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './MainLayout.less';
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
    //console.log(e,'handleClick');
  }
  render() {
    return (
      <div  className={this.state.collapsed ? styles.sideBarSmall:styles.sideBar}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          selectedKeys={[this.props.location.pathname]}
          mode="inline"
          theme="dark"
          defaultOpenKeys={['/articleList','/word']}
          onClick={this.handleClick.bind(this)}
          inlineCollapsed={this.state.collapsed}
        >

          <Menu.Item key="/articleList">
            <Link to="/articleList"><Icon type="file-text"/><span>文章列表</span></Link>
          </Menu.Item>

          <SubMenu key="/word" title={<span><Icon type="laptop" /><span>题库和单词管理</span></span>}>
            <Menu.Item key="/word/wordList"><Link to="/word/wordList"><Icon type="book" />单词列表</Link></Menu.Item>
            <Menu.Item key="/word/questionList"><Link to="/word/questionList"><Icon type="database" />题目列表</Link></Menu.Item>
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
