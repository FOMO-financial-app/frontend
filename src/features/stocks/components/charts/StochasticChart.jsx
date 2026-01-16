import { createChart, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const StochasticChart = ({ stochasticKData, stochasticDData }) => {

    const chartContainerRef = useRef();
    const chartRef = useRef();
    const stochasticKRef = useRef();
    const stochasticDRef = useRef();

    // Initialize the chart, only once.
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, { 
            layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
            autoSize: true,
            timeScale: { fixLeftEdge: true, fixRightEdge: true, lockVisibleTimeRangeOnResize: true, rightOffset: 0 },
        });

        // Create StochasticK line.
        stochasticKRef.current = chart.addSeries(LineSeries, {
            color: 'rgba(17, 20, 212, 0.5)',
            lineWidth: 2,
            lineStyle: 0
        });

        // Create StochasticD line.
        stochasticDRef.current = chart.addSeries(LineSeries, {
            color: 'rgba(182, 17, 31, 0.5)',
            lineWidth: 2,
            lineStyle: 0
        });

        chartRef.current = chart;

        return () => chart.remove();
    }, []);

    // Sync Stochastic data with the line.
    useEffect(() => {
        if (stochasticKRef.current && stochasticKData.length > 0) {
            stochasticKRef.current.setData(stochasticKData);
            stochasticDRef.current.setData(stochasticDData);
            chartRef.current.timeScale().fitContent();
        }
    }, [stochasticKData]);

    return (
        <div ref={chartContainerRef} className='indicator-chart' style={{ position: 'relative' }} />
    );
};