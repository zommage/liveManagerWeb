/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, DatePicker, message, Modal } from 'antd';
import {ModifyBaseValueFunc} from '../../axios/draw';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class BaseValueEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,

            // 预览参数
            preParams: {},

            // 预览后的返回参数
            preResp: {},

            // 提交修改基准值的参数
            commitParams: {},
        };

        this.handleBaseCommit = this.handleBaseCommit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            let params = {
                smsenable: fieldsValue.smsenable,
            }

            // 在 confirm 的 onOk 中调用 this.adjustDrawIssueEdit 需要在外部声明
            const baseValueEdit = this.baseValueEdit
            confirm({
                title: '确认是否提交?',
                onOk() {
                    console.log('OK');
                    baseValueEdit(params)
                },
                onCancel() {
                },
            });

        });
    };

    handleBaseCommit = () => {
        console.log("modify base value: ")
    }

    // 只包含数字和字母
    LetterNum = (rule, value='', callback) => {
        if (value.length > 32) {
            callback("数据过长,应少于32");
            return;
        }
        let reg = /^[0-9a-zA-Z]+$/
        if(!reg.test(value)){
            callback("你输入的字符不是数字或者字母");
            return;
        }
        callback();
        return;
    }

    // 只包含数字
    NumCheck = (rule, value='', callback) => {
        if (value.length > 32) {
            callback("数据过长,应少于32");
            return;
        }
        let reg = /^[0-9]+$/
        if(!reg.test(value)){
            callback("你输入的字符不是数字");
            return;
        }
        callback();
        return;
    }

    // 修改基准值
    baseValueEdit = (params = {}) => {
        this.setState({ loading: true });

        // 获取开奖异常列表
        ModifyBaseValueFunc(params).then((res) => {
            message.success("更改开奖期号成功")
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            message.error("更改开奖期号失败")
            this.setState({ loading: false });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        return (
            <div className="gutter-example">
                <Row gutter={24}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card  bordered={false} >
                                <Form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 20, width: 350}} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="选择彩种"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('itemCode', {
                                            initialValue: 'cqssc',
                                            rules: [
                                                { required: true, message: 'Please select lottery!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="选择彩种"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >

                                                <Option value="cqssc">重庆时时彩</Option>
                                                <Option value="gd11x5">广东彩11选5</Option>
                                                <Option value="bjpk10">北京赛车</Option>
                                                <Option value="gxkl10fz">广西快乐10分</Option>
                                                <Option value="gdkl10fz">广东快乐10分</Option>
                                                <Option value="pl3">排列三</Option>
                                                <Option value="ahk3">安徽快三</Option>
                                                <Option value="fc3d">福彩3D</Option>
                                                <Option value="xglhc">香港六合彩</Option>
                                                <Option value="jsctssc">极速时时彩</Option>
                                                <Option value="jslhc">极速六合彩</Option>
                                                <Option value="jsctkl10gd">极速快乐十分</Option>
                                                <Option value="jsctpk10">极速pk10</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="输入期号"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('drawIssue', {
                                            rules: [{
                                                required: true, message: '请输入合理期号',
                                            },{
                                                validator: this.LetterNum,
                                            }],
                                        })(
                                            <Input placeholder="请输入合理期号"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="开奖基准间隔时间: "
                                    >
                                        {getFieldDecorator('drawDate', {
                                            rules: [{
                                                required: true, message: '请输入间隔时间(单位为s)',
                                            },{
                                                validator: this.NumCheck,
                                            }],
                                        })(
                                            <Input placeholder="请输入间隔时间(单位为s)"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">预览</Button>
                                        <Button style={{ marginLeft: 8 }}
                                                size="large"
                                                ype="primary"
                                                onClick={this.handleBaseCommit}>提交
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const FormBaseValueEdit = Form.create()(BaseValueEdit);

export default FormBaseValueEdit;