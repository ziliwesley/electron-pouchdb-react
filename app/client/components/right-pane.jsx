import React, { Component } from 'react';
import { Container, Nav, NavItem, Form, Input } from 'amazeui-react';
import StockTrend from './stock-trend.jsx';

export default class LeftPane extends Component {
	render() {
		return (
            <Container className="am-padding-horizontal-xs">
    			<StockTrend />
            </Container>
		);
	}
}
