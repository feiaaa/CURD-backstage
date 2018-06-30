import React from 'react';
import { connect } from 'dva';

//组件
import MainLayout from '../components/MainLayout/MainLayout';
import QuestionList from '../components/Word/QuestionList';

function QuestionPage({ location }) {
  return (
    <MainLayout location={location}>
      <QuestionList />
    </MainLayout>
  );
}




export default connect()(QuestionPage);
