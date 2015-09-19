import React, { Component } from 'react';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Register all listeners based on descriptions.
        if (this.__listeners__) {
            this.__listeners__.forEach((listener) => {
                const {
                    source,
                    event,
                    handler
                } = listener;

                source.on(event, this[handler].bind(this));
            });
        }
    }

    componentWillUnmount() {
        // Deregister all listeners based on descriptions.
        if (this.__listeners__) {
            this.__listeners__.forEach((listener) => {
                const {
                    source,
                    event,
                    handler
                } = listener;

                source.removeListener(event, this[handler].bind(this));
            });
        }
    }
}
