import React, { Component } from 'react';
import { Container, Nav, NavItem, Form, Input } from 'amazeui-react';
import CandidateList from './candidate-list.jsx';

export default class LeftPane extends Component {
	render() {
		return (
            <Container className="am-padding-horizontal-xs">
    			<Nav pills>
    				<NavItem active href="#">Search</NavItem>
    				<NavItem href="#">Favorites</NavItem>
    			</Nav>
                <Form className="am-margin-top-sm">
                    <Input radius icon="search" type="text" placeholder="Enter a code to query"></Input>
                </Form>
                <CandidateList />
            </Container>
		);
	}
}
