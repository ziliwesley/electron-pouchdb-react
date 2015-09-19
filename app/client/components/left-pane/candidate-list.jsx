import React from 'react';
import { List, ListItem, Icon } from 'amazeui-react';
import Component from '../base-component.jsx';
import StockListStore from '../../stores/stock-list-store';
import { listen } from '../../decorators';

const getCandidates = (keyword = '') => {
    return {
        candidates: StockListStore.getCandidates(keyword)
    };
}

export default class CandidateList extends Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = getCandidates();
        this.destructors = [];
    }

    @listen(StockListStore, 'query')
    onChange(keyword) {
        this.setState(getCandidates(keyword));
    }

	render() {
        const listStyle = {
            height: 325,
            resize: 'none'
        }
		return (
			<List style={listStyle} className="am-scrollable-vertical" static>
                {
                    this.state.candidates.map((candidate) => {
                        return (
                            <ListItem className="am-cf" key={candidate.code}>
            					<span className="am-margin-right-xs am-vertical-align-middle" dangerouslySetInnerHTML={{__html: candidate.name}}></span>
                                <span className="am-text-xs am-vertical-align-middle" dangerouslySetInnerHTML={{__html: candidate.code}}></span>
                                <Icon className="am-fr am-text-danger" amSize="xs" icon="heart" />
            				</ListItem>
                        );
                    })
                }
			</List>
		);
	}
}
