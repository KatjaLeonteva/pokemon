import { useEffect, useRef } from "react";
import * as echarts from "echarts";


import { Card } from "../services/types.ts";
import {generateScatterplotData} from "../services/utils.ts";

/*
 * This component displays a scatterplot using ECharts. Based on examples:
 * - https://echarts.apache.org/examples/en/editor.html?c=scatter-simple
 */
function Scatterplot({cards, theme}: {cards: Card[]; theme?: string | null}) {

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cards.length === 0 || !chartRef.current) return;

        const myChart = echarts.init(chartRef.current, theme);
        const chartData = generateScatterplotData(cards);

        const option = {
            xAxis: {
                name: "HP",
                nameTextStyle: {
                    color: '#4a5565'
                },
                type: "value",
                axisLabel: {
                    color: '#4a5565'
                },
            },
            yAxis: {
                name: "Energy Cost",
                nameTextStyle: {
                    color: '#4a5565'
                },
                type: "value",
                axisLabel: {
                    color: '#4a5565'
                },
            },
            series: [
                {
                    type: "scatter",
                    data: chartData.map(card => [card.hp, card.energyCost, card]),
                    symbolSize: 8,
                }
            ],
            grid: {
                height: 160
            },
            tooltip: {
                trigger: 'item',
                position: ['10px', '50%'],
                padding: 0,
                borderColor: 'transparent',
                formatter: (params: any) => {
                    const { image } = params.data[2];
                    return `
                        <div>
                            <img src="${image}" alt="">
                        </div>
                    `;
                }
            }
        };

        myChart.setOption(option);


        return () => {
            myChart.dispose();
        };
    }, [cards, theme]);

    if (cards.length === 0) {
        return <span className="flex h-[240px] items-center justify-center">No data</span>;
    }

    return <div ref={chartRef} className="w-full h-[240px]"/>;
}

export default Scatterplot
