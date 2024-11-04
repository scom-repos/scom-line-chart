import { Module, customModule, Container } from '@ijstech/components';
import { ModeType } from '@scom/scom-chart-data-source-setup';
import ScomLineChart from '@scom/scom-line-chart';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>
            <i-scom-line-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
                    dataSource: 'Custom',
                    mode: ModeType.LIVE,
                    apiEndpoint: 'https://api.dune.com/api/v1/query/3865244/results?api_key=',
                    title: 'MEV Blocks Trend by Builders',
                    options: {
                        xColumn: {
                            key: 'block_date',
                            type: 'time'
                        },
                        yColumns: [
                            'mev_block_count',
                        ],
                        seriesOptions: [
                            {
                                key: 'mev_block_count',
                                title: 'Blocks',
                                color: '#000'
                            }
                        ],
                        xAxis: {
                            title: 'Date',
                            tickFormat: 'MMM DD'
                        },
                        yAxis: {
                            labelFormat: '0,000.00',
                            position: 'left'
                        }
                    }
                }}
            />
        </i-panel>
    }
}