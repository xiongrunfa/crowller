import React, { Component } from "react";
import request from "../../request";
import qs from "qs";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";

interface formFields {
  password: string;
}

class LoginForm extends Component {
  state = {
    isLogin: false,
  };

  onFinish = (values: formFields) => {
    request
      .post(
        "/api/login",
        qs.stringify({
          password: values.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        const data: responseResult.login = res.data;
        if (data) {
          this.setState({
            isLogin: true,
          });
        } else {
          message.error("登陆失败");
        }
      });
  };

  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Redirect to="/" />
    ) : (
      <div className="login-page">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入登录密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
