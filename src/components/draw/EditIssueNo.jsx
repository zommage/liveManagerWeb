/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, DatePicker, message, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {AdjustDrawIssueNoFunc} from '../../axios/draw';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class DrawIssueNoEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            let params = {
                itemCode: fieldsValue.itemCode,
                drawIssue: fieldsValue.drawIssue,
                drawDate: fieldsValue['drawDate'].format('YYYY-MM-DD HH:mm:ss'),
            }

            // 在 confirm 的 onOk 中调用 this.adjustDrawIssueEdit 需要在外部声明
            const adjustDrawIssueEdit = this.adjustDrawIssueEdit
            confirm({
                title: '确认是否提交?',
                onOk() {
                    console.log('OK');
                    adjustDrawIssueEdit(params)
                },
                onCancel() {
                },
            });

        });
    };

    // 开奖期号调整
    adjustDrawIssueEdit = (params = {}) => {
        this.setState({ loading: true });

        // 获取开奖异常列表
        AdjustDrawIssueNoFunc(params).then((res) => {
            message.success("更改开奖期号成功")
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            message.error("更改开奖期号失败")
            this.setState({ loading: false });
        });
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
                <BreadcrumbCustom first="开奖" second="开奖期号调整" />
                <Row gutter={24}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="编辑开奖期号" bordered={false} >
                                <Form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 20, width: 500}} >
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
                                            <Input/>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="官方开奖时间: "
                                    >
                                        {getFieldDecorator('drawDate', config)(
                                            <DatePicker
                                                showTime
                                                style={{width: 335}}
                                                placeholder="Please Select Time"
                                                format="YYYY-MM-DD HH:mm:ss"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">提交</Button>
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

const FormDrawIssueNoEdit = Form.create()(DrawIssueNoEdit);

export default FormDrawIssueNoEdit;