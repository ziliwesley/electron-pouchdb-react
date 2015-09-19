import React, { Component } from 'react';
import { Panel } from 'amazeui-react';
import HighCharts from 'react-highcharts';

export default class StockTrend extends Component {
	render() {
		const config = {
			title: {
				text: '600009'
			},
			series: [{
				name: 'price',
				data: [
					9.87,
					9.88,
					9.89,
					9.89,
					9.84,
					9.81,
					9.71,
					9.65,
					9.65,
					9.95
				]
			}],
			xAxis: {
				categories: [
					'9:30',
					'9:31',
					'9:32',
					'9:34',
					'9:35',
					'9:36',
					'9:37',
					'9:38',
					'9:39',
					'9.40'
				]
			}
		};

		return (
			<Panel>
				<HighCharts config={config}>
				</HighCharts>
			</Panel>
		);
	}
}
