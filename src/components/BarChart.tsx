import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { generateDrilldownData } from "../services/utils.ts";
import { Card } from "../services/types.ts";

/*
 * This component displays a bar chart using ECharts. Based on examples:
 * - https://echarts.apache.org/examples/en/editor.html?c=bar-drilldown
 * - https://echarts.apache.org/examples/en/editor.html?c=data-transform-sort-bar
 */
function BarChart({cards}: {cards: Card[]}) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current, "vintage");
        const chartData = generateDrilldownData(cards);

        const option = {
            dataset: [
                {
                    id: 'mainDataset',
                    source: chartData.topLevelData
                },
                {
                    id: 'sortedDataset',
                    fromDatasetId: "mainDataset",
                    transform: {
                        type: "sort",
                        config: { dimension: "value", order: "asc" }
                    }
                }
            ],
            yAxis: {
                type: 'category',
                axisTick: {
                    show: false
                }
            },
            xAxis: {
                type: 'value',
                show: false
            },
            grid: {
                left: "2%",
                right: "10%",
                top: "10%",
                bottom: "0%",
                containLabel: true
            },
            series: [
                {
                    type: 'bar',
                    id: "cards",
                    datasetId: "sortedDataset",
                    encode: { x: "value", y: "groupId" },
                    universalTransition: { enabled: true, divideShape: "clone" },
                    label: {
                        show: true,
                        position: 'right'
                    }
                }
            ],
            graphic: [
                {
                    type: 'text',
                    left: 0,
                    top: 8,
                    style: {
                        text: '',
                        fontSize: 10
                    },
                }
            ]
        };

        myChart.setOption(option);


        myChart.on("click", function (event) {
            if (event.data) {
                const subData = chartData.drilldownData.find((data) => data.dataGroupId === event.name);

                if (!subData || subData.data.length == 1) {
                    return;
                }

                myChart.setOption({
                    dataset: [
                        { id: 'drilldownDataset', source: subData.data },
                        {
                            id: "sortedDrilldownDataset",
                            fromDatasetId: "drilldownDataset",
                            transform: {
                                type: "sort",
                                config: { dimension: 1, order: "asc" }
                            }
                        }
                    ],
                    yAxis: {
                        type: 'category'
                    },
                    series: {
                        type: 'bar',
                        id: 'cards',
                        dataGroupId: subData.dataGroupId,
                        datasetId: "sortedDrilldownDataset",
                        encode: { x: 1, y: 0 },
                        universalTransition: {
                            enabled: true,
                            divideShape: 'clone'
                        }
                    },
                    graphic: [
                        {
                            type: 'text',
                            left: 0,
                            top: 8,
                            style: {
                                text: 'Back',
                                fontSize: 10
                            },
                            onclick: function () {
                                myChart.setOption(option);
                            }
                        }
                    ]
                })


            }
        });

        return () => {
            myChart.dispose();
        };
    }, [cards]);

    return <div ref={chartRef} className="w-full h-64" />;
}

export default BarChart
