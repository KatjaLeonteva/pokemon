import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function SupertypesChart() {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize ECharts
        const myChart = echarts.init(chartRef.current);

        const data = [
            { category: "Pokémon", value: 1319 },
            { category: "Trainer", value: 245 },
            { category: "Energy", value: 574 },
        ];

        const sortedData = data.sort((a, b) => b.value - a.value);
        const sortedCategories = sortedData.map((item) => item.category);
        const sortedValues = sortedData.map((item) => item.value);

        const option = {
            xAxis: {
                type: 'category',
                data: sortedCategories,
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                    show: false
            },
            grid: {
                left: "0%",
                right: "0%",
                top: "0%",
                bottom: "10%",
            },
            series: [
                {
                    data: sortedValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            ]
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} className="w-full h-64" />;
}

export default SupertypesChart
