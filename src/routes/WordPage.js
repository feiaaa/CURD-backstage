import React from 'react';
import { connect } from 'dva';

//组件
import MainLayout from '../components/MainLayout/MainLayout';
import WordList from '../components/Word/WordList';

function WordPage({ location }) {
  return (
    <MainLayout location={location}>
      <WordList />
    </MainLayout>
  );
}




export default connect()(WordPage);
