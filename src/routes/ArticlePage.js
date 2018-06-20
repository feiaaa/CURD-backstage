import React from 'react';
import { connect } from 'dva';

//组件
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleList from '../components/Article/ArticleList';

function ArticlePage({ location }) {
  return (
    <MainLayout location={location}>
      <ArticleList />
    </MainLayout>
  );
}




export default connect()(ArticlePage);
