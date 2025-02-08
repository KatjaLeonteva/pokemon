import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { Card, SetInfo } from "../services/types.ts";
import {countCardsBySet} from "../services/utils.ts";

/*
 * This component displays a treemap using ECharts. Based on examples:
 * - https://echarts.apache.org/examples/en/editor.html?c=treemap-simples
 */
function Treemap({cards, globalSets}: {cards: Card[], globalSets: SetInfo[]}) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current, "westeros");
        const setsCount = countCardsBySet(cards);
        const chartData = (setsCount.sort((a, b) => b.value - a.value)).slice(0,10);

        const option = {
            series: [
                {
                    type: 'treemap',
                    data: chartData,
                    breadcrumb:  {
                        show: false
                    },
                }
            ],
            tooltip: {
                trigger: "item",
                formatter: (params: any) => {
                    const { name, value } = params;
                    const setInfo = globalSets.find(set => set.id === name);

                    return `
                <strong>${setInfo?.name}</strong><br>
                Collected ${value} / ${setInfo?.total} cards
            `;
                }
            },
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [cards]);

    return <div ref={chartRef} className="w-full h-64" />;
}

export default Treemap
