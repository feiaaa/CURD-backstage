import React, { Component } from 'react';
import { Form, Input,Modal,Radio,InputNumber } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const InputGroup = Input.Group
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
  onChangeCorrect= (e) => {
    console.log(e,'onChangeCorrect');
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };
  changeSections = (e,sectionId) => {
    console.log(e,'=e',sectionId,'=sectionId');
  }
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
          section:values.section,
          hint:values.hint,
          wordId:values.wordId,
        };
        if(values.questionId){
          params.questionId=values.questionId
        }
        console.log(values,"values in okHandler",params,"params in okHandler question");
        //onOk(params);
        this.hideModelHandler();
      }
    });
  };
  render(){


    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    var { questionId,question,correct,section,hint,wordId} = this.props.record;
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
            <FormItem {...formItemLayout} label="设置选项" key="section">

              {getFieldDecorator('section',{
                rules: [{required: true }],
                initialValue:section,
              })(
                <InputGroup>
                  <Input />
                  <Input placeholder="请输入选项A的内容" refs ="sectionA" defaultValue={section==undefined?'':eval('(' + section + ')').A} onKeyUp={this.changeSections.bind('A',this)}/>
                  <Input placeholder="请输入选项B的内容" refs ="sectionB" defaultValue={section==undefined?'':eval('(' + section + ')').B} onKeyUp={this.changeSections.bind(this,'B')}/>
                  <Input placeholder="请输入选项C的内容" refs ="sectionC" defaultValue={section==undefined?'':eval('(' + section + ')').C} onKeyUp={this.changeSections.bind(this,'C')}/>
                  <Input placeholder="请输入选项D的内容" refs ="sectionD" defaultValue={section==undefined?'':eval('(' + section + ')').D} onKeyUp={this.changeSections.bind(this,'D')}/>

                </InputGroup>,
              )}
            </FormItem>



            <FormItem {...formItemLayout} label="正确选项" key="correct">
              {getFieldDecorator('correct',{
                rules: [{required: true }],
                initialValue: correct,
              })(
                <RadioGroup onChange={this.onChangeCorrect.bind(this)}>
                  <Radio value="A">A</Radio>
                  <Radio value="B">B</Radio>
                  <Radio value="C">C</Radio>
                  <Radio value="D">D</Radio>
                </RadioGroup>
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
