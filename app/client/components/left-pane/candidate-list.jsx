import React from 'react';
import { List } from 'amazeui-react';
import Highlight from 'react-highlighter';
import { find } from 'lodash';

import Component from '../base-component.jsx';
import StockListItem from './stock-list-item.jsx';
import StockListStore from '../../stores/stock-list-store';
import { listen } from '../../decorators';
import AppDispatcher from '../../dispatcher/app-dispatcher';


export default class CandidateList extends Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            candidates: [],
            favorites: StockListStore.getAllFavorites(),
            keyword: ''
        };
    }

    @listen(StockListStore, 'query')
    onUpdated(keyword) {
        this.setState({
            candidates: StockListStore.getCandidates(keyword),
            keyword: keyword
        });
    }

    @listen(StockListStore, 'favorites_update')
    onFavoritesUpdate(keyword) {
        this.setState({
            favorites: StockListStore.getAllFavorites()
        });
    }

    handleClick(stock, type) {
        AppDispatcher.dispatch({
            type,
            stock
        });
    }

	render() {
        const listStyle = {
            height: 318,
            resize: 'none'
        }

		return (
			<List style={listStyle} className="am-margin-top-xs am-margin-bottom-0 am-scrollable-vertical" static>
                {
                    this.state.candidates.map((candidate) => {
                        let heartIcon, clickHandler;
                        let match = find(this.state.favorites, 'stockCode', candidate.stockCode);

                        return (
                            <StockListItem
                                key={candidate.stockCode}
                                stock={candidate}
                                keyword={this.state.keyword}
                                isLiked={match !== undefined} />
                        );
                    })
                }
			</List>
		);
	}
}
