import React from 'react';
import { List, ListItem, Icon } from 'amazeui-react';
import Component from '../base-component.jsx';
import StockListItem from './stock-list-item.jsx';
import StockListStore from '../../stores/stock-list-store';
import { listen } from '../../decorators';
import AppDispatcher from '../../dispatcher/app-dispatcher';

export default class FavoriteList extends Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            favorites: StockListStore.getAllFavorites()
        };
    }

    @listen(StockListStore, 'favorites_update')
    onChange(keyword) {
        this.setState({
            favorites: StockListStore.getAllFavorites()
        });
    }

    handleClick(stock) {
        AppDispatcher.dispatch({
            type: 'remove',
            stock: stock
        });
    }

	render() {
        const listStyle = {
            height: 360,
            resize: 'none'
        }
		return (
			<List style={listStyle} className="am-margin-top-0 am-margin-bottom-0 am-scrollable-vertical" static>
                {
                    this.state.favorites.map((favorite) => {
                        return (
                            <StockListItem
                                key={favorite.stockCode}
                                stock={favorite}
                                keyword=""
                                isLiked={true} />
                        );
                    })
                }
			</List>
		);
	}
}
