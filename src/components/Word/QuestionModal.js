import React, { Component } from 'react';
import { Form, Input,Modal,DatePicker,Checkbox,InputNumber } from 'antd';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
class QuestionModal extends Component {

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
      if (!err) {
        var params={
          question:values.question,
          correct:values.correct,
          hint:values.hint,
          wordId:values.wordId,
        };
        if(values.questionId){
          params.questionId=values.questionId
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
    var { questionId,question,hiragana,tone,correct,chinese,phrase,hint,wordId} = this.props.record;
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
          title={this.props.record.question===undefined?'新增题目':'编辑题目'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}

        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="日语题目" key="question">
              {getFieldDecorator('question',{
                rules: [{required: true }],
                initialValue: question,
              })(
                <TextArea placeholder="请输入日语题目"  rows={6}/>,
              )}
            </FormItem>



            <FormItem {...formItemLayout} label="中文提示" >
              {
                getFieldDecorator('hint', {
                  rules: [{ required: true, message: '请完善信息后再点击完成' }],
                  initialValue: hint,
                })(<TextArea placeholder="输入中文提示" rows={6} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="正确选项" key="correct">
              {getFieldDecorator('correct',{
                rules: [{required: true }],
                initialValue: correct,
              })(
                <Input placeholder="请输入正确选项"/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="关联单词编号" key="wordId">
              {getFieldDecorator('wordId',{
                rules: [{required: true }],
                initialValue: wordId,
              })(
                <InputNumber min={1} max={100}/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout}  key="questionId">
              {getFieldDecorator('questionId',{
                initialValue: questionId,
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
export default Form.create()(QuestionModal);
