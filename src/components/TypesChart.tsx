import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function SupertypesChart() {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize ECharts
        const myChart = echarts.init(chartRef.current);

        const data = [
            { category: "Grass", value: 213 },
            { category: "Colorless", value: 201 },
            { category: "Water", value: 193 },
            { category: "Psychic", value: 174 },
            { category: "Fighting", value: 166 },
            { category: "Lightning", value: 130 },
            { category: "Fire", value: 91 },
            { category: "Darkness", value: 70 },
            { category: "Metal", value: 52 },
            { category: "Dragon", value: 18 },
            { category: "Fairy", value: 13 },
        ];

        const sortedData = data.sort((a, b) => a.value - b.value);
        const sortedCategories = sortedData.map((item) => item.category);
        const sortedValues = sortedData.map((item) => item.value);

        const option = {
            xAxis: {
                type: 'value',
                show: false
            },
            yAxis: {
                type: 'category',
                data: sortedCategories,
                axisTick: {
                    show: false
                }
            },
            grid: {
                left: "2%",
                right: "0%",
                top: "5%",
                bottom: "0%",
                containLabel: true
            },
            series: [
                {
                    data: sortedValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'right'
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
