import React, { Component } from 'react';
import { List, ListItem, Button, Icon } from 'amazeui-react';

export default class CandidateList extends Component {
	render() {
		return (
			<List border static>
				<ListItem className="am-cf">
					<span className="am-margin-right-xs am-vertical-align-middle">上海机场</span>
                    <span className="am-text-xs am-vertical-align-middle">600009</span>
                    <Icon className="am-fr" amSize="xs" icon="heart-o" />
				</ListItem>
                <ListItem className="am-cf">
					<span className="am-margin-right-xs am-vertical-align-middle">川投能源</span>
                    <span className="am-text-xs am-vertical-align-middle">600674</span>
                    <Icon className="am-fr am-text-danger" amSize="xs" icon="heart" />
				</ListItem>
			</List>
		);
	}
}
