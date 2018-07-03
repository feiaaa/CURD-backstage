import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Input, Form } from 'antd';
import styles from '../MainLayout/MainLayout.less';

const FormItem = Form.Item;
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
      this.props.dispatch({
        type: 'question/query',
        payload: fieldsValue,
      });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout={'inline'}>
        <div className={styles.searchLeft}>

          <FormItem label="课程编号" key="lesson">
            {getFieldDecorator('lesson')(
              <Input placeholder="请输入课程编号" style={{ width: '161px' }} />,
            )}
          </FormItem>

          <FormItem label="背诵词书" key="book">
                {getFieldDecorator('book')(
              <Input placeholder="默认" style={{ width: '161px' }} disabled/>,
            )}
          </FormItem>
          <Button htmlType="submit" type="primary">搜索</Button>
        </div>

      </Form>
    );
  }
}
export default connect(stat => stat)(Form.create()(ArticleSearch));
