/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, {Component} from 'react';
import { Row, Col, Card, Select, Button, DatePicker } from 'antd';
import DrawExceps from './DrawExceps';
import BreadcrumbCustom from '../BreadcrumbCustom';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class Exceptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            startTime: '',
            endTime: '',

            // 查询的参数
            filters: {},
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd = () =>{
        console.log("add new exception")
        this.props.history.push({
            pathname: '/app/draw/addDrawExcep',
            state: this.state.record,
        })
    }

    handleSearch = () =>{
        this.setState({
            filters: {
                ...this.state.filters,
                code: this.state.code,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            },
        });
    }

    handleTimeChange = (value, dateString) =>{
        for(let key in dateString) {
            // 将字符串转换为 date类型
            let d = new Date(Date.parse(dateString[key].replace(/-/g,  "/")))
            // Date.parse 精确到秒
            let tmpTimestamp = Date.parse(d)/1000
            if(key === '0'){
                console.log("000000000")
                this.setState({
                    startTime: tmpTimestamp,
                });
            }else if(key === '1'){
                this.setState({
                    endTime: tmpTimestamp,
                });
            }
        }
    }

    handleSelectChange = (value) =>{
        //  直接用 this.setState 会阻塞卡界面, 用 setTimeout进行异步操作，不阻塞界面,
        setTimeout( i=>{
            this.setState({
                code: value,
            });
        },0 )
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="开奖" second="开奖异常列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" icon="plus"
                                        style={{ bottom: 10, float: 'right' }}
                                        onClick={this.handleAdd}>
                                        新建开奖
                                </Button>
                                <Button type="primary" icon="search"
                                        style={{ bottom: 10, float: 'right', marginRight: 15 }}
                                        onClick={this.handleSearch}>
                                        Search
                                </Button>

                                <RangePicker
                                    style={{ width: 300, bottom: 10, float: 'right', marginRight: 12 }}
                                    showTime={{ format: 'HH:mm:ss' }}
                                    allowClear
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={['Start Time', 'End Time']}
                                    onChange={this.handleTimeChange}
                                />

                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 150, bottom: 10, marginLeft: '42%', marginRight: 10 }}
                                    placeholder="选择彩种"
                                    optionFilterProp="children"
                                    onChange={this.handleSelectChange}
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

                                <DrawExceps filters={this.state.filters}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Exceptions;