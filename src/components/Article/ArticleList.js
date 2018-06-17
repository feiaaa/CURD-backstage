import React, { Component, PropTypes } from 'react';
import styles from './Article.less';
// 采用antd的UI组件
import { Table, messarticleType, Popconfirm,Button } from 'antd';

// 采用 stateless 的写法
const ArticleList = ({
                    total,
                    current,
                    loading,
                    dataSource,
                  }) => {

  const columns = [{
    title: '时间',
    dataIndex: 'articleTime',
    key: 'articleTime',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: '类别',
    dataIndex: 'articleType',
    key: 'articleType',
  }, {
    title: '链接',
    dataIndex: 'urlAddress',
    key: 'urlAddress',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={()=>{}}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
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
      <Button className={styles.greenButton} >新增</Button>
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

export default ArticleList;
