/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, DatePicker, message, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {ModifySmsSwitchFunc} from '../../axios/sms';
import {SmsSwitchStatusFunc} from "../../axios/sms";

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class SmsSwitchEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            smsStatus: '',      // 查询得到的短信开关状态
        };
    }

    // 页面加载后发送请求
    componentDidMount() {
        this.queryFetch(this.state.params)
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
            const smsSwitchEdit = this.smsSwitchEdit
            confirm({
                title: '确认是否提交?',
                onOk() {
                    console.log('OK');
                    smsSwitchEdit(params)
                },
                onCancel() {
                },
            });

        });
    };

    // 发送查询请求
    queryFetch = (params = {}) => {
        this.setState({ loading: true });

        // 获取短信开关的状态
        SmsSwitchStatusFunc(params).then((res) => {
            message.success("获取短信状态成功")

            this.setState({
                loading: false,
                smsStatus: String(res.data.code),
            });

        }).catch((error) => {
            this.setState({ loading: false });
            message.error("获取短信状态失败")
        });
    }

    // 短信开关
    smsSwitchEdit = (params = {}) => {
        this.setState({ loading: true });

        // 获取开奖异常列表
        ModifySmsSwitchFunc(params).then((res) => {
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
        const { visible } = this.props;
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
                                        label="短信开关"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('smsenable', {
                                            initialValue: this.state.smsStatus,
                                            rules: [
                                                { required: true, message: 'Please select lottery!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="短信开关"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >

                                                <Option value="0">关闭</Option>
                                                <Option value="1">开启</Option>
                                            </Select>
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

const FormSmsSwitchEdit = Form.create()(SmsSwitchEdit);

export default FormSmsSwitchEdit;