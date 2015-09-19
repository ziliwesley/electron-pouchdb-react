import React, { Component } from 'react';
import AMUIReact, { Grid, Col, Panel } from 'amazeui-react';

import LeftPane from './components/left-pane.jsx';
import RightPane from './components/right-pane.jsx';

class App extends Component {
    render() {
        return (
            <Grid className="am-margin-vertical-xs" collapse>
                <Col sm={4}>
                    <LeftPane />
                </Col>
                <Col sm={8}>
                    <RightPane />
                </Col>
            </Grid>
        );
    }
}

React.render(
    <App />,
    document.querySelector('#app')
);
