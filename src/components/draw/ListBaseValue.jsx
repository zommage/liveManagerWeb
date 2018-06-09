/***************
 @   开奖异常列表
 @**************/
import React from 'react';
import { Table } from 'antd';
import {withRouter} from 'react-router-dom'

const columns = (history)=>[{
    title: '运营商名称',
    dataIndex: 'name',
}, {
    title: '预计开奖期号',
    dataIndex: 'preIssueNo',
}];

class ListBaseValue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 15,
                showQuickJumper: true,
            },
            loading: false,

            // 默认请求参数
            params: {
                "page": 1,
                "pageSize": 15,
            },
        };
    }

    // 用于接收传过来的参数
    componentWillReceiveProps(nextProps){

    }

    render() {
        const history = this.props.history
        return (
            <Table columns={columns(history)}
                   dataSource={this.state.data}
                   rowKey={(r,i)=>(i)}
                   loading={this.state.loading}
                   bordered
                   pagination={this.state.pagination}
            />
        );
    }
}

export default withRouter(ListBaseValue);