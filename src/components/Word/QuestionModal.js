import React, { Component } from 'react';
import { Form, Input,Modal,Radio,InputNumber } from 'antd';
import request from '../../utils/request';
import {target} from "../../utils/config";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

var stateSections={"A":"","B":"","C":"","D":""};
var flag=0;
class QuestionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      correct:'',

    };
  }
  componentDidMount(){
    this.setState({
      correct:this.props.record.correct?this.props.record.correct:'',
    });
  }
  checkSection = (rule, value, callback) => {
    for(var i in stateSections){
      if(!stateSections[i])
      {
        callback('选项必填');
        return;
      }

    }
  if(stateSections.D)
    {
      callback();
    }

  }
  checkWordIdExist=(rule, value, callback) => {
    if(!value)
    {
      callback('必填');
      return;
    }
    else{
      request.get(`${target}/cat/questionPC?wordId=${value}`,
        {
          method:'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then(function (res) {
          if(res.data.result.wordId===0)
          {
            callback('无效的单词id，请先创建对应的单词');
            return;
          }
          if(res.data.result.word)
          {
            callback();
          }
      })
        .catch(function (error) {
          console.log(error);
          callback('网络请求错误');
          return;
        });
    }
  }
  onChangeCorrect= (e) => {
    this.setState({
      correct:e.target.value,
    });
    this.props.record.correct=e.target.value;
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };
  changeSections = (refstr,proxy) => {
    if(refstr==="A"){
      stateSections.A=proxy.target.value.toString();
    }
    if(refstr==="B"){
      stateSections.B=proxy.target.value.toString();
    }
    if(refstr==="C"){
      stateSections.C=proxy.target.value.toString();
    }
   if(refstr==="D"){
      stateSections.D=proxy.target.value.toString();
    }
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
        //提交填写内容
        var params={
          question:values.question,
          correct:this.state.correct,
          section:JSON.stringify(stateSections),
          hint:values.hint,
          wordId:parseInt(values.wordId,10),
          lesson:parseInt(values.lesson,10),
        };
        if(values.questionId){
          params.questionId=values.questionId
        }
        onOk(params);
        this.hideModelHandler();
      }
    });
  };
  //阻止报错 eval can be harmful，本体为把str类型的json字符串转成json对象
  evil = (fn)=> {

    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错

    return new Fn('return ' + fn)();

  }
  render(){
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    var { questionId,question,correct,section,hint,wordId,lesson} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    if(this.props.record.section && flag===0){
      stateSections=this.evil(this.props.record.section );
      flag=1;
    }

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
                rules: [{required: true, message: '请完善信息后再点击完成'  }],
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
                rules: [{validator: this.checkSection}],
                initialValue:section,
              })(
                <span>
                  <Input placeholder="请输入选项A的内容" id="sectionA" defaultValue={section===undefined?'':this.evil(section).A} onBlur={this.changeSections.bind(this,'A')}/>
                  <Input placeholder="请输入选项B的内容"  id="sectionB" defaultValue={section===undefined?'':this.evil(section).B} onBlur={this.changeSections.bind(this,'B')}/>
                  <Input placeholder="请输入选项C的内容" id="sectionC" defaultValue={section===undefined?'':this.evil(section).C} onBlur={this.changeSections.bind(this,'C')}/>
                  <Input placeholder="请输入选项D的内容"  id="sectionD" defaultValue={section===undefined?'':this.evil(section).D} onBlur={this.changeSections.bind(this,'D')}/>
                </span>,
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
                rules: [{required: true,validator:this.checkWordIdExist }],
                initialValue: wordId,
              })(
                <InputNumber min={1} max={9999999}/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="关联课程" key="lesson">
              {getFieldDecorator('lesson',{
                rules: [{required: true }],
                initialValue: lesson,
              })(
                <InputNumber min={1} max={9999999}/>,
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
