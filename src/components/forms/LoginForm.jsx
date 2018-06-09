/**
 * Created by hao.cheng on 2017/4/14.
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('user login Received values of form: ', values);
            }
        });
    };


    // 只包含数字和字母横杠下划线
    LetterNumLine = (rule, value='', callback) => {
        console.log("paaaaaaarms reg===============", value)
        if (value.length > 16) {
            callback("数据过长,应少于16");
            return;
        }
        let reg = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/
        if(!reg.test(value)){
            console.log("invalid-----------")
            callback("你输入的字符不是数字或者字母");
            return;
        }
        callback();
        return;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true, message: '请输入用户名!' },
                         {
                            validator: this.LetterNumLine,
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        登录
                    </Button>
                    或 <a href="">现在就去注册!</a>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;