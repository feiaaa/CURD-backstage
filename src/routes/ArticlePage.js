import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from '../components/Article/Article.less';
//组件(暂时都没实现)
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleList from '../components/Article/ArticleList';
import ArticleSearch from '../components/Article/ArticleSearch';
import ArticleModal from '../components/Article/ArticleModal';
function ArticlePage({location, dispatch, article}) {
  const {
    loading, list, total, current,
    currentItem, modalVisible, modalType
  } = article;
  const articleSearchProps = {};
  const articleListProps = {
    total,
    current,
    loading,
    dataSource: list,
  };
  const articleModalProps = {};
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        {/* 文章筛选搜索框 */}
        <ArticleSearch {...articleSearchProps} />
        {/* 文章信息展示列表 */}
        <ArticleList {...articleListProps} />
        {/* 添加文章 & 修改文章弹出的浮层 */}
        <ArticleModal {...articleModalProps} />
      </div>
    </MainLayout>

  );
}

ArticlePage.propTypes = {
  article: PropTypes.object,
};
function mapStateToProps({ article }) {
  return {article};
}
export default connect(mapStateToProps)(ArticlePage);
