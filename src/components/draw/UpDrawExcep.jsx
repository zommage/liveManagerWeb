/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, DatePicker, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import moment from 'moment'
import {DrawExcepEditFunc} from '../../axios/draw';

const FormItem = Form.Item;
const Option = Select.Option;
const TypeOption = Select.Option;
const { TextArea } = Input;

class DrawExcepEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            drawTimeData: moment(),
            manualStatus: '',
            loading: false,

            // 路由过来的参数
            record: this.props.location.state ? this.props.location.state : {
                id: '',
                code: '',
                issueNo: '',
                drawTime: '1970-01-01 00:00:00',
                manualStatus: 1,
                userDescribe: '',
            },

            // 编辑开奖参数
            params: {
            },
        };

        this.handleDrawTimeChange = this.handleDrawTimeChange.bind(this)
    }

    // 页面加载后的处理
    componentDidMount() {
        console.log("record=============", this.state.record)

        // 将string类型的 drawTime 分别转换为 date类型和 时间戳
        let d = new Date(Date.parse(this.state.record.drawTime.replace(/-/g,  "/")))
        // Date.parse 精确到秒
        let tmpTimestamp = Date.parse(d)/1000
        this.setState({
            drawTimeData:moment(this.state.record.drawTime),
            params: {
                ...this.state.params,
                drawTime: tmpTimestamp,
                code: this.state.record.code,
                id: this.state.record.id,
                issueNo: this.state.record.issueNo,
                manualStatus: this.state.manualStatus,
                describe: this.state.record.userDescribe,
            }
        }, () => {});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(this.state.params.id === '') {
                    message.error("页面重新加载,请从开奖异常列表点击编辑跳转过来")
                    return
                }

                this.setState({
                    params: {
                        ...this.state.params,
                        code: values.code,
                        issueNo: values.issueNo,
                        manualStatus: Number(values.manualStatus),
                        describe: values.describe,
                    }
                }, () => {
                    this.drawExcepEdit(this.state.params);
                });
            }
        });
    };

    // 发送开奖异常编辑请求
    drawExcepEdit = (params = {}) => {
        this.setState({ loading: true });
        // 获取开奖异常列表
        DrawExcepEditFunc(params).then((res) => {
            message.success("开奖异常更新成功")
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            message.error("开奖异常更新失败")
            this.setState({ loading: false });
            console.log("==========draw exception edit err:", error)
        });
    }

    // 开奖时间
    handleDrawTimeChange = (value, dateString) =>{
        for(let key in dateString) {
            // 将字符串转换为 date类型
            let d = new Date(Date.parse(dateString[key].replace(/-/g,  "/")))
            // Date.parse 精确到秒
            let tmpTimestamp = Date.parse(d)/1000
                this.setState({
                    params: {
                        ...this.state.params,
                        drawTime: tmpTimestamp,
                    }
                });
        }
    }

    // 只包含数字和字母
    LetterNum = (rule, value='', callback) => {
        console.log("11111111111")


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
        const detailFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 32 },
                sm: { span: 32, offset: 4, },
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
                <BreadcrumbCustom first="开奖" second="编辑开奖异常" />
                <Row gutter={24}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="编辑开奖异常" bordered={false} >
                                <Form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 20, width: 500}} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="选择彩种"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('code', {
                                            initialValue: this.state.record.code,
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
                                        {getFieldDecorator('issueNo', {
                                            initialValue: this.state.record.issueNo,
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
                                        {getFieldDecorator('drawTimeTicker', {
                                                initialValue: this.state.drawTimeData,
                                            rules: [{
                                                required: true, message: '请输入开奖时间',
                                            }],
                                        })(<DatePicker
                                                showTime
                                                style={{width: 335}}
                                                placeholder="Select Time"
                                                onChange={this.handleDrawTimeChange}
                                                format="YYYY-MM-DD HH:mm:ss"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="异常类型"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('manualStatus', {
                                            initialValue: this.state.record.manualStatus.toString(),
                                            rules: [
                                                { required: true, message: 'Please select type!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="选择异常类型"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <TypeOption value="1">未处理</TypeOption>
                                                <TypeOption value="2">异常预警</TypeOption>
                                                <TypeOption value="3">24小时成功处理</TypeOption>
                                                <TypeOption value="4">已超时</TypeOption>
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...detailFormItemLayout}
                                        label="详细信息"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('describe', {
                                            initialValue: this.state.record.userDescribe,
                                        })(
                                            <TextArea
                                                rows={8}
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

const FormDrawExcepEdit = Form.create()(DrawExcepEdit);

export default FormDrawExcepEdit;