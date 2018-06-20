import React, { Component } from 'react';
import { Form, Input, Button, Icon, Modal,message } from 'antd';


//var department;
const { TextArea } = Input;
const FormItem = Form.Item;
const data = [];
class ArticleModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      menusStat:'',
      menusChg:false,
    };
  }
  componentDidMount(){
    this.setState({
      menusStat:this.props.record.department||'',
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
      if (!err) {
        var params={
          title:values.title,
          subTitle:values.subTitle,
          development:values.development,
          time:values.time,
          urlAddress:values.urlAddress,
        }
        //console.log(values,"values in okHandler",params,"params in okHandler station");
        onOk(params);
        this.hideModelHandler();
      }
    });
  };
  handleButtonClick(e) {
    message.info('点右边三角选择');

  }
  handleMenuClick(e) {
    this.setState({
      menusStat:e.key,
      menusChg:true,
    });
    this.props.record.department=e.key;
  }
  render(){


    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    var { title,subTitle,development,time,urlAddress} = this.props.record;
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
          title={this.props.record.title==undefined?'新增文章':'编辑文章'}
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
                initialValue: time,
              })(
                <Input placeholder="请输入时间"/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Url" key="urlAddress">
              {getFieldDecorator('urlAddress',{
                rules: [{required: true }],
                initialValue: urlAddress,
              })(
                <Input placeholder="请输入url"/>,
              )}
            </FormItem>


          </Form>
        </Modal>
      </span>
    )
  }
}
export default Form.create()(ArticleModal);
