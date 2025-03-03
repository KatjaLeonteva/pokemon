import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { Card, SetInfo } from "../services/types.ts";
import {countCardsBySet} from "../services/utils.ts";

/*
 * This component displays a treemap using ECharts. Based on examples:
 * - https://echarts.apache.org/examples/en/editor.html?c=treemap-simples
 */
function Treemap({cards, globalSets, theme}: {cards: Card[], globalSets: SetInfo[], theme?: string | null}) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cards.length === 0 || !chartRef.current) return;

        const myChart = echarts.init(chartRef.current, theme);
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
    }, [cards, theme, globalSets]);

    if (cards.length === 0) {
        return <span className="flex h-[240px] items-center justify-center">No data</span>;
    }

    return <div ref={chartRef} className="w-full h-[240px]"/>;
}

export default Treemap
