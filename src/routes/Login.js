import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Form, Input, Icon } from 'antd';
import styles from './Login.less';
import {login} from '../services/requestServer/login';

import axios from "axios/index";

const FormItem = Form.Item;

const Login = ({
                 app,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  const { loginLoading } = app;
  function handleOk(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, value) => {
      if (err) {
        return;
      }

      dispatch({ type: 'app/login', payload: value });

    });
  }

  return (

    <div className={`${styles.login} ${styles.loginBg}`}>
      <div className={styles.login1}>
        <div className={styles.loginView}>
          <div className={styles.loginHead}>布丁单词</div>
          <div className={styles.loginBody}>
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: '必填',
                    },
                  ],
                })(<Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} onPressEnter={handleOk} placeholder="请输入用户名" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('passWord', {
                  rules: [
                    {
                      required: true,
                      message: '必填',
                      hasFeedback: true,
                    },
                  ],

                })(<Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onPressEnter={handleOk} placeholder="请输入密码" />)}
              </FormItem>

              <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                登录
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

Login.propTypes = {
  form: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({ app }) => ({ app }))(Form.create()(Login));
