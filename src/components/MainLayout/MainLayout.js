import React, { PropTypes } from 'react';
import styles from './MainLayout.less';
import Header from './Header';
import SideMenu from './SideMenu';
import BreadcrumbCustom from './BreadcrumbCustom.js';
// 包含默认头部的布局组件
function MainLayout({ children, location }) {
  return (
    <div className={`${styles.normal} ${styles.mainOverflow}`}>
      <div className={styles.sideBar}><SideMenu location={location} /></div>
      <div className={styles.content}>

        <Header location={location} />
        <div className={styles.breadCrumb}> <BreadcrumbCustom /></div>
        <div className={styles.main}>
          {children}
        </div>

      </div>
    </div>
  );
}

// MainLayout.propTypes = {
//   children: PropTypes.element.isRequired,
//   location: PropTypes.object,
// };

export default MainLayout;