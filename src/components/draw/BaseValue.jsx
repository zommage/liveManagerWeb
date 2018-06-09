import React from 'react';
import { Row, Col, Card } from 'antd';
import FormBaseValueEdit from './EditBaseValue';
import ListBaseValue from './ListBaseValue';
import BreadcrumbCustom from '../BreadcrumbCustom';

class BaseValue extends React.Component {
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="开奖" second="修改基准值" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="修改开奖基准值" bordered={false}>
                                <FormBaseValueEdit />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="修改基准值后的预览界面" bordered={false}>
                                <ListBaseValue />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}



export default BaseValue;