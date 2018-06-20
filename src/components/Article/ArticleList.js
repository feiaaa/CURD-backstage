import React, { Component } from 'react';
 import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Article.less';
import ArticleSearch from './ArticleSearch';
import ArticleModal from './ArticleModal';
// 采用antd的UI组件
import { Table,  Popconfirm,Button,Icon } from 'antd';


function ArticleList({location, dispatch,list: dataSource, article,total,loading,current}) {
  //CURD funtion start
  function createHandler(values) {
    dispatch({
      type: 'article/create',
      payload: values,
    });
  }
  function deleteHandler(id) {
    dispatch({
      type: 'article/remove',
      payload: id,
    });
  }
  function editHandler(id, values) {
    dispatch({
      type: 'article/patch',
      payload: { id, values },
    });
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
        <ArticleModal record={record} onOk={editHandler.bind(null, record.id)}>
        <a>编辑</a>
        </ArticleModal>
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
    particleTypeSize: 10,
    onChange: ()=>{},
  };
  return (
    <div>
      <div className={`${styles.searchForm} ${styles.overflow}`}>
        <ArticleSearch/>
        <ArticleModal record={{}} onOk={createHandler}>
          <Button className={styles.greenButton} >
            <Icon type="plus" />新增</Button>
        </ArticleModal>
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
  const { list, total, current } = state.article;
  return {
    loading: state.article.loading,
    list,
    total,
    current
  };
}
export default connect(mapStateToProps)(ArticleList);
