import React from 'react';
import { connect } from 'dva';
import styles from '../components/Article/Article.less';
//组件(暂时都没实现)

import ArticleList from '../components/Article/ArticleList';
import ArticleSearch from '../components/Article/ArticleSearch';
import ArticleModal from '../components/Article/ArticleModal';
function ArticlePage() {
  const articleSearchProps = {};
  const articleListProps = {
    total: 3,
    current: 1,
    loading: false,
    dataSource: [
      {
        articleTime: '2015',
        articleType: '科技博客',
        urlAddress: 'https://www.baidu.com/',
      },
      {
        articleTime: '2016',
        articleType: '科技博客',
        urlAddress: 'https://www.baidu.com/',
      },
      {
        articleTime: '2017',
        articleType: '生活笔记',
        urlAddress: 'https://www.baidu.com/',
      },
    ],
  };
  const articleModalProps = {};
  return (
    <div className={styles.normal}>
      {/* 文章筛选搜索框 */}
      <ArticleSearch {...articleSearchProps} />
      {/* 文章信息展示列表 */}
      <ArticleList {...articleListProps} />
      {/* 添加文章 & 修改文章弹出的浮层 */}
      <ArticleModal {...articleModalProps} />
    </div>
  );
}

ArticlePage.propTypes = {
};

export default connect()(ArticlePage);
