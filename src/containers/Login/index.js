/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Form, Icon, Button, Checkbox } from "antd";
import i18n from "i18next";
import { loginAction } from "../../redux/staff/actions";
import MaterialInput from "../../components/common/MaterialInput/index";

import { post } from "../../api/utils";

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  handleLogin = async () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // eslint-disable-next-line no-unused-vars
        const res = await post("/admins/login", values);

        //   console.log(res);
        //   console.log("AAAAAAAAAAAAAAAA");
        //   // eslint-disable-next-line prefer-destructuring
        // const  token  = res.token;
        // console.log("AAAAAAAAAAAAAAAAA");
        // console.log(res.token);
        // console.log(res);
        // localStorage.setItem('token', token);
        // localStorage.getItem('token');
        // console.log(token);
      }
    });
  };

  render() {
    const { form, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("phoneNumber", {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <MaterialInput
                placeholder="Username"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <MaterialInput
                placeholder="Mật Khẩu"
                prefix={<Icon type="lock" style={{ color: "black" }} />}
                type="password"
              />
            )}
          </FormItem>
          <div className="sub-action-div">
            <Checkbox>{i18n.t("login.rememberMe")}</Checkbox>
            {/* <a className="login-form-forgot" href="/forgot-password">
              {i18n.t("forgotPassword.title")}
            </a> */}
          </div>
          <div className="action-div">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.props.isLoading}
              onChange={this.handleLogin}
            >
              {this.props.isLoading ? "" : i18n.t("login.loginBtn")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.staff.isAuthenticated,
  isLoading: state.staff.isShowLoading,
});
const mapDispatchToProps = (dispatch) => ({
  login: (params) => {
    dispatch(loginAction(params));
  },
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)));
