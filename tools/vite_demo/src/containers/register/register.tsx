import React, { Component } from "react";
import {
  NavBar,
  List,
  InputItem,
  WhiteSpace,
  WingBlank,
  Radio,
  Button,
} from "antd-mobile";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { Redirect } from "react-router-dom";

import Logo from "../../components/logo/logo";
import { register } from "../../redux/actions";

const ListItem = List.Item;
class Register extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      type: "dashen",
    };
  }
  handlerRegister = () => {
    this.props.register(this.state);
  };
  handlerChange = (name: string, val: string) => {
    this.setState({
      [name]: val,
    });
  };

  render() {
    const { type } = this.state;
    const { redirect } = this.props.user;

    if (redirect) {
      return <Redirect to={redirect}></Redirect>;
    } else {
      return (
        <div>
          <NavBar>人&nbsp;才&nbsp;直&nbsp;聘</NavBar>
          <Logo />
          <WhiteSpace size="lg" />
          <WingBlank>
            <List>
              <WhiteSpace />
              <InputItem
                placeholder="请输入用户名"
                onChange={(val) => {
                  this.handlerChange("username", val);
                }}
              >
                用户名
              </InputItem>
              <WhiteSpace />
              <InputItem
                placeholder="请输入密码"
                type="password"
                onChange={(val) => {
                  this.handlerChange("password", val);
                }}
              >
                密&nbsp;&nbsp;&nbsp;码
              </InputItem>
              <WhiteSpace />
              <InputItem
                placeholder="请确认密码"
                type="password"
                onChange={(val) => {
                  this.handlerChange("password2", val);
                }}
              >
                确认密码
              </InputItem>
              <WhiteSpace />
              <ListItem>
                <span>身&nbsp;&nbsp;&nbsp;份</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  name="type"
                  checked={type === "dashen"}
                  onChange={(val) => {
                    this.handlerChange("type", "dashen");
                  }}
                >
                  大神
                </Radio>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  name="type"
                  checked={type === "laoban"}
                  onChange={(val) => {
                    this.handlerChange("type", "laoban");
                  }}
                >
                  老板
                </Radio>
              </ListItem>
              <WhiteSpace />
              <Button type="primary" onClick={this.handlerRegister}>
                注册
              </Button>
              <WhiteSpace />
              <Button
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                已有账号
              </Button>
            </List>
          </WingBlank>
        </div>
      );
    }
  }
}

export default connect((state:any) => ({ user: state.user }), { register })(
  Register
);
