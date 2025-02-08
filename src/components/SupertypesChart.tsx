import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { generateDrilldownData } from "../services/utils.ts";
import { Card } from "../services/types.ts";

// Based on example https://echarts.apache.org/examples/en/editor.html?c=bar-drilldown
function SupertypesChart({cards}: {cards: Card[]}) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize ECharts
        const myChart = echarts.init(chartRef.current);
        const chartData = generateDrilldownData(cards);
        console.log(chartData)

        /*
        const sortedData = chartData.topLevelData.sort((a, b) => b.value - a.value);
        const sortedCategories = sortedData.map((item) => item.groupId);
        const sortedValues = sortedData.map((item) => item.value);

         */

        const option = {
            yAxis: {
                type: 'category',
                data: chartData.topLevelData.map((item) => item.groupId),
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
                    data: chartData.topLevelData,
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
            console.log('event', event)
            if (event.data) {
                const subData = chartData.drilldownData.find((data) => data.dataGroupId === event.name);

                if (!subData || subData.data.length == 1) {
                    return;
                }

                console.log(subData)

                myChart.setOption({
                    yAxis: {
                        type: 'category',
                        data: subData.data.map((item) => item[0]),
                    },
                    series: {
                        type: 'bar',
                        id: 'cards',
                        dataGroupId: subData.dataGroupId,
                        data: subData.data.map(function (item) {
                            return item[1];
                        }),
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
    }, []);

    return <div ref={chartRef} className="w-full h-64" />;
}

export default SupertypesChart
