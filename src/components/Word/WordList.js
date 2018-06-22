import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Word.less';
// import WordSearch from './WordSearch';
// import WordModal from './WordModal';
// 采用antd的UI组件
import { Table,  Popconfirm,Button,Icon } from 'antd';


function WordList({location, dispatch,list: dataSource, Word,total,loading,current}) {
  //CURD funtion start
  function createHandler(values) {
    // dispatch({
    //   type: 'Word/create',
    //   payload: values,
    // });
  }
  function deleteHandler(id) {
    // dispatch({
    //   type: 'Word/remove',
    //   payload: id,
    // });
  }
  function editHandler(id, values) {
    // dispatch({
    //   type: 'Word/patch',
    //   payload: { id, values },
    // });
  }
  //CURD function end
  const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',

  }, {
    title: '类别',
    dataIndex: 'development',
    key: 'development',
  }, {
    title: '主标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '副标题',
    dataIndex: 'subTitle',
    key: 'subTitle',
  }, {
    title: '链接',
    dataIndex: 'urlAddress',
    key: 'urlAddress',
    render: (text,record) => <a href={record.urlAddress} target="_blank">{text}</a>,
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        {/*<WordModal record={record} onOk={editHandler.bind(null, record.id)}>*/}
          <a>编辑</a>
        {/*</WordModal>*/}
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={deleteHandler.bind(null, record.id)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  // 定义分页对象
  const pagination = {
    total,
    current,
    pWordTypeSize: 10,
    onChange: ()=>{},
  };
  return (
    <div>
      <div className={`${styles.searchForm} ${styles.overflow}`}>
        {/*<WordSearch/>*/}
        {/*<WordModal record={{}} onOk={createHandler}>*/}
          {/*<Button className={styles.greenButton} >*/}
            {/*<Icon type="plus" />新增</Button>*/}
        {/*</WordModal>*/}
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
      />
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state,'state');
  const { list, total, current } = state.article;
  return {
    loading: state.article.loading,
    list,
    total,
    current
  };
}
export default connect(mapStateToProps)(WordList);
