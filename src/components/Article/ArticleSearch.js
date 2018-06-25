import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Input, DatePicker, Form } from 'antd';
import styles from '../MainLayout/MainLayout.less';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
class ArticleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleSearch = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      var rangeTimeValue = fieldsValue['range-time-picker'];
      var values;
      if(rangeTimeValue===undefined || rangeTimeValue.length ===0){
        values = { ...fieldsValue, createTime: 0, endTime:Date.parse(new Date()) };
      }
      else{
        values = { ...fieldsValue, createTime: rangeTimeValue[0].format('X') * 1000, endTime: rangeTimeValue[1].format('X') * 1000 };
      }
      delete values['range-time-picker'];
      console.log('搜索填入信息: ', values, values instanceof Array);
      this.props.dispatch({
        type: 'article/query',
        payload:values,
      });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout={'inline'}>
        <div className={styles.searchLeft}>
          <FormItem label="时间" key="time">
            {getFieldDecorator('range-time-picker')(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '400px' }} />,
            )}
          </FormItem>
          <FormItem label="主标题" key="companyName">
            {getFieldDecorator('companyName')(
              <Input placeholder="请输入主标题" style={{ width: '161px' }} />,
            )}
          </FormItem>
          <FormItem label="副标题" key="name">
            {getFieldDecorator('name')(
              <Input placeholder="请输入副标题" style={{ width: '161px' }} />,
            )}
          </FormItem>
          <FormItem label="大类" key="phone">
            {getFieldDecorator('phone')(
              <Input placeholder="请输入大类" style={{ width: '161px' }} />,
            )}
          </FormItem>
          <Button htmlType="submit" type="primary">搜索</Button>
        </div>

      </Form>
    );
  }
}
export default connect(stat => stat)(Form.create()(ArticleSearch));
