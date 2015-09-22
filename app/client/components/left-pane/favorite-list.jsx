import React from 'react';
import { List, ListItem, Icon } from 'amazeui-react';
import Component from '../base-component.jsx';
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
                            <ListItem className="am-cf" key={favorite.stockCode}>
            					<span className="am-margin-right-xs am-vertical-align-middle">{favorite.name}</span>
                                <span className="am-text-xs am-vertical-align-middle">{favorite.stockCode}</span>
                                <Icon className="am-fr am-text-danger" amSize="xs" icon="heart" onClick={this.handleClick.bind(this, favorite)} />
            				</ListItem>
                        );
                    })
                }
			</List>
		);
	}
}
