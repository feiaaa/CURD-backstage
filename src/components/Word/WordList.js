import React from 'react';
import { connect } from 'dva';
import styles from '../MainLayout/MainLayout.less';
import WordModal from './WordModal';
import WordSearch from './WordSearch';
// 采用antd的UI组件
import { Table,  Popconfirm,Button,Icon } from 'antd';


function WordList({location, dispatch,list: dataSource, word,total,loading,current}) {
  //CURD funtion start
  function createHandler(values) {
    dispatch({
      type: 'word/create',
      payload: values,
    });
  }
  function deleteHandler(id) {

    dispatch({
      type: 'word/remove',
      payload: id,
    });
  }
  function editHandler(id, values) {
    console.log(id,'id');
    dispatch({
      type: 'word/patch',
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
      type: 'word/query',
      payload: params,
    });

  }

  const columns = [{
    title: '单词编号',
    dataIndex: 'wordId',
    key: 'wordId',
    width:'40',
  }, {
    title: '单词',
    dataIndex: 'word',
    key: 'word',
    width:'15%',
  }, {
  }, {
    title: '平假名发音',
    dataIndex: 'hiragana',
    key: 'hiragana',
    width:'20%',
    render: (text,record) => <span>{record.hiragana+record.tone}</span>,
  }, {
    title: '词性',
    dataIndex: 'speech',
    key: 'speech',
    width:'15%',
  }, {
    title: '中文',
    dataIndex: 'chinese',
    key: 'chinese',
    width:'20%',
 }, {
    title: '课程',
    dataIndex: 'lesson',
    key: 'lesson',
    width:'10%',
  }, {
    title: '操作',
    key: 'operation',
    width:120,
    render: (text, record) => (
      <p>
        <WordModal record={record} onOk={editHandler.bind(null, record.wordId)}>
        <a>编辑</a>
        </WordModal>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={deleteHandler.bind(null, record.wordId)}>
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
        <WordSearch/>
        <WordModal record={{}} onOk={createHandler}>
          <Button type="primary">
            <Icon type="plus" />新增</Button>
        </WordModal>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.wordId}
        pagination={pagination+1}
      />
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state,'state in wordlist');
  const { list, total, current } = state.word;
  return {
    loading: state.word.loading,
    list,
    total,
    current
  };
}
export default connect(mapStateToProps)(WordList);
