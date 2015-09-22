import React from 'react';
import { Panel } from 'amazeui-react';
import Highstock from 'react-highcharts/highstock';

import { listen } from '../decorators/';
import Component from './base-component.jsx';
import StockQuoteStore from '../stores/stock-quote-store';
import { fetchMinuteData } from '../actions/stock-quote-action-creators';
import { isAfterHours } from '../utils/stock-code-utils';

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

export default class StockTrend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trendData: {
                minData: [],
                stock: {
                    name: '',
                    stockCode: ''
                }
            }
        };
    }

    @listen(StockQuoteStore, 'trendUpdated')
    onTrendUpdated(stockCode) {
        let trend = StockQuoteStore.getStockTrend();

        // Switch to trend of another stock
        if (stockCode !== this.state.trendData.stock.stockCode) {
            this.setState({
                trendData: trend
            });

            // During suspension
            if (trend.minData.length === 0) {
                return;
            }

            // Store the latest time.
            this.latest = trend.minData[trend.minData.length - 1][0];

            if (this.timer) {
                clearInterval(this.timer);
            }

            this.timer = setInterval(() => {
                fetchMinuteData(trend.stock, this.latest);
            }, 30000);
        } else {
            // Get only necessary data to be appended
            trend.minData.forEach((data) => {
                // Receive newset quote data
                if (data[0] > this.latest) {
                    console.log('receive updates: ', data);
                    this.series.addPoint(data, false, true);
                    this.latest = data[0];
                }
            });

            this.series.chart.redraw();
        }

        if (isAfterHours(this.latest)) {
            clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        if (this.timer) {
            clearInterval(this.timer);
        }
    }

	render() {
        const self = this;

		let config = {
            colors: [
                '#2f7ed8',
                '#0d233a',
                '#8bbc21',
                '#910000',
                '#1aadce',
                '#492970',
                '#f28f43',
                '#77a1e5',
                '#c42525',
                '#a6c96a'
            ],
            rangeSelector: {
                enabled: false
            },
            chart: {
                events: {
                    load() {
                        self.series = this.series[0];
                    }
                }
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
			title: {
				text: this.state.trendData.stock.name
			},
            subtitle: {
                text: this.state.trendData.stock.stockCode
            },
			series: [{
                type: 'area',
				name: 'price',
				data: this.state.trendData.minData,
                tooltip: {
                    valueDecimals: 2
                },
                threshold: null,
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
			}],
            xAxis: {
                tickInterval: 1800000,
                showEmpty: true,
                endOnTick: true
            }
		};

		return (
			<Panel>
				<Highstock config={config}>
				</Highstock>
			</Panel>
		);
	}
}
