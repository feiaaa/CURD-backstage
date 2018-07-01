import React from 'react';
import { connect } from 'dva';
import styles from '../MainLayout/MainLayout.less';
import QuestionSearch from './QuestionSearch';
import QuestionModal from './QuestionModal';
// 采用antd的UI组件
import { Table,  Popconfirm,Button,Icon } from 'antd';


function QuestionList({location, dispatch,list: dataSource, word,total,loading,current}) {
  console.log(dataSource,'dataSource');
  //CURD funtion start
  function createHandler(values) {
    dispatch({
      type: 'question/create',
      payload: values,
    });
  }
  function deleteHandler(id) {

    dispatch({
      type: 'question/remove',
      payload: id,
    });
  }
  function editHandler(id, values) {
    console.log(id,'id');
    dispatch({
      type: 'question/patch',
      payload: { id, values },
    });
  }
  //CURD function end
  //点击页码换页面&填入数字回车跳页
  function pageChangeHandler(page) {
    console.log(page,'page');
    var params={
      page:page-1
    };
    dispatch({
      type: 'question/query',
      payload: params,
    });

  }

  const columns = [{
    title: '题目编号',
    dataIndex: 'questionId',
    key: 'questionId',
    width:'40',
  }, {
    title: '题目',
    dataIndex: 'question',
    key: 'question',
    width:'25%',
  }, {
  }, {
    title: '提示',
    dataIndex: 'hint',
    key: 'hint',
    width:'25%',
  }, {
    title: '关联单词',
    dataIndex: 'wordId',
    key: 'wordId',
    width:'15%',
  }, {
    title: '关联课程',
    dataIndex: 'lesson',
    key: 'lesson',
    width:'10%',
    render: (text,record) => <span>{record.lesson+1}</span>,
  }, {
    title: '操作',
    key: 'operation',
    width:120,
    render: (text, record) => (
      <p>
        <QuestionModal record={record} onOk={editHandler.bind(null, record.questionId)}>
          <a>编辑</a>
        </QuestionModal>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={deleteHandler.bind(null, record.questionId)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  // 定义分页对象
  const pagination = {
    showQuickJumper:true,
    total,
    current,
    particleTypeSize: 10,
    onChange: (current)=>{pageChangeHandler(current)},
  };
  return (
    <div>
      <div className={`${styles.searchForm} ${styles.overflow}`}>
        <QuestionSearch/>
        <QuestionModal record={{}} onOk={createHandler}>
          <Button type="primary">
            <Icon type="plus" />新增</Button>
        </QuestionModal>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.questionId}
        pagination={pagination+1}
      />
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state,'state in questionlist');
  const { list, total, current } = state.question;
  return {
    loading: state.question.loading,
    list,
    total,
    current
  };
}
export default connect(mapStateToProps)(QuestionList);
