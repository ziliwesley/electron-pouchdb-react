import React from 'react';
import { Container, Tabs } from 'amazeui-react';
import CandidateList from './candidate-list.jsx';
import FavoriteList from './favorite-list.jsx';
import SearchBox from './search-box.jsx';
import SettingPanel from './setting-panel.jsx';
import Component from '../base-component.jsx';

export default class LeftPane extends Component {

    constructor() {
        super();
        this.state = {
            key: '1'
        };
    }

    handleSelect = (key) => {
        this.setState({
            key: key
        });
    }

	render() {
		return (
            <Container className="am-padding-horizontal-xs">
                <Tabs
                    defaultActiveKey={this.state.key}
                    onSelect={this.handleSelect}
                    animation="fade">
                    <Tabs.Item eventKey="1" title="Search">
                        <SearchBox />
                        <CandidateList />
                    </Tabs.Item>
                    <Tabs.Item eventKey="2" title="Favorite">
                        <FavoriteList />
                    </Tabs.Item>
                    <Tabs.Item eventKey="3" title="Setting">
                        <SettingPanel />
                    </Tabs.Item>
                </Tabs>
            </Container>
		);
	}
}
