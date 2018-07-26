import React, { Component } from 'react';
import { Form, Input,Modal,Checkbox,InputNumber } from 'antd';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
class WordModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      toneStat:[],

    };
  }
  componentDidMount(){
    console.log(this.props.record.tone,'.record.tone did');
    if(this.props.record.tone!=undefined)
    {
      this.setState({
        toneStat:this.props.record.tone.split(',')||[],
      })
    }

  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };
  onChangeTone = (e) => {
    console.log(e,'e onChangeTone');
    this.setState({
      toneStat:e,
    });
  };
  onCheckTone = (e) => {
    console.log(e,'e onCheckTone');
    if(e.length==0)
    {
      console.log('必填');
    }
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
          word:values.word,
          hiragana:values.hiragana,
          tone:values.tone,
          speech:values.speech,
          chinese:values.chinese,
          phrase:values.phrase,
          phrase_note:values.phrase_note,
          lesson:values.lesson,
        };
        if(values.wordId){
          params.wordId=values.wordId
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
    var { wordId,word,hiragana,tone,speech,chinese,phrase,phrase_note,lesson} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const optionsTone = [
      { label: '⓪', value: '⓪' },
      { label: '①', value: '①' },
      { label: '②', value: '②' },
      { label: '③', value: '③' },
      { label: '④', value: '④' },
      { label: '⑤', value: '⑤' },
      { label: '⑥', value: '⑥' },
    ];
    return(
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={this.props.record.word===undefined?'新增单词':'编辑单词'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}

        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="日语单词" key="word">
              {getFieldDecorator('word',{
                rules: [{required: true }],
                initialValue: word,
              })(
                <Input placeholder="请输入日语单词"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="平假名发音" key="hiragana">
              {getFieldDecorator('hiragana',{
                rules: [{required: true }],
                initialValue: hiragana,
              })(
                <Input placeholder="请输入平假名发音"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="声调" key="tone" required>

                <CheckboxGroup options={optionsTone} defaultValue={tone==undefined?[]:tone.split(',')} onChange={this.onChangeTone.bind(this)} onBlur={this.onCheckTone.bind(this)}/>,

            </FormItem>

            <FormItem {...formItemLayout} label="词性" key="speech">
              {getFieldDecorator('speech',{
                rules: [{required: true }],
                initialValue: speech,
              })(
                <Input placeholder="请输入词性"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="中文" key="chinese">
              {getFieldDecorator('chinese',{
                rules: [{required: true }],
                initialValue: chinese,
              })(
                <Input placeholder="请输入单词中文"/>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="例句" >
              {
                getFieldDecorator('phrase', {
                  rules: [{ required: true, message: '请完善信息后再点击完成' }],
                  initialValue: phrase,
                })(<TextArea placeholder="输入例句" rows={6} />)
              }
            </FormItem>

            <FormItem {...formItemLayout} label="例句翻译" >
              {
                getFieldDecorator('phrase_note', {
                  rules: [{ required: true, message: '请完善信息后再点击完成' }],
                  initialValue: phrase_note,
                })(<TextArea placeholder="输入例句翻译" rows={6} />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="关联课程编号" key="lesson">
              {getFieldDecorator('lesson',{
                rules: [{required: true }],
                initialValue: lesson,
              })(
                <InputNumber min={1} max={100}/>,
              )}
            </FormItem>
            <FormItem {...formItemLayout}  label="关联单词编号" key="wordId">
              {getFieldDecorator('wordId',{
                initialValue: wordId,
              })(
                <Input disabled={true}/>,
              )}
            </FormItem>

          </Form>
        </Modal>
      </span>
    )
  }
}
export default Form.create()(WordModal);
