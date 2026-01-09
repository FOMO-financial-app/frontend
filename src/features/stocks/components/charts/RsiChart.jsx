import { createChart, HistogramSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const RsiChart = ({ rsiData, wrsiData, showRsi, showWrsi }) => {

    const chartContainerRef = useRef();
    const chartRef = useRef();
    const rsiRef = useRef();
    const wrsiRef = useRef();

    // Base configuration for indicators, visibility settings and prevent autoscale.
    const indicatorOptions = {
        visible: false,
        autoscaleInfoProvider: () => ({
            priceRange: {
                minValue: 0,
                maxValue: 100,
            },
        }),
    };
    
    // Initialize the chart, only once.
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, { 
            layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
            autoSize: true,
            timeScale: { fixLeftEdge: true, fixRightEdge: true, lockVisibleTimeRangeOnResize: true, rightOffset: 0 },
        });

        // Create empty indicators.
        rsiRef.current = chart.addSeries(HistogramSeries, {
            ...indicatorOptions,
            color: 'rgba(53, 253, 136, 0.5)',
            lineWidth: 2,
            lineStyle: 0
        });        
        wrsiRef.current = chart.addSeries(HistogramSeries, {
            ...indicatorOptions,
            color: 'rgba(43, 224, 248, 0.5)',
            lineWidth: 2,
            lineStyle: 0
        });

        chartRef.current = chart;

        return () => chart.remove();
    }, []);

    // Sync RSI data and handle visibility.
    useEffect(() => {
        if (!rsiRef.current) return;
        const isVisible = showRsi && rsiData.length > 0;
        
        if (isVisible) {
            rsiRef.current.setData(rsiData);
        }
        
        rsiRef.current.applyOptions({ visible: isVisible });
    }, [showRsi, rsiData]);

    // Sync Wilder RSI data and handle visibility.
    useEffect(() => {
        if (!wrsiRef.current) return;
        const isVisible = showWrsi && wrsiData.length > 0;
        
        if (isVisible) {
            wrsiRef.current.setData(wrsiData);
        }
        
        wrsiRef.current.applyOptions({ visible: isVisible });
    }, [showWrsi, wrsiData]);

    return (
        <div ref={chartContainerRef} className='indicator-chart' style={{ position: 'relative' }} />
    );
};