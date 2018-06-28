import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './MainLayout.less';
import { Popconfirm } from 'antd';
;
const Header = ({
                  app,
                  dispatch,
                }) => {
  function goExit(e) {
    dispatch({ type: 'app/logout'});
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>布丁CRM</div>
      <div className={styles.info}>
        <Popconfirm title="确认退出?" onConfirm={goExit}>
          <a className={styles.buttonExit}>退出</a>
        </Popconfirm>

      </div>

    </div>
  );
};

Header.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({ app }) => ({ app }))(Header);
