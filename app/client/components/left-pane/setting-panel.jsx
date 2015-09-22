import React from 'react';
import { Form, Input, Button, Icon } from 'amazeui-react';
import Highlight from 'react-highlighter';
import { find } from 'lodash';
import Component from '../base-component.jsx';
import StockListStore from '../../stores/stock-list-store';
import { listen } from '../../decorators';
import AppDispatcher from '../../dispatcher/app-dispatcher';

export default class SettingPanel extends Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            upstream: StockListStore.getUpstream(),
            isSyncing: false
        };
    }

    @listen(StockListStore, 'synced')
    onSynced() {
        this.setState({
            isSyncing: false
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleClick = () => {
        AppDispatcher.dispatch({
            type: 'sync',
            upstream: this.refs.upstream.getValue()
        });

        this.setState({
            isSyncing: true
        });
    }

	render() {
        const listStyle = {
            height: 318,
            resize: 'none'
        }

        let syncButton;

        if (this.state.isSyncing) {
            syncButton = (
                <Button key="syncButton" disabled>
                    <Icon icon="circle-o-notch" spin /> Syncing
                </Button>
            );
        } else {
            syncButton = (
                <Button key="syncButton" onClick={this.handleClick}>
                    Sync Now
                </Button>
            );
        }

		return (
			<form className="am-form" onSubmit={this.handleSubmit}>
			    <Input
                    type="text"
                    label="Upstream CouchDB URL"
                    ref="upstream"
                    defaultValue={this.state.upstream}
                    placeholder="http://localhost:5984/" />
                {syncButton}
			</form>
		);
	}
}
