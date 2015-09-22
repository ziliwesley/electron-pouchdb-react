import React from 'react';
import { ListItem, Icon } from 'amazeui-react';
import Highlight from 'react-highlighter';
import { find } from 'lodash';

import { listen } from '../../decorators';
import Component from '../base-component.jsx';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import StockListStore from '../../stores/stock-list-store';
import { getStockExchange } from '../../utils/stock-code-utils';
import { fetchMinuteData } from '../../actions/stock-quote-action-creators';

export default class StockListItem extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            isLiked: this.props.isLiked
        };
    }

    handleClick = () => {
        fetchMinuteData(this.props.stock);
    }

    handleLike = (ev) => {
        ev.stopPropagation();

        AppDispatcher.dispatch({
            type: this.state.isLiked ? 'remove' : 'add',
            stock: this.props.stock
        });

        // @todo state can be out of sync
        // better fix it in the store
        this.setState({
            isLiked: !this.state.isLiked
        });
    }

    render() {
        return (
            <ListItem
                className="am-cf"
                key={this.props.stock.stockCode}
                onClick={this.handleClick}>
                <Highlight
                    className="am-margin-right-xs am-vertical-align-middle"
                    matchClass="am-text-success"
                    search={this.props.keyword}>
                    {this.props.stock.name}
                </Highlight>
                <Highlight
                    className="am-margin-right-xs am-vertical-align-middle"
                    matchClass="am-text-success"
                    search={this.props.keyword}>
                    {this.props.stock.stockCode}
                </Highlight>
                <Icon
                    className="am-fr am-text-danger"
                    amSize="xs"
                    icon={this.state.isLiked ? 'heart' : 'heart-o'}
                    onClick={this.handleLike} />
            </ListItem>
        )
    }
}
