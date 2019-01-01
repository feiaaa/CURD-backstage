import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.less';
import Header from './Header';
import SideMenu from './SideMenu';
import BreadcrumbCustom from './BreadcrumbCustom.js';
// 包含默认头部的布局组件
function MainLayout({ children, location }) {
  //改es6
  return (
    <div className={styles.mainOverflow}>
      <SideMenu location={location} />
      <div className={styles.content}>

        <Header location={location} />
        <div className={styles.breadCrumb}> <BreadcrumbCustom location={location}/></div>
        <div className={styles.main}>
          {children}
        </div>

      </div>
    </div>
  );
}

MainLayout.propTypes = {
  //children: PropTypes.isRequired,
  location: PropTypes.object,
};

export default MainLayout;
