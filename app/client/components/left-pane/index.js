import React from 'react';
import { Container, Nav, NavItem } from 'amazeui-react';
import CandidateList from './candidate-list.jsx';
import SearchBox from './search-box.jsx';
import Component from '../base-component.jsx';

export default class LeftPane extends Component {

	render() {
		return (
            <Container className="am-padding-horizontal-xs">
    			<Nav pills>
    				<NavItem active href="#">Search</NavItem>
    				<NavItem href="#">Favorites</NavItem>
    			</Nav>
                <SearchBox />
                <CandidateList />
            </Container>
		);
	}
}
