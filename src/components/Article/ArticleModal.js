import React, { Component } from 'react';
import { Form, Input,Modal,DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
class ArticleModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,

    };
  }
  componentDidMount(){
    this.setState({

    })
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    //清空表单内容
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      // const time=values['date-picker'].format('YYYY-MM-DD');
      // console.log(time,'time');
      if (!err) {
        var params={
          title:values.title,
          subTitle:values.subTitle,
          development:values.development,
          time:values.time.format(dateFormat),
          urlAddress:values.urlAddress,
          id:values.id,
        }
        //console.log(values,"values in okHandler",params,"params in okHandler station");
        onOk(params);
        this.hideModelHandler();
      }
    });
  };
  render(){


    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    var { id,title,subTitle,development,time,urlAddress} = this.props.record;
    const today=new Date().toLocaleDateString();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return(
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={this.props.record.title===undefined?'新增文章':'编辑文章'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}

        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="主标题" key="title">
              {getFieldDecorator('title',{
                rules: [{required: true }],
                initialValue: title,
              })(
                <Input placeholder="请输入主标题"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="副标题" key="subTitle">
              {getFieldDecorator('subTitle',{
                rules: [{required: true }],
                initialValue: subTitle,
              })(
                  <Input placeholder="请输入副标题"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="开发语言" key="development">
              {getFieldDecorator('development',{
                rules: [{required: true }],
                initialValue: development,
              })(
                <Input placeholder="请输入开发语言"/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="时间" key="time">
              {getFieldDecorator('time',{
                rules: [{required: true }],
                initialValue: moment(time===undefined?today:time, dateFormat),
              })(
                <DatePicker onChange={this.onChange}/>,

              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Url" key="urlAddress">
              {getFieldDecorator('urlAddress',{
                rules: [{required: true }],
                initialValue: urlAddress,
              })(
                <Input placeholder="请输入地址"/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout}  key="id">
              {getFieldDecorator('id',{
                initialValue: id,
              })(
                <Input disabled={true} type="hidden"/>,
              )}
            </FormItem>

          </Form>
        </Modal>
      </span>
    )
  }
}
export default Form.create()(ArticleModal);
