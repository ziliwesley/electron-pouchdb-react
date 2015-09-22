import React from 'react';
import { Input } from 'amazeui-react';
import Component from '../base-component.jsx';
import AppDispatcher from '../../dispatcher/app-dispatcher';

export default class SearchBox extends Component {

    constructor() {
        super();
        this.state = {
            keyword: ''
        }
    }

    handleChange = (event) => {
        const keyword = this.refs.keyword.getValue();
        this.setState({
            keyword
        });
        AppDispatcher.dispatch({
            type: 'query',
            keyword: keyword
        });
    }

	render() {
		return (
            <Input
                radius
                value={this.state.keyword}
                icon="search"
                type="text"
                placeholder="Enter a code to query"
                ref="keyword"
                onChange={this.handleChange} />
		);
	}
}
